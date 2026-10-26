// scripts/dev.mjs
// اجرای Next.js در حالت dev + باز شدن خودکار و سریع Chrome
//
// ویژگی‌ها:
//  - پیدا کردن خودکار پورت آزاد (تداخل با VPN/برنامه‌های دیگر حل می‌شود)
//  - باز کردن Chrome بلافاصله بعد از چاپ شدن "Ready" توسط Next (بدون انتظار برای کامپایل صفحه)
//  - گرم کردن صفحه اصلی در پس‌زمینه تا لود اول سریع‌تر شود
//  - پشتیبان: اگر پیام Ready شناسایی نشد، با چک اتصال TCP مرورگر باز می‌شود
//  - اگر Chrome پیدا نشد، مرورگر پیش‌فرض ویندوز باز می‌شود
//  - بستن تمیز پروسه‌ها با Ctrl+C (بدون پروسه node یتیم)
//
// تنظیمات اختیاری (متغیر محیطی):
//  PORT=3005      شروع جستجوی پورت از این عدد (پیش‌فرض 3001)
//  NO_OPEN=1      باز نشدن مرورگر
//  BROWSER_PATH   مسیر کامل chrome.exe اگر در جای غیراستاندارد نصب است

import { spawn, spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { existsSync } from "node:fs";
import net from "node:net";
import http from "node:http";

const require = createRequire(import.meta.url);
const nextCli = require.resolve("next/dist/bin/next");

const START_PORT = Number(process.env.PORT || 3001);
const MAX_TRIES = 30;
const NO_OPEN = process.env.NO_OPEN === "1";
const IS_WIN = process.platform === "win32";

// ---------- پیدا کردن پورت آزاد ----------

function canBind(port, host) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", (err) => {
      // فقط اگر واقعاً اشغال یا ممنوع باشد، پورت را رد می‌کنیم
      resolve(!(err.code === "EADDRINUSE" || err.code === "EACCES"));
    });
    server.once("listening", () => server.close(() => resolve(true)));
    server.listen(port, host);
  });
}

async function isPortFree(port) {
  // روی ویندوز ممکن است یک برنامه فقط روی 127.0.0.1 گوش بدهد (مثل VPN)؛ پس هر سه آدرس را چک می‌کنیم
  for (const host of ["127.0.0.1", "0.0.0.0", "::"]) {
    if (!(await canBind(port, host))) return false;
  }
  return true;
}

async function findFreePort(start) {
  for (let p = start; p < start + MAX_TRIES; p++) {
    if (await isPortFree(p)) return p;
  }
  throw new Error(`No free port found in range ${start}-${start + MAX_TRIES - 1}`);
}

// ---------- باز کردن مرورگر ----------

function findChromePath() {
  if (process.env.BROWSER_PATH && existsSync(process.env.BROWSER_PATH)) {
    return process.env.BROWSER_PATH;
  }
  const candidates = [
    process.env["PROGRAMFILES"] && `${process.env["PROGRAMFILES"]}\\Google\\Chrome\\Application\\chrome.exe`,
    process.env["PROGRAMFILES(X86)"] && `${process.env["PROGRAMFILES(X86)"]}\\Google\\Chrome\\Application\\chrome.exe`,
    process.env["LOCALAPPDATA"] && `${process.env["LOCALAPPDATA"]}\\Google\\Chrome\\Application\\chrome.exe`,
  ].filter(Boolean);
  return candidates.find((p) => existsSync(p)) || null;
}

function launchBrowser(url) {
  if (NO_OPEN) return;

  const detach = (cmd, args) => {
    const c = spawn(cmd, args, { detached: true, stdio: "ignore", windowsHide: true });
    c.on("error", () => {});
    c.unref();
  };

  if (IS_WIN) {
    const chrome = findChromePath();
    if (chrome) {
      detach(chrome, [url]); // مستقیم و سریع
    } else {
      detach("cmd.exe", ["/c", "start", "", url]); // مرورگر پیش‌فرض
    }
  } else if (process.platform === "darwin") {
    detach("open", ["-a", "Google Chrome", url]);
  } else {
    detach("xdg-open", [url]);
  }
}

// ---------- اجرای اصلی ----------

const PORT = await findFreePort(START_PORT);
if (PORT !== START_PORT) {
  console.log(`\n⚠ Port ${START_PORT} is busy, using ${PORT} instead.\n`);
}

const url = `http://localhost:${PORT}`;
let opened = false;
let tcpTimer = null;

function openOnce() {
  if (opened) return;
  opened = true;
  if (tcpTimer) clearInterval(tcpTimer);
  launchBrowser(url);
  console.log(`\n→ Chrome opening at ${url}\n`);

  // گرم کردن صفحه اصلی در پس‌زمینه (کامپایل اولیه Turbopack)
  const warm = http.get({ hostname: "localhost", port: PORT, path: "/", timeout: 60000 }, (res) => res.resume());
  warm.on("error", () => {});
  warm.on("timeout", () => warm.destroy());
}

const child = spawn(process.execPath, [nextCli, "dev", "-p", String(PORT)], {
  cwd: process.cwd(),
  stdio: ["inherit", "pipe", "pipe"],
  shell: false,
  env: { ...process.env, FORCE_COLOR: "1" },
});

// حذف کدهای رنگی ANSI فقط برای تشخیص متن
const stripAnsi = (s) => s.replace(/\u001b\[[0-9;]*m/g, "");

function onOutput(chunk, stream) {
  stream.write(chunk);
  const text = stripAnsi(chunk.toString());
  if (/Ready in|✓ Ready|Local:\s+http/i.test(text)) openOnce();
}

child.stdout.on("data", (d) => onOutput(d, process.stdout));
child.stderr.on("data", (d) => onOutput(d, process.stderr));

// پشتیبان: اگر پیام Ready شناسایی نشد، با اتصال TCP تشخیص بده
tcpTimer = setInterval(() => {
  if (opened) return;
  const socket = net.connect({ port: PORT, host: "localhost" });
  socket.setTimeout(500);
  socket.once("connect", () => {
    socket.destroy();
    openOnce();
  });
  socket.once("error", () => socket.destroy());
  socket.once("timeout", () => socket.destroy());
}, 300);

// ---------- بستن تمیز ----------

let stopping = false;
function stop() {
  if (stopping) return;
  stopping = true;
  if (tcpTimer) clearInterval(tcpTimer);
  if (child.pid) {
    if (IS_WIN) {
      // کشتن کل درخت پروسه‌ها تا node یتیم روی پورت نماند
      spawnSync("taskkill", ["/pid", String(child.pid), "/T", "/F"], { stdio: "ignore" });
    } else {
      child.kill("SIGTERM");
    }
  }
  process.exit(0);
}

process.on("SIGINT", stop);
process.on("SIGTERM", stop);
process.on("exit", () => {
  if (!stopping && child.pid && IS_WIN) {
    spawnSync("taskkill", ["/pid", String(child.pid), "/T", "/F"], { stdio: "ignore" });
  }
});

child.on("error", (err) => {
  console.error("Could not start Next.js:", err);
  process.exit(1);
});

child.on("exit", (code) => {
  if (tcpTimer) clearInterval(tcpTimer);
  process.exit(code ?? 0);
});

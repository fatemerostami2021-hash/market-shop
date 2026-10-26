// نصب اپلیکیشن (PWA) — تصویر و دکمه هر دو قابل کلیک برای نصب هستند
'use client'
import { useEffect, useState } from 'react'
import { IoCheckmarkCircleOutline, IoClose, IoDownloadOutline, IoEllipsisVertical, IoShareOutline } from 'react-icons/io5'
import '../../../src/lib/pwa'

export default function AppDownload() {
  const [canInstall, setCanInstall] = useState(false)
  const [installed, setInstalled] = useState(false)
  const [help, setHelp] = useState(false)
  const [ios, setIos] = useState(false)

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone
    setInstalled(!!standalone)
    setIos(/iphone|ipad|ipod/i.test(navigator.userAgent))
    setCanInstall(!!window.__deferredInstallPrompt)
    const onReady = () => setCanInstall(true)
    const onInstalled = () => { setInstalled(true); setCanInstall(false) }
    window.addEventListener('pwa-installable', onReady)
    window.addEventListener('appinstalled', onInstalled)
    return () => { window.removeEventListener('pwa-installable', onReady); window.removeEventListener('appinstalled', onInstalled) }
  }, [])

  const install = async () => {
    const ev = window.__deferredInstallPrompt
    if (!ev) { setHelp(true); return }
    await ev.prompt()
    const { outcome } = await ev.userChoice
    window.__deferredInstallPrompt = undefined
    setCanInstall(false)
    if (outcome === 'accepted') setInstalled(true)
  }

  return (
    <section className="bg-black py-16 my-6">
      <div className="container mx-auto px-6 grid md:grid-cols-2 items-center gap-10">
        <div className="hidden md:block">
          <button onClick={install} aria-label="نصب اپلیکیشن کیمیا مارت" className="group relative block w-full rounded-3xl overflow-hidden border border-hyper-dark-border hover:border-hyper-dark-accent transition-colors">
            <img src="/images/app-mockup.svg" alt="اپلیکیشن کیمیا مارت" className="w-full group-hover:scale-105 transition-transform duration-700" />
            {!installed && (
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-hyper-dark-accent text-black text-xs font-black px-4 py-2 rounded-full">
                برای نصب اپلیکیشن کلیک کنید
              </span>
            )}
          </button>
        </div>
        <div>
          <span className="inline-block text-xs border border-hyper-dark-accent text-hyper-dark-accent rounded-full px-4 py-1.5 mb-5">خرید همیشه همراه شما</span>
          <h3 className="text-3xl font-black text-white leading-snug mb-4">اپلیکیشن کیمیا مارت؛ سریع‌تر،<br />شخصی‌تر، ساده‌تر</h3>
          <p className="text-gray-400 text-sm leading-7 mb-6">
            بدون نیاز به فروشگاه اپلیکیشن، با یک کلیک کیمیا مارت را روی گوشی خود نصب کنید و مثل یک اپ معمولی از صفحهٔ اصلی گوشی باز کنید.
          </p>
          <div className="flex flex-wrap gap-4 mb-8 text-gray-300 text-sm">
            <span className="flex items-center gap-1"><IoCheckmarkCircleOutline className="text-hyper-dark-accent" /> نصب سریع</span>
            <span className="flex items-center gap-1"><IoCheckmarkCircleOutline className="text-hyper-dark-accent" /> بدون اشغال حافظهٔ زیاد</span>
            <span className="flex items-center gap-1"><IoCheckmarkCircleOutline className="text-hyper-dark-accent" /> همیشه به‌روز</span>
          </div>
          {installed ? (
            <p className="flex items-center gap-2 text-hyper-dark-accent font-bold"><IoCheckmarkCircleOutline size={22} /> اپلیکیشن روی این دستگاه نصب است.</p>
          ) : (
            <button onClick={install} className="flex items-center gap-2 bg-hyper-dark-accent text-black rounded-xl px-6 py-3.5 font-black hover:scale-105 transition-transform">
              <IoDownloadOutline size={22} /> {canInstall ? 'نصب اپلیکیشن' : 'روش نصب اپلیکیشن'}
            </button>
          )}
        </div>
      </div>

      {help && (
        <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-6" onClick={() => setHelp(false)}>
          <div className="relative bg-hyper-dark-card border border-hyper-dark-border rounded-3xl p-8 max-w-md w-full text-white" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setHelp(false)} aria-label="بستن" className="absolute top-4 left-4 text-gray-400 hover:text-white"><IoClose size={22} /></button>
            <h4 className="font-black text-lg mb-4">نصب کیمیا مارت روی گوشی</h4>
            {ios ? (
              <ol className="space-y-3 text-sm text-gray-300 leading-7 list-decimal pr-5">
                <li>سایت را در <b>Safari</b> باز کنید.</li>
                <li>روی دکمهٔ اشتراک‌گذاری <IoShareOutline className="inline text-hyper-dark-accent" /> بزنید.</li>
                <li>گزینهٔ <b>Add to Home Screen</b> را انتخاب کنید.</li>
              </ol>
            ) : (
              <ol className="space-y-3 text-sm text-gray-300 leading-7 list-decimal pr-5">
                <li>سایت را در <b>Chrome</b> باز کنید.</li>
                <li>منوی <IoEllipsisVertical className="inline text-hyper-dark-accent" /> را بزنید.</li>
                <li>گزینهٔ <b>Install app</b> یا <b>Add to Home screen</b> را انتخاب کنید.</li>
              </ol>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

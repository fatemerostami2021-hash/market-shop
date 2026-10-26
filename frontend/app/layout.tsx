// app/layout.tsx
import type { Metadata, Viewport } from "next";
import ThemeProvider from "./components/ThemeProvider";
import LocaleProvider from "./components/LocaleProvider";
import PwaRegister from "./components/PwaRegister";
import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/700.css";
import "@fontsource/vazirmatn/900.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "هایپرمارکت کیمیا",
  description: "فروشگاه آنلاین اختصاصی هایپرمارکت",
  applicationName: "کیمیا مارت",
  icons: { icon: "/icons/icon-192.png", apple: "/icons/apple-touch-icon.png" },
  appleWebApp: { capable: true, title: "کیمیا مارت", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <LocaleProvider>{children}</LocaleProvider>
          <PwaRegister />
        </ThemeProvider>
      </body>
    </html>
  );
}
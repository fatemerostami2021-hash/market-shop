// app/layout.tsx
import type { Metadata } from "next";
import ThemeProvider from "./components/ThemeProvider";
import LocaleProvider from "./components/LocaleProvider";
import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/700.css";
import "@fontsource/vazirmatn/900.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "هایپرمارکت کیمیا",
  description: "فروشگاه آنلاین اختصاصی هایپرمارکت",
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
        </ThemeProvider>
      </body>
    </html>
  );
}
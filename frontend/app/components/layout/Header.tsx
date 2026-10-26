// هدر اصلی — نوار بالا + لوگو + جستجو + آیکون‌ها + ناوبری با مگامنو
'use client'
import { IoCartOutline, IoSearchOutline, IoHeartOutline, IoPersonOutline, IoCallOutline, IoLogoInstagram, IoLogoLinkedin, IoLogoWhatsapp } from 'react-icons/io5'
import ThemeSwitch from '../ThemeSwitch'
import LanguageSwitch from '../LanguageSwitch'
import MegaNav from './MegaNav'
import CartLink from './CartLink'

export default function Header() {
  return (
    <header className="sticky top-0 z-50">
      {/* نوار بالای مشکی/طلایی */}
      <div className="bg-hyper-dark-bg dark:bg-black text-white text-xs">
        <div className="container mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><IoCallOutline /> پشتیبانی: ۰۲۱-۹۱۰۹۰۵۰۹</span>
            <div className="hidden md:flex items-center gap-2 text-gray-400">
              <IoLogoInstagram /> <IoLogoLinkedin /> <IoLogoWhatsapp />
            </div>
          </div>
          <span className="text-hyper-dark-accent font-semibold">ارسال رایگان سفارش‌های بالای ۱,۵۰۰,۰۰۰ تومان در تهران</span>
        </div>
      </div>

      {/* بدنه هدر — بدون backdrop-blur تا مگامنو بتواند پشتش را بلور کند */}
      <div className="relative bg-white dark:bg-hyper-dark-bg border-b border-hyper-light-border dark:border-hyper-dark-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <a href="/" aria-label="کیمیا مارت"><h1 className="text-2xl font-black whitespace-nowrap">
            <span className="text-hyper-dark-bg dark:text-hyper-dark-accent">کیمیا</span>{' '}
            <span className="text-hyper-light-accent dark:text-white">مارِت</span>
          </h1></a>

          <form action="/products" method="get" className="hidden md:flex flex-1 max-w-xl items-center gap-2 bg-hyper-light-card dark:bg-hyper-dark-card rounded-full px-4 py-2.5 border border-hyper-light-border dark:border-hyper-dark-border">
            <IoSearchOutline size={18} className="opacity-50 shrink-0" />
            <input type="text" name="q" placeholder="جستجوی کالا، برند یا دسته‌بندی..."
              className="bg-transparent outline-none w-full text-sm placeholder:text-gray-500" />
          </form>

          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center gap-2 text-sm border border-hyper-light-border dark:border-hyper-dark-border rounded-full px-4 py-2 hover:border-hyper-light-accent transition-colors">
              <IoPersonOutline /> ورود / ثبت‌نام
            </button>
            <button className="relative text-xl hover:text-hyper-dark-sale dark:hover:text-hyper-light-accent transition-colors">
              <IoHeartOutline />
            </button>
            <CartLink />
            <LanguageSwitch />
            <ThemeSwitch />
          </div>
        </div>

        {/* ناوبری */}
        <nav className="border-t border-hyper-light-border dark:border-hyper-dark-border">
          <div className="container mx-auto px-6 py-2.5 flex items-center gap-8 text-sm">
            <a href="/" className="font-bold text-hyper-dark-sale dark:text-hyper-dark-accent">خانه</a>
            <MegaNav />
            <a href="/products?discounted=1&section=discounts" className="hover:text-hyper-light-accent dark:hover:text-hyper-dark-accent transition-colors">تخفیف‌ها</a>
            <a href="/club" className="mr-auto text-gray-500 dark:text-gray-400 hover:text-hyper-dark-accent transition-colors">باشگاه مشتریان</a>
            <a href="/branches" className="text-gray-500 dark:text-gray-400 hover:text-hyper-dark-accent transition-colors">شعب هایپرینو</a>
          </div>
        </nav>
      </div>
    </header>
  )
}
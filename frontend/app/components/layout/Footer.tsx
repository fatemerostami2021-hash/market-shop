// فوتر — درباره، راهنما، خدمات، امنیت و تماس
import { IoCallOutline, IoLocationOutline, IoShieldCheckmarkOutline, IoLogoInstagram, IoLogoLinkedin, IoLogoWhatsapp } from 'react-icons/io5'

export default function Footer() {
  return (
    <footer className="bg-hyper-dark-bg dark:bg-black text-white mt-10">
      <div className="container mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-5 gap-10 text-sm">
        <div className="col-span-2">
          <h4 className="text-2xl font-black mb-4">
            <span className="text-hyper-dark-accent">کیمیا</span> مارِت
          </h4>
          <p className="text-gray-400 text-xs leading-6 mb-5">
            هایپرمارکت تجربه‌محور آنلاین کیمیا مارت؛ کالاهای اصلی، انتخاب دقیق و تحویل قابل اعتماد.
          </p>
          <p className="flex items-center gap-2 text-gray-300 text-xs mb-2"><IoCallOutline className="text-hyper-dark-accent" /> ۰۲۱-۹۱۰۹۰۵۰۹</p>
          <p className="flex items-center gap-2 text-gray-300 text-xs"><IoLocationOutline className="text-hyper-dark-accent" /> تهران، خیابان ولیعصر، برج هایپرینو</p>
        </div>
        <div>
          <h5 className="font-bold text-hyper-dark-accent mb-4">درباره هایپرینو</h5>
          <ul className="space-y-2.5 text-gray-400 text-xs">
            <li><a href="#" className="hover:text-white transition-colors">داستان ما</a></li>
            <li><a href="#" className="hover:text-white transition-colors">همکاری با ما</a></li>
            <li><a href="#" className="hover:text-white transition-colors">فرصت‌های شغلی</a></li>
            <li><a href="#" className="hover:text-white transition-colors">تماس با ما</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-hyper-dark-accent mb-4">راهنمای خرید</h5>
          <ul className="space-y-2.5 text-gray-400 text-xs">
            <li><a href="#" className="hover:text-white transition-colors">روش ثبت سفارش</a></li>
            <li><a href="#" className="hover:text-white transition-colors">شیوه‌های پرداخت</a></li>
            <li><a href="#" className="hover:text-white transition-colors">نحوه ارسال سفارش</a></li>
            <li><a href="#" className="hover:text-white transition-colors">حریم خصوصی</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-hyper-dark-accent mb-4">خدمات مشتریان</h5>
          <ul className="space-y-2.5 text-gray-400 text-xs">
            <li><a href="#" className="hover:text-white transition-colors">پیگیری سفارش</a></li>
            <li><a href="#" className="hover:text-white transition-colors">رویه بازگرداندن کالا</a></li>
            <li><a href="#" className="hover:text-white transition-colors">پرسش‌های متداول</a></li>
            <li><a href="#" className="hover:text-white transition-colors">گزارش مشکل</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© ۱۴۰۵ کیمیا مارت — تمامی حقوق محفوظ است.</p>
          <div className="flex items-center gap-4 text-lg">
            <IoLogoInstagram className="hover:text-hyper-dark-accent transition-colors cursor-pointer" />
            <IoLogoLinkedin className="hover:text-hyper-dark-accent transition-colors cursor-pointer" />
            <IoLogoWhatsapp className="hover:text-hyper-dark-accent transition-colors cursor-pointer" />
          </div>
          <div className="flex items-center gap-2">
            <IoShieldCheckmarkOutline className="text-hyper-dark-accent" /> نماد اعتماد الکترونیکی و ساماندهی
          </div>
        </div>
      </div>
    </footer>
  )
}

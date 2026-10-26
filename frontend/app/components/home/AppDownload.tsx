// دانلود اپلیکیشن موبایل
import { IoCheckmarkCircleOutline, IoLogoApple, IoLogoGooglePlaystore } from 'react-icons/io5'

export default function AppDownload() {
  return (
    <section className="bg-black py-16 my-6">
      <div className="container mx-auto px-6 grid md:grid-cols-2 items-center gap-10">
        <div className="hidden md:block">
          <img src="https://placehold.co/700x500/111111/FFD700?text=Mobile+App" alt="اپلیکیشن کیمیا مارت"
            className="rounded-3xl border border-hyper-dark-border" />
        </div>
        <div>
          <span className="inline-block text-xs border border-hyper-dark-accent text-hyper-dark-accent rounded-full px-4 py-1.5 mb-5">
            خرید همیشه همراه شما
          </span>
          <h3 className="text-3xl font-black text-white leading-snug mb-4">
            اپلیکیشن هایپرینو؛ سریع‌تر،<br />شخصی‌تر، ساده‌تر
          </h3>
          <p className="text-gray-400 text-sm leading-7 mb-6">
            لیست خرید هوشمند بسازید، سفارش را لحظه‌ای دنبال کنید و پیشنهادهایی متناسب با سلیقه‌تان بگیرید.
          </p>
          <div className="flex flex-wrap gap-4 mb-8 text-gray-300 text-sm">
            <span className="flex items-center gap-1"><IoCheckmarkCircleOutline className="text-hyper-dark-accent" /> تخفیف اختصاصی</span>
            <span className="flex items-center gap-1"><IoCheckmarkCircleOutline className="text-hyper-dark-accent" /> پرداخت امن</span>
            <span className="flex items-center gap-1"><IoCheckmarkCircleOutline className="text-hyper-dark-accent" /> پیگیری لحظه‌ای</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 bg-white text-black rounded-xl px-5 py-3 font-bold hover:scale-105 transition-transform">
              <IoLogoApple size={24} /> دانلود از App Store
            </button>
            <button className="flex items-center gap-2 border border-gray-600 text-white rounded-xl px-5 py-3 font-bold hover:border-hyper-dark-accent transition-colors">
              <IoLogoGooglePlaystore size={24} /> دانلود از کافه‌بازار
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

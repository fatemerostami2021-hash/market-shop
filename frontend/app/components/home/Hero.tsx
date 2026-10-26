// سکشن هیرو — تبلیغ اصلی صفحه اول
import { IoArrowBack, IoRocketOutline, IoShieldCheckmarkOutline, IoThumbsUpOutline } from 'react-icons/io5'

export default function Hero() {
  return (
    <section className="container mx-auto px-6 py-10">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a0f0f] to-black border border-hyper-dark-border">
        <div className="grid md:grid-cols-2 items-center">
          <div className="p-8 md:p-14">
            <span className="inline-block text-xs border border-hyper-dark-accent text-hyper-dark-accent rounded-full px-4 py-1.5 mb-6">
              تازه، اصیل، انتخاب‌شده
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-snug mb-4">
              خرید روزانه، با کیفیتی که<br />شایستهٔ شماست
            </h2>
            <p className="text-gray-300 mb-8 leading-7">
              هزاران کالای تازه و منتخب، از قفسه تا خانهٔ شما؛ سریع، مطمئن و با تضمین کیفیت هایپرینو.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button className="bg-hyper-dark-sale hover:bg-red-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:scale-105 transition-all">
                شروع خرید
              </button>
              <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl transition-colors">
                مشاهده پیشنهادها <IoArrowBack />
              </button>
            </div>
            <div className="flex items-center gap-10 text-white">
              <div className="text-center"><p className="text-2xl font-black text-hyper-dark-accent">۹۸٪</p><p className="text-xs text-gray-400 mt-1">رضایت مشتریان</p></div>
              <div className="text-center"><p className="text-2xl font-black text-hyper-dark-accent">+۱۲,۰۰۰</p><p className="text-xs text-gray-400 mt-1">کالای منتخب</p></div>
              <div className="text-center"><p className="text-2xl font-black text-hyper-dark-accent">۴۵ دقیقه</p><p className="text-xs text-gray-400 mt-1">ارسال سریع</p></div>
            </div>
          </div>
          <div className="hidden md:block h-[420px]">
            <img src="https://placehold.co/900x840/2a1a10/FFD700?text=Groceries"
              alt="خرید روزانه" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

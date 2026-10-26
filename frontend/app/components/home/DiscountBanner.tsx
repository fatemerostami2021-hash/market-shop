// بنر تخفیف بزرگ — بنر قرمز/طلایی
import { IoArrowBack } from 'react-icons/io5'

export default function DiscountBanner() {
  return (
    <section className="container mx-auto px-6 py-10">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-l from-[#7a1010] to-[#3a0a0a] border border-red-900/50">
        <div className="p-10 md:p-14 text-center">
          <p className="text-xs text-hyper-dark-accent mb-2">جشنواره آخر هفته هایپرینو</p>
          <h3 className="text-2xl md:text-4xl font-black text-white mb-3">
            تا <span className="text-hyper-dark-accent">٪۳۵</span> تخفیف روی تازه‌های فصل
          </h3>
          <p className="text-gray-300 text-sm mb-8">از پنچ‌شنبه تا شنبه؛ میوه، سبزیجات و پروتئین تازه با تصمیم یازگشت وجه.</p>
          <button className="inline-flex items-center gap-2 bg-hyper-dark-accent hover:bg-yellow-500 text-black font-black py-3 px-10 rounded-xl transition-all hover:scale-105">
            همین حالا خرید کنید <IoArrowBack />
          </button>
        </div>
      </div>
    </section>
  )
}

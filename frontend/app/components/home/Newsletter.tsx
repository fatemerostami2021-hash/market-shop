'use client'

'use client'

// خبرنامه — نوار طلایی دریافت تخفیف
export default function Newsletter() {
  return (
    <section className="container mx-auto px-6 py-10">
      <div className="bg-hyper-dark-accent rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl md:text-2xl font-black text-black">از تخفیف‌ها زودتر باخبر شوید</h3>
          <p className="text-black/70 text-sm mt-2">خبرنامه هایپرینو؛ پیشنهادهای شخصی، تازه‌های بازار و کدهای تخفیف اختصاصی.</p>
        </div>
        <form className="flex w-full md:w-auto bg-white rounded-2xl p-1.5" onSubmit={(e) => e.preventDefault()}>
          <input type="email" required placeholder="ایمیل یا شماره موبایل شما"
            className="flex-1 md:w-72 px-4 outline-none text-sm text-black" />
          <button className="bg-black text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors">
            عضویت
          </button>
        </form>
      </div>
    </section>
  )
}

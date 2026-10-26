// بسته‌های خوشمزه امروز — سه بسته پیشنهادی
import { IoCartOutline } from 'react-icons/io5'

const BUNDLES = [
  { tag: 'پیشنهاد امروز', title: 'صبحانهٔ دونفرهٔ کامل', desc: 'نان تازه، پنیر، عسل، کره، آبی‌پرتقال و قهوه', price: '۲۴۹,۰۰۰' },
  { tag: 'انتخاب سرآشپز', title: 'سبد ناهار سالم', desc: 'فیلهٔ سالمون، سبزیجات تازه، کینوا و سس لیمو', price: '۸۹۰,۰۰۰' },
  { tag: 'تخفیف ۲۵٪', title: 'پک دورهمی سینمایی', desc: 'پاپ‌کورن، چیپس، دیپ پنیر و نوشیدنی برای ۴ نفر', price: '۵۹۹,۰۰۰' },
]

export default function Bundles() {
  return (
    <section className="bg-[#FDF6E3] dark:bg-[#141210] py-14 my-6">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs text-hyper-light-accent dark:text-hyper-dark-accent mb-1">هر روز یک انتخاب تازه</p>
            <h3 className="text-xl font-black flex items-center gap-2">
              <span className="w-1 h-6 bg-hyper-dark-sale rounded-full inline-block"></span>
              پیشنهادهای خوشمزهٔ امروز
            </h3>
          </div>
          <a href="#" className="text-sm text-hyper-dark-sale hover:underline">دیدن پیشنهاد فردا</a>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {BUNDLES.map((b) => (
            <div key={b.title} className="bg-white dark:bg-hyper-dark-card rounded-3xl overflow-hidden border border-hyper-light-border dark:border-hyper-dark-border shadow-sm hover:shadow-2xl transition-all group">
              <div className="relative h-52">
                <img src={`https://placehold.co/600x400/1A1A1A/FFD700?text=${encodeURIComponent(b.title)}`}
                  alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <span className="absolute top-4 right-4 bg-black/80 text-hyper-dark-accent text-xs font-bold px-3 py-1.5 rounded-full">
                  {b.tag}
                </span>
              </div>
              <div className="p-6">
                <h4 className="font-black text-lg mb-2">{b.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-6 mb-5">{b.desc}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-black text-hyper-dark-sale dark:text-hyper-dark-accent">{b.price} تومان</p>
                  <button className="bg-hyper-dark-sale hover:bg-red-600 text-white p-3 rounded-xl transition-colors">
                    <IoCartOutline size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

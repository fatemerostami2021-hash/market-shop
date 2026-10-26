// دسته‌بندی‌ها — نمایش دایره‌ای (مطابق طرح فیگما)
const CATS = [
  { name: 'کالاهای اساسی', count: '۶۵۰ کالا', img: 'grains' },
  { name: 'میوه و سبزی', count: '۲۸۰ کالا', img: 'veggies' },
  { name: 'نان و شیرینی', count: '۱۶۰ کالا', img: 'bread' },
  { name: 'لبنیات', count: '۲۴۰ کالا', img: 'dairy' },
  { name: 'پروتئینی', count: '۱۹۰ کالا', img: 'meat' },
  { name: 'صبحانه', count: '۲۷۰ کالا', img: 'breakfast' },
  { name: 'تنقلات', count: '۴۸۰ کالا', img: 'snacks' },
  { name: 'نوشیدنی', count: '۳۲۰ کالا', img: 'drinks' },
]

export default function CategoryCircles() {
  return (
    <section className="container mx-auto px-6 py-10">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs text-hyper-light-accent dark:text-hyper-dark-accent mb-1">هر آنچه نیاز دارید</p>
          <h3 className="text-xl font-black">خرید بر اساس دسته‌بندی</h3>
        </div>
        <a href="#" className="text-sm text-hyper-dark-sale flex items-center gap-1 hover:underline">همه دسته‌ها</a>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
        {CATS.map((c) => (
          <a key={c.name} href="#" className="group text-center">
            <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-transparent group-hover:border-hyper-dark-accent transition-all bg-hyper-light-card dark:bg-hyper-dark-card">
              <img src={`https://placehold.co/200x200/1A1A1A/FFD700?text=${encodeURIComponent(c.name)}`}
                alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <p className="text-xs font-bold mt-3">{c.name}</p>
            <p className="text-[10px] text-gray-500">{c.count}</p>
          </a>
        ))}
      </div>
    </section>
  )
}

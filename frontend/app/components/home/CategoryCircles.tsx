// دسته‌بندی‌ها — نمایش دایره‌ای
import Link from 'next/link'
import { CATEGORIES } from '../../../src/lib/categories'

export default function CategoryCircles() {
  return (
    <section className="container mx-auto px-6 py-10">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs text-hyper-light-accent dark:text-hyper-dark-accent mb-1">هر آنچه نیاز دارید</p>
          <h3 className="text-xl font-black">خرید بر اساس دسته‌بندی</h3>
        </div>
        <Link href="/categories" className="text-sm text-hyper-dark-sale flex items-center gap-1 hover:underline">همه دسته‌ها</Link>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
        {CATEGORIES.filter((c) => c.home).map((c) => (
          <Link key={c.slug} href={`/products?category=${c.slug}`} className="group text-center">
            <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-transparent group-hover:border-hyper-dark-accent transition-all bg-hyper-light-card dark:bg-hyper-dark-card">
              <img src={`/images/categories/${c.slug}.svg`} alt={c.fa} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <p className="text-xs font-bold mt-3">{c.fa}</p>
            <p className="text-[10px] text-gray-500">{c.count}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

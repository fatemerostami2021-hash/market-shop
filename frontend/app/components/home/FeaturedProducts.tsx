// بخش محصولات صفحه اصلی — پیشنهاد ویژه (تخفیف‌دارها) یا پرفروش‌ها
import Link from 'next/link'
import { IoArrowBack } from 'react-icons/io5'
import ProductCard from '../product/ProductCard'
import { fetchProducts } from '../../../src/lib/products'

export default async function FeaturedProducts({
  title = 'پیشنهادهای ویژه هایپرینو',
  subtitle = 'فرصت محدود',
  variant = 'discount',
}: { title?: string; subtitle?: string; variant?: 'discount' | 'best' }) {
  const all = await fetchProducts()
  let items = variant === 'discount'
    ? all.filter((p) => p.discount_price && p.discount_price > 0)
    : [...all].sort((a, b) => (b.sold ?? 0) - (a.sold ?? 0))
  if (items.length === 0) items = all
  const href = variant === 'discount' ? '/products?discounted=1&section=discounts' : '/products?section=best'

  return (
    <section className="bg-black dark:bg-black py-14 my-6">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs text-hyper-dark-accent mb-1">{subtitle}</p>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-hyper-dark-sale rounded-full inline-block"></span>
              {title}
            </h3>
          </div>
          <Link href={href} className="text-sm text-hyper-dark-accent flex items-center gap-1 hover:underline">
            مشاهده همه <IoArrowBack />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  )
}

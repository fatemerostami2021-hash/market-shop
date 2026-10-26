import Link from 'next/link'
import PageShell from '../components/layout/PageShell'
import { CATEGORIES } from '../../src/lib/categories'
import { IMAGES } from '../../src/data/images'
import ImageSlot from '../components/ui/ImageSlot'

export const metadata = { title: 'دسته‌بندی کالاها | کیمیا مارت' }

export default function CategoriesPage() {
  return (
    <PageShell title="دسته‌بندی کالاها" subtitle="هر آنچه نیاز دارید">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((c) => (
          <div key={c.slug} className="group rounded-3xl overflow-hidden border border-hyper-light-border dark:border-hyper-dark-border bg-hyper-light-card dark:bg-hyper-dark-card hover:shadow-2xl transition-all">
            <Link href={`/products?category=${c.slug}`} className="block h-44 overflow-hidden bg-black">
              <ImageSlot src={IMAGES.categories[c.slug]} alt={c.fa} icon={c.icon} iconSize={64} imgClassName="group-hover:scale-105 transition-transform duration-700" />
            </Link>
            <div className="p-5">
              <Link href={`/products?category=${c.slug}`} className="font-black text-lg hover:text-hyper-dark-accent transition-colors">{c.fa}</Link>
              <p className="text-xs text-gray-500 mb-3">{c.count}</p>
              <div className="flex flex-wrap gap-2">
                {c.sub.map((s) => (
                  <Link key={s.slug} href={`/products?category=${c.slug}&sub=${s.slug}`}
                    className="text-xs rounded-full border border-hyper-light-border dark:border-hyper-dark-border px-3 py-1 hover:border-hyper-dark-accent transition-colors">{s.fa}</Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  )
}

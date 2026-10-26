// لیست محصولات با فیلتر — پرفروش‌ها، تازه‌ها، تخفیف‌ها و دسته‌بندی‌ها همه از همین صفحه می‌آیند
import Link from 'next/link'
import PageShell from '../components/layout/PageShell'
import ProductCard from '../components/product/ProductCard'
import { CATEGORIES, categoryBySlug } from '../../src/lib/categories'
import { effectivePrice, faName, fetchProducts } from '../../src/lib/products'

export const metadata = { title: 'محصولات | کیمیا مارت' }

const SECTIONS: Record<string, string> = { best: 'پرفروش‌ها', new: 'تازه‌ها', discounts: 'تخفیف‌ها' }
type SP = Promise<Record<string, string | string[] | undefined>>

export default async function ProductsPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams
  const one = (k: string) => { const v = sp[k]; return (Array.isArray(v) ? v[0] : v) || '' }
  const category = one('category'), section = one('section'), q = one('q').trim()
  const discounted = one('discounted') === '1'
  const min = Number(one('min')) || 0, max = Number(one('max')) || 0
  const sort = one('sort') || (section === 'best' ? 'best' : 'newest')

  let items = await fetchProducts()
  if (category) items = items.filter((p) => p.category === category)
  if (discounted) items = items.filter((p) => p.discount_price && p.discount_price > 0)
  if (min) items = items.filter((p) => effectivePrice(p) >= min)
  if (max) items = items.filter((p) => effectivePrice(p) <= max)
  if (q) items = items.filter((p) => (p.name + ' ' + faName(p.name)).toLowerCase().includes(q.toLowerCase()))
  if (sort === 'cheap') items = [...items].sort((a, b) => effectivePrice(a) - effectivePrice(b))
  else if (sort === 'expensive') items = [...items].sort((a, b) => effectivePrice(b) - effectivePrice(a))
  else if (sort === 'best') items = [...items].sort((a, b) => (b.sold ?? 0) - (a.sold ?? 0))

  const title = q ? `نتایج جستجو برای «${q}»` : categoryBySlug(category)?.fa || SECTIONS[section] || (discounted ? 'تخفیف‌ها' : 'همه محصولات')
  const field = 'w-full rounded-xl bg-hyper-light-card dark:bg-hyper-dark-card px-3 py-2 text-sm outline-none border border-hyper-light-border dark:border-hyper-dark-border'

  return (
    <PageShell title={title} subtitle={`${items.length.toLocaleString('fa-IR')} کالا`}>
      <div className="grid md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <form method="get" className="space-y-4 rounded-2xl border border-hyper-light-border dark:border-hyper-dark-border p-5 sticky top-40">
            <h3 className="font-bold">فیلترها</h3>
            {section && <input type="hidden" name="section" value={section} />}
            {q && <input type="hidden" name="q" value={q} />}
            <div>
              <p className="text-xs opacity-70 mb-2">دسته‌بندی</p>
              <select name="category" defaultValue={category} className={field}>
                <option value="">همه دسته‌ها</option>
                {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.fa}</option>)}
              </select>
            </div>
            <div>
              <p className="text-xs opacity-70 mb-2">محدودهٔ قیمت (تومان)</p>
              <div className="flex gap-2">
                <input name="min" defaultValue={min || ''} placeholder="از" inputMode="numeric" className={field} />
                <input name="max" defaultValue={max || ''} placeholder="تا" inputMode="numeric" className={field} />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" name="discounted" value="1" defaultChecked={discounted} /> فقط کالاهای تخفیف‌دار
            </label>
            <div>
              <p className="text-xs opacity-70 mb-2">مرتب‌سازی</p>
              <select name="sort" defaultValue={sort} className={field}>
                <option value="newest">جدیدترین</option>
                <option value="best">پرفروش‌ترین</option>
                <option value="cheap">ارزان‌ترین</option>
                <option value="expensive">گران‌ترین</option>
              </select>
            </div>
            <div className="flex gap-2 pt-2">
              <button type="submit" className="flex-1 rounded-xl bg-hyper-dark-sale text-white py-2 text-sm font-bold">اعمال فیلتر</button>
              <Link href="/products" className="rounded-xl border border-hyper-light-border dark:border-hyper-dark-border px-4 py-2 text-sm">پاک کردن</Link>
            </div>
          </form>
        </aside>
        <section className="md:col-span-3">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 py-20">محصولی با این فیلترها پیدا نشد.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </section>
      </div>
    </PageShell>
  )
}

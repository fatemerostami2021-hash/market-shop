// مگامنو — سه دکمه + پنل مات (بدون بلور)
'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IoChevronDown } from 'react-icons/io5'
import { useLocale } from '../LocaleProvider'
import { CATEGORIES as ALL_CATEGORIES } from '../../../src/lib/categories'

const CATEGORIES = ALL_CATEGORIES.filter((c) => c.menu)

type Section = 'categories' | 'best' | 'new'

const T = {
  fa: {
    categories: 'دسته‌بندی کالاها', best: 'پرفروش‌ها', new: 'تازه‌ها',
    filters: 'فیلترها', price: 'محدوده قیمت (تومان)', min: 'از', max: 'تا',
    brands: 'برند', discounted: 'فقط کالاهای تخفیف‌دار', sort: 'مرتب‌سازی',
    apply: 'اعمال فیلتر', reset: 'پاک کردن',
    sorts: { newest: 'جدیدترین', cheap: 'ارزان‌ترین', expensive: 'گران‌ترین' },
    viewAll: 'مشاهده همه',
  },
  en: {
    categories: 'Categories', best: 'Best Sellers', new: 'New Arrivals',
    filters: 'Filters', price: 'Price range', min: 'From', max: 'To',
    brands: 'Brand', discounted: 'Discounted only', sort: 'Sort by',
    apply: 'Apply filters', reset: 'Reset',
    sorts: { newest: 'Newest', cheap: 'Cheapest', expensive: 'Most expensive' },
    viewAll: 'View all',
  },
}

const BRANDS = ['Brand A', 'Brand B', 'Brand C', 'Brand D']

export default function MegaNav() {
  const { locale } = useLocale()
  const t = T[locale]
  const router = useRouter()

  const [open, setOpen] = useState<Section | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [min, setMin] = useState('')
  const [max, setMax] = useState('')
  const [brands, setBrands] = useState<string[]>([])
  const [discounted, setDiscounted] = useState(false)
  const [sort, setSort] = useState<'newest' | 'cheap' | 'expensive'>('newest')

  const cancelClose = () => { if (timer.current) clearTimeout(timer.current) }
  const scheduleClose = () => { cancelClose(); timer.current = setTimeout(() => setOpen(null), 150) }
  const openNow = (s: Section) => { cancelClose(); setOpen(s) }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const reset = () => { setMin(''); setMax(''); setBrands([]); setDiscounted(false); setSort('newest') }

  const go = (extra: Record<string, string> = {}) => {
    const p = new URLSearchParams({ section: open ?? 'categories', sort, ...extra })
    if (min) p.set('min', min)
    if (max) p.set('max', max)
    if (brands.length) p.set('brands', brands.join(','))
    if (discounted) p.set('discounted', '1')
    router.push(`/products?${p.toString()}`)
    setOpen(null)
  }

  const trigger = (s: Section) => (
    <button
      key={s}
      onMouseEnter={() => openNow(s)}
      onMouseLeave={scheduleClose}
      onClick={() => setOpen(open === s ? null : s)}
      aria-expanded={open === s}
      className={`flex items-center gap-1 transition-colors hover:text-hyper-light-accent dark:hover:text-hyper-dark-accent ${
        open === s ? 'text-hyper-light-accent dark:text-hyper-dark-accent' : ''
      }`}
    >
      {t[s]}
      {s === 'categories' && <IoChevronDown className={`transition-transform ${open === s ? 'rotate-180' : ''}`} />}
    </button>
  )

  return (
    <>
      {trigger('categories')}
      {trigger('best')}
      {trigger('new')}

      {open && (
        <div
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          className="absolute inset-x-0 top-full z-40 px-6"
        >
          <div className="container mx-auto mt-2 grid grid-cols-12 gap-6 rounded-3xl border border-hyper-light-border dark:border-hyper-dark-border bg-white dark:bg-hyper-dark-card shadow-2xl p-6">
            {/* فیلترها */}
            <aside className="col-span-12 md:col-span-4 space-y-4 md:border-e border-black/10 dark:border-white/10 md:pe-6">
              <h3 className="font-bold">{t.filters}</h3>

              <div>
                <p className="text-xs opacity-70 mb-2">{t.price}</p>
                <div className="flex gap-2">
                  <input value={min} onChange={(e) => setMin(e.target.value.replace(/\D/g, ''))} placeholder={t.min} inputMode="numeric"
                    className="w-full rounded-xl bg-hyper-light-card dark:bg-hyper-dark-bg px-3 py-2 text-sm outline-none border border-hyper-light-border dark:border-hyper-dark-border" />
                  <input value={max} onChange={(e) => setMax(e.target.value.replace(/\D/g, ''))} placeholder={t.max} inputMode="numeric"
                    className="w-full rounded-xl bg-hyper-light-card dark:bg-hyper-dark-bg px-3 py-2 text-sm outline-none border border-hyper-light-border dark:border-hyper-dark-border" />
                </div>
              </div>

              <div>
                <p className="text-xs opacity-70 mb-2">{t.brands}</p>
                <div className="flex flex-wrap gap-2">
                  {BRANDS.map((b) => {
                    const on = brands.includes(b)
                    return (
                      <button key={b} onClick={() => setBrands(on ? brands.filter((x) => x !== b) : [...brands, b])}
                        className={`rounded-full px-3 py-1 text-xs border transition-colors ${
                          on ? 'bg-hyper-dark-accent text-black border-transparent' : 'border-hyper-light-border dark:border-hyper-dark-border'
                        }`}>
                        {b}
                      </button>
                    )
                  })}
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={discounted} onChange={(e) => setDiscounted(e.target.checked)} />
                {t.discounted}
              </label>

              <div>
                <p className="text-xs opacity-70 mb-2">{t.sort}</p>
                <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)}
                  className="w-full rounded-xl bg-hyper-light-card dark:bg-hyper-dark-bg px-3 py-2 text-sm outline-none border border-hyper-light-border dark:border-hyper-dark-border">
                  {Object.entries(t.sorts).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button onClick={() => go()} className="flex-1 rounded-xl bg-hyper-dark-sale text-white py-2 text-sm font-bold">{t.apply}</button>
                <button onClick={reset} className="rounded-xl border border-hyper-light-border dark:border-hyper-dark-border px-4 py-2 text-sm">{t.reset}</button>
              </div>
            </aside>

            {/* دسته‌بندی‌ها */}
            <div className="col-span-12 md:col-span-8">
              <h3 className="font-bold mb-4">{t[open]}</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {CATEGORIES.map((c) => (
                  <div key={c.slug}>
                    <button onClick={() => go({ category: c.slug })}
                      className="font-bold mb-2 hover:text-hyper-dark-accent transition-colors">
                      {c[locale]}
                    </button>
                    <ul className="space-y-1 text-sm opacity-80">
                      {c.sub.map((s) => (
                        <li key={s.slug}>
                          <button onClick={() => go({ category: c.slug, sub: s.slug })} className="hover:text-hyper-dark-accent transition-colors">
                            {s[locale]}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
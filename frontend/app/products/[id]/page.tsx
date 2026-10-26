import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageShell from '../../components/layout/PageShell'
import AddToCart from '../../components/product/AddToCart'
import { categoryBySlug } from '../../../src/lib/categories'
import ImageSlot from '../../components/ui/ImageSlot'
import { IoImageOutline } from 'react-icons/io5'
import { discountPercent, effectivePrice, faName, fetchProduct, toman } from '../../../src/lib/products'

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const n = Number(id)
  if (!Number.isInteger(n) || n < 1) notFound()
  const p = await fetchProduct(n)
  if (!p) notFound()
  const cat = categoryBySlug(p.category)
  const off = discountPercent(p)

  return (
    <PageShell>
      <nav className="text-xs text-gray-500 mb-6 flex gap-2">
        <Link href="/" className="hover:underline">خانه</Link>/
        <Link href="/products" className="hover:underline">محصولات</Link>
        {cat && <>/<Link href={`/products?category=${cat.slug}`} className="hover:underline">{cat.fa}</Link></>}
      </nav>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="rounded-3xl overflow-hidden border border-hyper-light-border dark:border-hyper-dark-border bg-black">
          <div className="aspect-square"><ImageSlot src={p.image_url} alt={faName(p.name)} icon={cat?.icon ?? IoImageOutline} iconSize={96} /></div>
        </div>
        <div>
          {cat && <span className="text-xs text-hyper-light-accent dark:text-hyper-dark-accent font-semibold">{cat.fa}</span>}
          <h1 className="text-3xl font-black mt-1 mb-4">{faName(p.name)}</h1>
          {p.description && <p className="text-sm text-gray-500 dark:text-gray-400 leading-7 mb-6" dir="auto">{p.description}</p>}
          <div className="mb-6">
            {off > 0 && (
              <div className="flex items-center gap-3 mb-1">
                <span className="text-gray-400 line-through">{toman(p.price)}</span>
                <span className="bg-hyper-dark-sale text-white text-xs px-2.5 py-1 rounded-full font-bold">٪{off.toLocaleString('fa-IR')} تخفیف</span>
              </div>
            )}
            <p className="text-3xl font-black text-hyper-dark-sale dark:text-hyper-dark-accent">{toman(effectivePrice(p))} تومان</p>
          </div>
          {p.stock !== undefined && (
            <p className={`text-sm mb-6 ${p.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
              {p.stock > 0 ? 'موجود در انبار' : 'ناموجود'}
            </p>
          )}
          {(p.stock === undefined || p.stock > 0) && <AddToCart product={p} full />}
        </div>
      </div>
    </PageShell>
  )
}

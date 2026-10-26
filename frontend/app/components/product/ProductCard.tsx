// کارت محصول
import Link from 'next/link'
import { IoStar } from 'react-icons/io5'
import { categoryImage } from '../../../src/lib/categories'
import { Product, discountPercent, effectivePrice, faName, toman } from '../../../src/lib/products'
import AddToCart from './AddToCart'

export type { Product }

export default function ProductCard({ product }: { product: Product }) {
  const off = discountPercent(product)
  const name = faName(product.name)
  return (
    <div className="group relative bg-hyper-light-card dark:bg-hyper-dark-card rounded-2xl border border-hyper-light-border dark:border-hyper-dark-border overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
      {off > 0 && (
        <div className="absolute top-3 right-3 z-10 bg-hyper-dark-sale text-white text-xs px-2.5 py-1 rounded-full font-bold shadow-md">
          ٪{off.toLocaleString('fa-IR')} تخفیف
        </div>
      )}
      <Link href={`/products/${product.id}`} className="block overflow-hidden h-52 bg-gray-100 dark:bg-black">
        <img src={product.image_url || categoryImage(product.category)} alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      </Link>
      <div className="p-5">
        <span className="text-xs text-hyper-light-accent dark:text-hyper-dark-accent font-semibold">کیمیا مارت</span>
        <Link href={`/products/${product.id}`}><h4 className="font-bold text-base mt-1 mb-1 hover:text-hyper-dark-accent transition-colors">{name}</h4></Link>
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-3">
          <IoStar className="text-yellow-400" /> <span>۴.۸</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            {off > 0 && <span className="text-xs text-gray-400 line-through block">{toman(product.price)}</span>}
            <p className="text-lg font-extrabold text-hyper-dark-sale dark:text-hyper-dark-accent">{toman(effectivePrice(product))} تومان</p>
          </div>
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  )
}

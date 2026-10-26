// app/components/home/FeaturedProducts.tsx
import { IoArrowBack } from 'react-icons/io5'
import ProductCard, { Product } from '../product/ProductCard'

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch('http://localhost:5000/api/products', { cache: 'no-store' })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data.data) ? data.data : []
  } catch {
    return []
  }
}

export default async function FeaturedProducts({ 
  title = 'پیشنهادهای ویژه هایپرینو', 
  subtitle = 'فرصت محدود' 
}: { 
  title?: string; 
  subtitle?: string 
}) {
  const products = await getProducts()

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
          <a href="#" className="text-sm text-hyper-dark-accent flex items-center gap-1 hover:underline">
            همه شگفت‌انگیزها <IoArrowBack />
          </a>
        </div>

        {products.length === 0 ? (
          <p className="text-center text-gray-500 py-10">محصولی یافت نشد.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((p: Product) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
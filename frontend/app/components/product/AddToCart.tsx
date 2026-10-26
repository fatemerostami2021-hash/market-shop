'use client'
import { useState } from 'react'
import { IoCartOutline, IoCheckmark } from 'react-icons/io5'
import { useCart } from '../../../src/store/cart'
import { categoryImage, } from '../../../src/lib/categories'
import { Product, effectivePrice, faName } from '../../../src/lib/products'

export default function AddToCart({ product, full = false }: { product: Product; full?: boolean }) {
  const add = useCart((s) => s.add)
  const [done, setDone] = useState(false)
  const onClick = () => {
    add({ id: product.id, name: faName(product.name), price: effectivePrice(product), image: product.image_url || categoryImage(product.category) })
    setDone(true)
    setTimeout(() => setDone(false), 1200)
  }
  if (full) {
    return (
      <button onClick={onClick} className="flex items-center justify-center gap-2 w-full bg-hyper-dark-sale hover:bg-red-600 text-white font-black rounded-xl py-3.5 transition-colors">
        {done ? <><IoCheckmark size={20} /> به سبد اضافه شد</> : <><IoCartOutline size={20} /> افزودن به سبد خرید</>}
      </button>
    )
  }
  return (
    <button onClick={onClick} aria-label="افزودن به سبد"
      className="bg-hyper-dark-bg dark:bg-white text-white dark:text-hyper-dark-bg p-3 rounded-xl hover:bg-hyper-dark-sale dark:hover:bg-hyper-light-accent transition-colors">
      {done ? <IoCheckmark size={20} /> : <IoCartOutline size={20} />}
    </button>
  )
}

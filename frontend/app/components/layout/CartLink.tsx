'use client'
import { useEffect, useState } from 'react'
import { IoCartOutline } from 'react-icons/io5'
import { useCart } from '../../../src/store/cart'

export default function CartLink() {
  const count = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0))
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return (
    <a href="/cart" aria-label="سبد خرید" className="relative text-xl hover:text-hyper-dark-sale dark:hover:text-hyper-light-accent transition-colors">
      <IoCartOutline />
      {mounted && count > 0 && (
        <span className="absolute -top-1 -right-1 bg-hyper-dark-sale text-white text-[10px] min-w-4 h-4 px-1 flex items-center justify-center rounded-full">
          {count.toLocaleString('fa-IR')}
        </span>
      )}
    </a>
  )
}

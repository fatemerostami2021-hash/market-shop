'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IoAdd, IoImageOutline, IoRemove, IoTrashOutline } from 'react-icons/io5'
import PageShell from '../components/layout/PageShell'
import ImageSlot from '../components/ui/ImageSlot'
import { useCart } from '../../src/store/cart'
import { toman } from '../../src/lib/products'

export default function CartPage() {
  const { items, setQty, remove, clear } = useCart()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const total = items.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <PageShell title="سبد خرید" subtitle="مرور و نهایی‌سازی">
      {!mounted ? null : items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 mb-6">سبد خرید شما خالی است.</p>
          <Link href="/products" className="inline-block bg-hyper-dark-sale text-white font-bold rounded-xl px-8 py-3">مشاهده محصولات</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {items.map((i) => (
              <div key={i.id} className="flex items-center gap-4 rounded-2xl border border-hyper-light-border dark:border-hyper-dark-border bg-hyper-light-card dark:bg-hyper-dark-card p-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0"><ImageSlot src={i.image && !i.image.startsWith('/images/') ? i.image : ''} alt={i.name} icon={IoImageOutline} iconSize={28} /></div>
                <div className="flex-1">
                  <Link href={`/products/${i.id}`} className="font-bold hover:text-hyper-dark-accent transition-colors">{i.name}</Link>
                  <p className="text-sm text-hyper-dark-sale dark:text-hyper-dark-accent font-bold mt-1">{toman(i.price)} تومان</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setQty(i.id, i.qty + 1)} aria-label="افزایش" className="p-2 rounded-lg border border-hyper-light-border dark:border-hyper-dark-border"><IoAdd /></button>
                  <span className="w-6 text-center font-bold">{i.qty.toLocaleString('fa-IR')}</span>
                  <button onClick={() => setQty(i.id, i.qty - 1)} aria-label="کاهش" className="p-2 rounded-lg border border-hyper-light-border dark:border-hyper-dark-border"><IoRemove /></button>
                </div>
                <button onClick={() => remove(i.id)} aria-label="حذف" className="p-2 text-gray-400 hover:text-hyper-dark-sale"><IoTrashOutline size={20} /></button>
              </div>
            ))}
            <button onClick={clear} className="text-xs text-gray-500 hover:underline">خالی کردن سبد</button>
          </div>
          <aside className="rounded-2xl border border-hyper-light-border dark:border-hyper-dark-border p-6 h-fit">
            <h3 className="font-black mb-4">خلاصه سفارش</h3>
            <div className="flex justify-between text-sm mb-2"><span>جمع کالاها</span><span>{toman(total)} تومان</span></div>
            <div className="flex justify-between text-xs text-gray-500 mb-6"><span>ارسال رایگان بالای ۱٬۵۰۰٬۰۰۰ تومان (تهران)</span></div>
            <button disabled className="w-full rounded-xl bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold py-3 cursor-not-allowed">پرداخت آنلاین به‌زودی فعال می‌شود</button>
          </aside>
        </div>
      )}
    </PageShell>
  )
}

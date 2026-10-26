// app/components/product/ProductCard.tsx
'use client'
import { IoCartOutline, IoStar } from 'react-icons/io5'

export interface Product {
  id: number;
  name: string;
  price: number;
  discount_price: number;
  image_url: string | null;
}

const FA_NAMES: Record<string, string> = {
  'Red Apples 1kg': 'سیب قرمز ۱ کیلویی',
  'Tomatoes 1kg': 'گوجه‌فرنگی ۱ کیلویی',
  'Fresh Milk 1L': 'شیر تازه ۱ لیتری',
  'Plain Yogurt 900g': 'ماست ساده ۹۰۰ گرمی',
}

export default function ProductCard({ product }: { product: Product }) {
  const hasDiscount = product.discount_price > 0
  const faName = FA_NAMES[product.name] || product.name

  return (
    <div className="group relative bg-hyper-light-card dark:bg-hyper-dark-card rounded-2xl border border-hyper-light-border dark:border-hyper-dark-border overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
      {hasDiscount && (
        <div className="absolute top-3 right-3 z-10 bg-hyper-dark-sale text-white text-xs px-2.5 py-1 rounded-full font-bold shadow-md">
          تخفیف
        </div>
      )}
      <div className="overflow-hidden h-52 bg-gray-100 dark:bg-black">
        <img
          src={product.image_url || `https://placehold.co/600x600/1A1A1A/FFD700?text=${encodeURIComponent(product.name)}`}
          alt={faName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>
      <div className="p-5">
        <span className="text-xs text-hyper-light-accent dark:text-hyper-dark-accent font-semibold">کیمیا مارت</span>
        <h4 className="font-bold text-base mt-1 mb-1">{faName}</h4>
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-3">
          <IoStar className="text-yellow-400" /> <span>۴.۸</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            {hasDiscount ? (
              <>
                <span className="text-xs text-gray-400 line-through block">
                  {Number(product.price).toLocaleString('fa-IR')}
                </span>
                <p className="text-lg font-extrabold text-hyper-dark-sale dark:text-hyper-dark-accent">
                  {Number(product.discount_price).toLocaleString('fa-IR')} تومان
                </p>
              </>
            ) : (
              <p className="text-lg font-extrabold text-hyper-dark-sale dark:text-hyper-dark-accent">
                {Number(product.price).toLocaleString('fa-IR')} تومان
              </p>
            )}
          </div>
          <button aria-label="افزودن به سبد"
            className="bg-hyper-dark-bg dark:bg-white text-white dark:text-hyper-dark-bg p-3 rounded-xl hover:bg-hyper-dark-sale dark:hover:bg-hyper-light-accent transition-colors">
            <IoCartOutline size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
// مگامنو — زیرشاخه‌های دسته‌بندی کالا
'use client'
import { useState } from 'react'
import { IoChevronDown } from 'react-icons/io5'

const CATEGORIES = [
  { name: 'کالاهای اساسی', subs: ['برنج', 'روغن', 'قند و نبات', 'حبوبات'] },
  { name: 'میوه و سبزی', subs: ['میوه تازه', 'سبزیجات', 'میوه خشک'] },
  { name: 'نان و شیرینی', subs: ['نان صنعتی', 'شیرینی', 'کیک'] },
  { name: 'لبنیات', subs: ['شیر', 'ماست', 'پنیر', 'کره'] },
  { name: 'پروتئینی', subs: ['گوشت قرمز', 'مرغ', 'ماهی', 'تخم‌مرغ'] },
  { name: 'صبحانه', subs: ['عسل', 'مربا', 'کره بادام‌زمینی'] },
  { name: 'تنقلات', subs: ['چیپس و اسنک', 'شکلات', 'بیسکویت'] },
  { name: 'نوشیدنی', subs: ['نوشابه', 'آبمیوه', 'چای و دمنوش'] },
]

export default function MegaMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className="flex items-center gap-1 font-bold text-sm hover:text-hyper-light-accent dark:hover:text-hyper-dark-accent transition-colors">
        دسته‌بندی کالاها <IoChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full pt-3 z-50 w-[720px]">
          <div className="bg-white dark:bg-hyper-dark-card border border-hyper-light-border dark:border-hyper-dark-border rounded-2xl shadow-2xl p-6 grid grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => (
              <div key={cat.name}>
                <h5 className="font-bold text-sm mb-2 text-hyper-dark-sale dark:text-hyper-dark-accent border-b border-dashed border-gray-300 dark:border-gray-700 pb-1">
                  {cat.name}
                </h5>
                <ul className="space-y-1.5">
                  {cat.subs.map((s) => (
                    <li key={s}>
                      <a href="#" className="text-xs text-gray-600 dark:text-gray-400 hover:text-hyper-light-accent dark:hover:text-hyper-dark-accent transition-colors">
                        {s}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

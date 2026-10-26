import Link from 'next/link'
import { IoGiftOutline, IoPricetagOutline, IoRibbonOutline, IoStarOutline } from 'react-icons/io5'
import PageShell from '../components/layout/PageShell'

export const metadata = { title: 'باشگاه مشتریان | کیمیا مارت' }

const BENEFITS = [
  { icon: IoStarOutline, title: 'امتیاز با هر خرید', text: 'از هر خرید امتیاز بگیرید و در خریدهای بعدی استفاده کنید.' },
  { icon: IoPricetagOutline, title: 'تخفیف اختصاصی اعضا', text: 'پیشنهادهای ویژه‌ای که فقط برای اعضای باشگاه نمایش داده می‌شود.' },
  { icon: IoGiftOutline, title: 'هدیه مناسبتی', text: 'در مناسبت‌ها و جشنواره‌ها هدیه و کد تخفیف دریافت کنید.' },
  { icon: IoRibbonOutline, title: 'سطح‌های عضویت', text: 'هرچه بیشتر خرید کنید، به سطح بالاتر و مزایای بیشتر می‌رسید.' },
]

export default function ClubPage() {
  return (
    <PageShell title="باشگاه مشتریان" subtitle="خرید کنید، امتیاز بگیرید">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {BENEFITS.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-3xl border border-hyper-light-border dark:border-hyper-dark-border bg-hyper-light-card dark:bg-hyper-dark-card p-6">
            <Icon size={32} className="text-hyper-dark-sale dark:text-hyper-dark-accent mb-4" />
            <h3 className="font-black mb-2">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-7">{text}</p>
          </div>
        ))}
      </div>
      <div className="rounded-3xl bg-black text-white p-10 text-center">
        <h3 className="text-2xl font-black mb-3">به باشگاه مشتریان کیمیا مارت بپیوندید</h3>
        <p className="text-gray-400 text-sm mb-6">عضویت پس از فعال شدن حساب کاربری در سایت امکان‌پذیر خواهد بود. تا آن زمان خرید خود را ادامه دهید.</p>
        <Link href="/products" className="inline-block bg-hyper-dark-accent text-black font-black rounded-xl px-8 py-3 hover:scale-105 transition-transform">شروع خرید</Link>
      </div>
    </PageShell>
  )
}

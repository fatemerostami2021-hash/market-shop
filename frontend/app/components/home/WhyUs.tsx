// چرا هایپرینو؟ — ۴ کارت مزیت
import { IoTimeOutline, IoShieldCheckmarkOutline, IoRefreshOutline, IoHeadsetOutline } from 'react-icons/io5'

const ITEMS = [
  { icon: IoTimeOutline, title: 'تحویل دقیق', desc: 'ارسال زمان‌بندی‌شده و سریع' },
  { icon: IoRefreshOutline, title: 'بازگشت آسان', desc: 'ضمانت بی‌قیدوشرط تا ۷ روز' },
  { icon: IoShieldCheckmarkOutline, title: 'تضمین اصالت', desc: 'همه کالاها از تأمین‌کننده معتبر' },
  { icon: IoHeadsetOutline, title: 'پشتیبانی واقعی', desc: 'پاسخ‌گویی هر روز از ۸ صبح تا ۱۲ شب' },
]

export default function WhyUs() {
  return (
    <section className="container mx-auto px-6 py-10">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs text-hyper-light-accent dark:text-hyper-dark-accent mb-1">همراه شما، از انتخاب تا تحویل</p>
          <h3 className="text-xl font-black">چرا هایپرینو؟</h3>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {ITEMS.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-center gap-4 bg-hyper-light-card dark:bg-hyper-dark-card border border-hyper-light-border dark:border-hyper-dark-border rounded-2xl p-5 hover:border-hyper-dark-accent transition-colors">
            <div className="w-12 h-12 shrink-0 rounded-full bg-hyper-dark-accent/10 flex items-center justify-center text-hyper-dark-accent">
              <Icon size={24} />
            </div>
            <div>
              <p className="font-bold text-sm">{title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

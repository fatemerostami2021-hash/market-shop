import Link from 'next/link'
import PageShell from './components/layout/PageShell'

export default function NotFound() {
  return (
    <PageShell>
      <div className="text-center py-20">
        <p className="text-6xl font-black text-hyper-dark-accent mb-4">۴۰۴</p>
        <p className="text-gray-500 mb-6">صفحه‌ای که دنبالش بودید پیدا نشد.</p>
        <Link href="/" className="inline-block bg-hyper-dark-sale text-white font-bold rounded-xl px-8 py-3">بازگشت به خانه</Link>
      </div>
    </PageShell>
  )
}

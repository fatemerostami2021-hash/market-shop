import { IoCallOutline, IoLocationOutline, IoNavigateOutline, IoTimeOutline } from 'react-icons/io5'
import PageShell from '../components/layout/PageShell'
import { BRANCHES } from '../../src/data/branches'

export const metadata = { title: 'شعب هایپرینو | کیمیا مارت' }

export default function BranchesPage() {
  return (
    <PageShell title="شعب هایپرینو" subtitle="به ما سر بزنید">
      <div className="grid md:grid-cols-2 gap-6">
        {BRANCHES.map((b) => (
          <div key={b.name} className="rounded-3xl border border-hyper-light-border dark:border-hyper-dark-border bg-hyper-light-card dark:bg-hyper-dark-card p-7">
            <h3 className="font-black text-lg mb-4">{b.name}</h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-center gap-2"><IoLocationOutline className="text-hyper-dark-sale dark:text-hyper-dark-accent shrink-0" /> {b.address}</li>
              <li className="flex items-center gap-2"><IoCallOutline className="text-hyper-dark-sale dark:text-hyper-dark-accent shrink-0" /> {b.phone}</li>
              {b.hours && <li className="flex items-center gap-2"><IoTimeOutline className="text-hyper-dark-sale dark:text-hyper-dark-accent shrink-0" /> {b.hours}</li>}
            </ul>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.address)}`} target="_blank" rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-hyper-dark-bg dark:bg-white text-white dark:text-hyper-dark-bg rounded-xl px-5 py-2.5 text-sm font-bold hover:bg-hyper-dark-sale transition-colors">
              <IoNavigateOutline /> مسیریابی
            </a>
          </div>
        ))}
      </div>
    </PageShell>
  )
}

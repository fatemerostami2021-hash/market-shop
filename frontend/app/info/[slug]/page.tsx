import { notFound } from 'next/navigation'
import PageShell from '../../components/layout/PageShell'
import { INFO } from '../../../src/data/info'

export function generateStaticParams() { return Object.keys(INFO).map((slug) => ({ slug })) }

export default async function InfoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = INFO[slug]
  if (!page) notFound()
  return (
    <PageShell title={page.title}>
      <div className="max-w-2xl space-y-5 leading-8 text-gray-700 dark:text-gray-300">
        {page.body.map((t, i) => <p key={i}>{t}</p>)}
      </div>
    </PageShell>
  )
}

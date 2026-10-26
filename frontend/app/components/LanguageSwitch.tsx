'use client'
import { IoLanguageOutline } from 'react-icons/io5'
import { useLocale } from './LocaleProvider'

export default function LanguageSwitch() {
  const { locale, setLocale } = useLocale()
  return (
    <button
      onClick={() => setLocale(locale === 'fa' ? 'en' : 'fa')}
      aria-label="Change language"
      className="flex items-center gap-1 text-sm border border-hyper-light-border dark:border-hyper-dark-border rounded-full px-3 py-1.5 hover:border-hyper-light-accent transition-colors"
    >
      <IoLanguageOutline /> {locale === 'fa' ? 'EN' : 'فا'}
    </button>
  )
}
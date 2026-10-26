'use client'
import { createContext, useContext, useEffect, useState } from 'react'

export type Locale = 'fa' | 'en'
const Ctx = createContext<{ locale: Locale; setLocale: (l: Locale) => void }>({
  locale: 'fa',
  setLocale: () => {},
})

export default function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('fa')

  useEffect(() => {
    const saved = localStorage.getItem('locale')
    if (saved === 'fa' || saved === 'en') setLocale(saved)
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr'
    localStorage.setItem('locale', locale)
  }, [locale])

  return <Ctx.Provider value={{ locale, setLocale }}>{children}</Ctx.Provider>
}

export const useLocale = () => useContext(Ctx)
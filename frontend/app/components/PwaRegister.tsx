'use client'
import { useEffect } from 'react'
import { BeforeInstallPromptEvent } from '../../src/lib/pwa'

// ثبت service worker و نگه‌داشتن رویداد نصب برای دکمه «نصب اپلیکیشن»
export default function PwaRegister() {
  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault()
      window.__deferredInstallPrompt = e as BeforeInstallPromptEvent
      window.dispatchEvent(new Event('pwa-installable'))
    }
    window.addEventListener('beforeinstallprompt', onPrompt)
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
    return () => window.removeEventListener('beforeinstallprompt', onPrompt)
  }, [])
  return null
}

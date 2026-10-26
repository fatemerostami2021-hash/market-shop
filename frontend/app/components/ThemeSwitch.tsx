'use client'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5'

export default function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return <span className="w-9 h-9" />
  const dark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="w-9 h-9 flex items-center justify-center rounded-full border border-hyper-light-border dark:border-hyper-dark-border hover:border-hyper-light-accent transition-colors text-lg"
    >
      {dark ? <IoSunnyOutline /> : <IoMoonOutline />}
    </button>
  )
}
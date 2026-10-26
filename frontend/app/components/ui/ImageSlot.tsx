// جای‌نگهدار تصویر: اگر src داده شود عکس نشان می‌دهد، وگرنه یک آیکون
import type { IconType } from 'react-icons'

export default function ImageSlot({
  src, alt, icon: Icon, iconSize = 48, tone = 'auto', imgClassName = '',
}: {
  src?: string | null
  alt: string
  icon: IconType
  iconSize?: number
  tone?: 'auto' | 'dark'
  imgClassName?: string
}) {
  if (src) return <img src={src} alt={alt} className={`w-full h-full object-cover ${imgClassName}`} />
  const bg = tone === 'dark'
    ? 'from-[#241c12] to-[#0d0d0d] text-hyper-dark-accent/50'
    : 'from-gray-100 to-gray-200 text-gray-400 dark:from-[#1f1f1f] dark:to-[#0f0f0f] dark:text-hyper-dark-accent/50'
  return (
    <div role="img" aria-label={alt} className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${bg}`}>
      <Icon size={iconSize} />
    </div>
  )
}

import { FaTelegramPlane } from 'react-icons/fa'
import { IoLogoInstagram, IoLogoLinkedin, IoLogoWhatsapp } from 'react-icons/io5'
import { SITE } from '../../../src/data/site'

const ITEMS = [
  { href: SITE.social.telegram, label: 'تلگرام', Icon: FaTelegramPlane },
  { href: SITE.social.instagram, label: 'اینستاگرام', Icon: IoLogoInstagram },
  { href: SITE.social.linkedin, label: 'لینکدین', Icon: IoLogoLinkedin },
  { href: SITE.social.whatsapp, label: 'واتساپ', Icon: IoLogoWhatsapp },
]

export default function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      {ITEMS.map(({ href, label, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="hover:text-hyper-dark-accent transition-colors">
          <Icon />
        </a>
      ))}
    </div>
  )
}

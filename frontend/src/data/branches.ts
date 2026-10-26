import { SITE } from './site'

// شعب — فقط شعبه‌ای که در فوتر سایت بود ثبت شده. شعب واقعی دیگر را اینجا اضافه کنید.
export interface Branch { name: string; address: string; phone: string; hours?: string }
export const BRANCHES: Branch[] = [
  { name: 'شعبه مرکزی', address: SITE.address, phone: SITE.phoneDisplay },
  // { name: 'شعبه ...', address: '...', phone: '...', hours: 'هر روز ۸ تا ۲۴' },
]

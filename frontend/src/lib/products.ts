// دریافت محصولات از بک‌اند؛ اگر بک‌اند در دسترس نبود (مثلاً روی Vercel) از داده نمونه استفاده می‌شود
import { normalizeCategory } from './categories'

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export interface Product {
  id: number
  name: string
  description?: string | null
  price: number
  discount_price: number | null
  stock?: number
  image_url: string | null
  category?: string | null
  sold?: number
}

export const FA_NAMES: Record<string, string> = {
  'Fresh Milk 1L': 'شیر تازه ۱ لیتری',
  'Plain Yogurt 900g': 'ماست ساده ۹۰۰ گرمی',
  'White Cheese 400g': 'پنیر سفید ۴۰۰ گرمی',
  'Red Apples 1kg': 'سیب قرمز ۱ کیلویی',
  'Tomatoes 1kg': 'گوجه‌فرنگی ۱ کیلویی',
  'Cucumbers 1kg': 'خیار ۱ کیلویی',
  'Mineral Water 1.5L': 'آب معدنی ۱.۵ لیتری',
  'Orange Juice 1L': 'آب‌پرتقال ۱ لیتری',
  'Dish Soap 750ml': 'مایع ظرفشویی ۷۵۰ میلی‌لیتری',
  'Facial Tissue 200pcs': 'دستمال کاغذی ۲۰۰ برگ',
}
export const faName = (name: string) => FA_NAMES[name] || name
export const effectivePrice = (p: Product) => (p.discount_price && p.discount_price > 0 ? p.discount_price : p.price)
export const discountPercent = (p: Product) =>
  p.discount_price && p.discount_price > 0 && p.price > 0 ? Math.round((1 - p.discount_price / p.price) * 100) : 0
export const toman = (n: number) => Number(n).toLocaleString('fa-IR')

// داده نمونه (هم‌نام با seed.sql) — id بزرگ‌تر یعنی جدیدتر
export const SAMPLE_PRODUCTS: Product[] = [
  { id: 10, name: 'Facial Tissue 200pcs', price: 30000, discount_price: null, image_url: null, category: 'household', stock: 150, sold: 40, description: 'Soft 2-ply facial tissue' },
  { id: 9, name: 'Dish Soap 750ml', price: 48000, discount_price: null, image_url: null, category: 'household', stock: 75, sold: 55, description: 'Lemon dish washing liquid' },
  { id: 8, name: 'Orange Juice 1L', price: 55000, discount_price: 50000, image_url: null, category: 'drinks', stock: 100, sold: 95, description: '100 percent orange juice' },
  { id: 7, name: 'Mineral Water 1.5L', price: 12000, discount_price: null, image_url: null, category: 'drinks', stock: 300, sold: 310, description: 'Natural mineral water' },
  { id: 6, name: 'Cucumbers 1kg', price: 32000, discount_price: null, image_url: null, category: 'fruits-veg', stock: 70, sold: 120, description: 'Fresh cucumbers' },
  { id: 5, name: 'Tomatoes 1kg', price: 38000, discount_price: null, image_url: null, category: 'fruits-veg', stock: 90, sold: 180, description: 'Ripe tomatoes' },
  { id: 4, name: 'Red Apples 1kg', price: 70000, discount_price: 65000, image_url: null, category: 'fruits-veg', stock: 60, sold: 210, description: 'Fresh red apples' },
  { id: 3, name: 'White Cheese 400g', price: 135000, discount_price: null, image_url: null, category: 'dairy', stock: 40, sold: 150, description: 'Traditional white cheese' },
  { id: 2, name: 'Plain Yogurt 900g', price: 62000, discount_price: 58000, image_url: null, category: 'dairy', stock: 80, sold: 260, description: 'Creamy plain yogurt' },
  { id: 1, name: 'Fresh Milk 1L', price: 45000, discount_price: null, image_url: null, category: 'dairy', stock: 120, sold: 340, description: 'Pasteurized whole milk' },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const normalize = (p: any): Product => ({
  id: Number(p.id),
  name: String(p.name),
  description: p.description ?? null,
  price: Number(p.price),
  discount_price: p.discount_price != null ? Number(p.discount_price) : null,
  stock: p.stock != null ? Number(p.stock) : undefined,
  image_url: p.image_url ?? null,
  category: normalizeCategory(p.category),
  sold: p.sold != null ? Number(p.sold) : undefined,
})

async function get(path: string) {
  const res = await fetch(`${API_URL}${path}`, { next: { revalidate: 60 }, signal: AbortSignal.timeout(3000) })
  if (!res.ok) throw new Error(String(res.status))
  return res.json()
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const json = await get('/products?limit=100')
    const rows = Array.isArray(json.data) ? json.data.map(normalize) : []
    return rows.length ? rows : SAMPLE_PRODUCTS
  } catch {
    return SAMPLE_PRODUCTS
  }
}

export async function fetchProduct(id: number): Promise<Product | null> {
  try {
    const json = await get(`/products/${id}`)
    if (json?.data) return normalize(json.data)
  } catch {}
  return SAMPLE_PRODUCTS.find((p) => p.id === id) ?? null
}

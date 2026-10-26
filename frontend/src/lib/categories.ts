// دسته‌بندی‌های فروشگاه — منبع واحد برای صفحه اصلی، مگامنو و صفحه‌ها
export interface SubCategory { slug: string; fa: string; en: string }
export interface Category {
  slug: string; fa: string; en: string; count: string
  home: boolean // نمایش در دایره‌های صفحه اصلی
  menu: boolean // نمایش در مگامنو
  sub: SubCategory[]
}

export const CATEGORIES: Category[] = [
  { slug: 'staples', fa: 'کالاهای اساسی', en: 'Staples', count: '۶۵۰ کالا', home: true, menu: false,
    sub: [{ slug: 'rice', fa: 'برنج', en: 'Rice' }, { slug: 'oil', fa: 'روغن', en: 'Oil' }, { slug: 'pasta', fa: 'ماکارونی', en: 'Pasta' }] },
  { slug: 'fruits-veg', fa: 'میوه و سبزی', en: 'Fruits & Vegetables', count: '۲۸۰ کالا', home: true, menu: true,
    sub: [{ slug: 'fruits', fa: 'میوه تازه', en: 'Fresh fruit' }, { slug: 'veg', fa: 'سبزیجات', en: 'Vegetables' }, { slug: 'herbs', fa: 'سبزی خوردن', en: 'Herbs' }] },
  { slug: 'bread', fa: 'نان و شیرینی', en: 'Bakery', count: '۱۶۰ کالا', home: true, menu: false,
    sub: [{ slug: 'bread', fa: 'نان', en: 'Bread' }, { slug: 'pastry', fa: 'شیرینی', en: 'Pastry' }] },
  { slug: 'dairy', fa: 'لبنیات', en: 'Dairy', count: '۲۴۰ کالا', home: true, menu: true,
    sub: [{ slug: 'milk', fa: 'شیر', en: 'Milk' }, { slug: 'cheese', fa: 'پنیر', en: 'Cheese' }, { slug: 'yogurt', fa: 'ماست', en: 'Yogurt' }] },
  { slug: 'protein', fa: 'پروتئینی', en: 'Meat & Protein', count: '۱۹۰ کالا', home: true, menu: true,
    sub: [{ slug: 'chicken', fa: 'مرغ', en: 'Chicken' }, { slug: 'beef', fa: 'گوشت قرمز', en: 'Beef' }, { slug: 'fish', fa: 'ماهی', en: 'Fish' }] },
  { slug: 'breakfast', fa: 'صبحانه', en: 'Breakfast', count: '۲۷۰ کالا', home: true, menu: false,
    sub: [{ slug: 'jam', fa: 'مربا و عسل', en: 'Jam & honey' }, { slug: 'cereal', fa: 'غلات صبحانه', en: 'Cereal' }] },
  { slug: 'snacks', fa: 'تنقلات', en: 'Snacks', count: '۴۸۰ کالا', home: true, menu: false,
    sub: [{ slug: 'chips', fa: 'چیپس و پفک', en: 'Chips' }, { slug: 'nuts', fa: 'آجیل', en: 'Nuts' }, { slug: 'chocolate', fa: 'شکلات', en: 'Chocolate' }] },
  { slug: 'drinks', fa: 'نوشیدنی', en: 'Drinks', count: '۳۲۰ کالا', home: true, menu: true,
    sub: [{ slug: 'juice', fa: 'آبمیوه', en: 'Juice' }, { slug: 'soda', fa: 'نوشابه', en: 'Soft drinks' }, { slug: 'tea', fa: 'چای و قهوه', en: 'Tea & coffee' }] },
  { slug: 'household', fa: 'شوینده و بهداشتی', en: 'Household', count: '۳۹۰ کالا', home: false, menu: false,
    sub: [{ slug: 'cleaning', fa: 'شوینده', en: 'Cleaning' }, { slug: 'paper', fa: 'دستمال و کاغذی', en: 'Paper goods' }] },
]

// اسلاگ دسته‌بندی‌های دیتابیس → اسلاگ‌های فرانت
const DB_TO_SLUG: Record<string, string> = { 'fruits-vegetables': 'fruits-veg', beverages: 'drinks' }
export const normalizeCategory = (s?: string | null) => (s ? DB_TO_SLUG[s] ?? s : null)
export const categoryBySlug = (s?: string | null) => CATEGORIES.find((c) => c.slug === s)
export const categoryImage = (s?: string | null) => `/images/categories/${categoryBySlug(s) ? s : 'staples'}.svg`

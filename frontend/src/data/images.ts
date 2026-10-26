// مسیر عکس‌های واقعی سایت. هر جا مقدار خالی باشد، به‌جای عکس یک آیکون نشان داده می‌شود.
// عکس را در frontend/public/images/ بگذارید و مسیرش را اینجا بنویسید، مثلاً: '/images/hero.jpg'
export const IMAGES = {
  hero: '',
  app: '',
  bundles: ['', '', ''] as string[], // صبحانه، ناهار، دورهمی
  categories: {
    // 'dairy': '/images/categories/dairy.jpg',
  } as Record<string, string>,
}

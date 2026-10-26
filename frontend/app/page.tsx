// صفحه اصلی — ترکیب‌کنندهٔ سکشن‌ها
import Header from './components/layout/Header'
import Hero from './components/home/Hero'
import CategoryCircles from './components/home/CategoryCircles'
import FeaturedProducts from './components/home/FeaturedProducts'
import DiscountBanner from './components/home/DiscountBanner'
import WhyUs from './components/home/WhyUs'
import Bundles from './components/home/Bundles'
import AppDownload from './components/home/AppDownload'
import Newsletter from './components/home/Newsletter'
import Footer from './components/layout/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-hyper-light-bg dark:bg-hyper-dark-bg text-hyper-light-text dark:text-hyper-dark-text transition-colors duration-500">
      <Header />
      <Hero />
      <CategoryCircles />
      <FeaturedProducts title="پیشنهادهای ویژه هایپرینو" subtitle="فرصت محدود" />
      <DiscountBanner />
      <FeaturedProducts title="پرفروش‌های این هفته" subtitle="انتخاب هزاران مشتری" />
      <WhyUs />
      <Bundles />
      <AppDownload />
      <Newsletter />
      <Footer />
    </main>
  )
}

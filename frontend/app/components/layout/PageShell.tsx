// قالب مشترک صفحه‌های داخلی: هدر + محتوا + فوتر
import Header from './Header'
import Footer from './Footer'

export default function PageShell({ title, subtitle, children }: { title?: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-hyper-light-bg dark:bg-hyper-dark-bg text-hyper-light-text dark:text-hyper-dark-text transition-colors duration-500">
      <Header />
      {title && (
        <section className="bg-black py-10">
          <div className="container mx-auto px-6">
            {subtitle && <p className="text-xs text-hyper-dark-accent mb-1">{subtitle}</p>}
            <h2 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2">
              <span className="w-1 h-7 bg-hyper-dark-sale rounded-full inline-block" />
              {title}
            </h2>
          </div>
        </section>
      )}
      <div className="container mx-auto px-6 py-10">{children}</div>
      <Footer />
    </main>
  )
}

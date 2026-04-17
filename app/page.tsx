import { Suspense } from 'react'
import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { FeaturedProducts } from '@/components/featured-products'
import { ShopByCategory } from '@/components/shop-by-category'
import { AboutUsSection } from '@/components/about-us-section'
import { ReviewsSection } from '@/components/reviews-section'
import { Footer } from '@/components/footer'
import { CartSidebar } from '@/components/cart-sidebar'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <Suspense fallback={<div className="py-24 text-center">Loading products...</div>}>
          <FeaturedProducts />
        </Suspense>
        <ShopByCategory />
        <AboutUsSection />
        <ReviewsSection />
      </main>
      <Footer />
      <CartSidebar />
    </div>
  )
}

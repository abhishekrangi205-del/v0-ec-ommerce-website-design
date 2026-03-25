import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="Premium beef jerky on rustic cutting board"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-1.5 bg-primary/90 text-primary-foreground text-xs md:text-sm font-semibold rounded-full mb-6">
            Made in Canada
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-balance">
            Premium Beef Jerky, Crafted with Care
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
            All natural ingredients, no fillers, zero sugar. Experience the authentic taste of Canadian wilderness in every bite.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="text-base">
              <Link href="#products">
                View Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white">
              <Link href="#about">
                Our Story
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

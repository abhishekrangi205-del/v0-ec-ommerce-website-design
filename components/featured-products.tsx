"use client"

import { useState, useEffect, useRef } from 'react'
import { ProductCard } from './product-card'
import { Button } from './ui/button'
import { products } from '@/lib/products'
import { ChevronDown } from 'lucide-react'

export function FeaturedProducts() {
  const [showAll, setShowAll] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const displayedProducts = showAll ? products : products.slice(0, 4)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="products" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-sm font-semibold text-primary tracking-wider uppercase">
            Our Selection
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Featured Products
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handcrafted selection of premium beef jerky, made with the finest Canadian beef and natural ingredients.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {displayedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {!showAll && products.length > 4 && (
          <div className={`text-center mt-12 ${isVisible ? 'animate-fade-in-up animation-delay-500' : 'opacity-0'}`}>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll(true)}
              className="gap-2 btn-glow transition-all duration-300 hover:scale-105"
            >
              See All Products
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

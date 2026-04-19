"use client"

import { useState, useEffect, useRef } from 'react'
import { ProductCard } from './product-card'
import { Button } from './ui/button'
import { products, featuredProducts, type ProductCategory } from '@/lib/products'
import { ChevronDown, Filter } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export function FeaturedProducts() {
  const searchParams = useSearchParams()
  const [showAll, setShowAll] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all')
  const sectionRef = useRef<HTMLElement>(null)

  // Check URL params for category filter
  useEffect(() => {
    const category = searchParams.get('category') as ProductCategory | null
    if (category && ['carnivore-crave', 'beef-jerky-slabs', 'oakridge'].includes(category)) {
      setSelectedCategory(category)
      setShowAll(true)
    }
  }, [searchParams])

  // Filter products based on selection
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  const displayedProducts = showAll ? filteredProducts : featuredProducts.slice(0, 6)

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

  const categoryFilters = [
    { id: 'all' as const, label: 'All Products' },
    { id: 'carnivore-crave' as const, label: 'Carnivore Crave' },
    { id: 'beef-jerky-slabs' as const, label: 'Beef Jerky Slabs' },
    { id: 'oakridge' as const, label: 'Oakridge' },
  ]

  return (
    <section ref={sectionRef} id="products" className="py-16 md:py-24 bg-card/50">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-sm font-semibold text-primary tracking-wider uppercase">
            Our Selection
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Featured Products
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handcrafted selection of premium beef jerky, made with the finest beef and natural ingredients.
          </p>
        </div>

        {/* Category Filter */}
        {showAll && (
          <div className={`flex flex-wrap justify-center gap-2 mb-8 ${isVisible ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
            {categoryFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedCategory(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === filter.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 md:gap-8">
          {displayedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {!showAll && (
          <div className={`text-center mt-12 ${isVisible ? 'animate-fade-in-up animation-delay-500' : 'opacity-0'}`}>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll(true)}
              className="gap-2 btn-glow transition-all duration-300 hover:scale-105 font-semibold"
            >
              <Filter className="h-4 w-4" />
              See All Products
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        )}

        {showAll && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}

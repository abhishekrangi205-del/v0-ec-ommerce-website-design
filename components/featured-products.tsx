"use client"

import { useState } from 'react'
import { ProductCard } from './product-card'
import { Button } from './ui/button'
import { products } from '@/lib/products'
import { ChevronDown } from 'lucide-react'

export function FeaturedProducts() {
  const [showAll, setShowAll] = useState(false)
  const displayedProducts = showAll ? products : products.slice(0, 4)

  return (
    <section id="products" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
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
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {!showAll && products.length > 4 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll(true)}
              className="gap-2"
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

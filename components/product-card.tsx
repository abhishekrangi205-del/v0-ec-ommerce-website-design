"use client"

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Check, Eye } from 'lucide-react'
import { useCart, type Product } from './cart-context'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isVisible, setIsVisible] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleAddToCart = () => {
    addToCart(product)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1500)
  }

  const animationDirection = index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'
  const animationDelay = `${(index % 4) * 100 + 100}ms`

  return (
    <div ref={cardRef}>
      <Card 
        className={`group overflow-hidden bg-card relative product-card-animated
          ${isVisible ? animationDirection : 'opacity-0'}`}
        style={{ animationDelay }}
      >
        <Link href={`/product/${product.id}`} className="block">
          <div className="relative aspect-square overflow-hidden bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Quick view button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className="bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg">
                <Eye className="h-4 w-4" />
                View Details
              </span>
            </div>
          </div>
        </Link>
        <CardContent className="p-4 md:p-6">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-2 line-clamp-1 transition-colors duration-300 group-hover:text-primary cursor-pointer hover:underline">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between gap-4">
            <span className="text-xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            <Button
              onClick={handleAddToCart}
              size="sm"
              className={`gap-2 btn-glow transition-all duration-300 ${isAdded ? 'bg-accent' : ''}`}
            >
              {isAdded ? (
                <>
                  <Check className="h-4 w-4" />
                  Added
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

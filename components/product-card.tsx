"use client"

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Check, Eye } from 'lucide-react'
import { useCart } from './cart-context'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { type ProductDetails, badgeConfig, type ProductBadge } from '@/lib/products'

interface ProductCardProps {
  product: ProductDetails
  index?: number
}

function ProductBadges({ badges }: { badges: ProductBadge[] }) {
  // Show max 2 badges
  const displayBadges = badges.slice(0, 2)
  
  return (
    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
      {displayBadges.map((badge) => {
        const config = badgeConfig[badge]
        return (
          <span
            key={badge}
            className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-bold rounded-md shadow-md ${config.className}`}
          >
            <span>{config.icon}</span>
            <span>{config.label}</span>
          </span>
        )
      })}
    </div>
  )
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
    })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1500)
  }

  const animationDirection = index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'
  const animationDelay = `${(index % 4) * 100 + 100}ms`

  return (
    <div ref={cardRef}>
      <Card 
        className={`group overflow-hidden bg-card relative product-card-animated border-border/50 hover:border-primary/30
          ${isVisible ? animationDirection : 'opacity-0'}`}
        style={{ animationDelay }}
      >
        {/* Badges - hidden on mobile */}
        {product.badges && product.badges.length > 0 && (
          <div className="hidden md:block">
            <ProductBadges badges={product.badges} />
          </div>
        )}

        <Link href={`/product/${product.id}`} className="block">
          <div className="relative aspect-square overflow-hidden bg-muted/50">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Quick view button - desktop only */}
            <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className="bg-background/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-xl border">
                <Eye className="h-4 w-4" />
                View Details
              </span>
            </div>
          </div>
        </Link>
        <CardContent className="p-4 md:p-5">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-semibold text-foreground mb-1.5 line-clamp-1 transition-colors duration-300 group-hover:text-primary cursor-pointer">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
          <div className="flex items-center justify-between gap-3">
            <span className="text-xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            <Button
              onClick={handleAddToCart}
              size="sm"
              className={`gap-1.5 btn-glow transition-all duration-300 font-semibold ${isAdded ? 'bg-green-600 hover:bg-green-600' : ''}`}
            >
              {isAdded ? (
                <>
                  <Check className="h-4 w-4" />
                  Added
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  Add
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

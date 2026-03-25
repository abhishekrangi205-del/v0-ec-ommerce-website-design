"use client"

import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import { useCart, type Product } from './cart-context'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  return (
    <Card className="group overflow-hidden bg-card hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className="p-4 md:p-6">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between gap-4">
          <span className="text-xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          <Button
            onClick={() => addToCart(product)}
            size="sm"
            className="gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

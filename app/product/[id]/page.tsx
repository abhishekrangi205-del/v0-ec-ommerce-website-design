"use client"

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ShoppingCart, Check, Minus, Plus, Truck, Shield, Leaf, Star, Zap, Flame, Trophy, Beef } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CartSidebar } from '@/components/cart-sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useCart } from '@/components/cart-context'
import { getProductById, getRelatedProducts, badgeConfig, type ProductDetails } from '@/lib/products'

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  
  const [product, setProduct] = useState<ProductDetails | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<ProductDetails[]>([])
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const id = params.id as string
    const foundProduct = getProductById(id)
    if (foundProduct) {
      setProduct(foundProduct)
      setRelatedProducts(getRelatedProducts(id, 4))
      setQuantity(1)
    }
  }, [params.id])

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleAddToCart = () => {
    if (!product) return
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
      })
    }
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4">Product not found</h1>
            <Button onClick={() => router.push('/')}>Back to Home</Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#products" className="hover:text-primary transition-colors">Products</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        {/* Product Details Section */}
        <section className={`container mx-auto px-4 py-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Product Image - single main image only */}
            <div>
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-card border p-6">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain transition-all duration-500"
                  priority
                  unoptimized
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {product.badges.map((badge) => {
                  const config = badgeConfig[badge]
                  return (
                    <span
                      key={badge}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold rounded-full ${config.className}`}
                    >
                      <span>{config.icon}</span>
                      <span>{config.label}</span>
                    </span>
                  )
                })}
                <span className="px-3 py-1.5 bg-muted text-muted-foreground text-sm font-medium rounded-full">
                  {product.weight}
                </span>
              </div>

              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(47 reviews)</span>
                </div>
                <p className="text-3xl md:text-4xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {product.longDescription}
              </p>

              {/* Benefits */}
              <div className="bg-muted/50 rounded-xl p-5">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Key Benefits
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3">
                {product.features.slice(0, 6).map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Nutrition Facts */}
              <div className="bg-card border rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Flame className="h-5 w-5 text-primary" />
                  Nutrition Facts
                </h3>
                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Serving Size:</span>
                    <span className="ml-2 font-medium">{product.nutrition.servingSize}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between mb-2">
                      <span className="font-bold">Calories</span>
                      <span className="font-bold">{product.nutrition.calories}</span>
                    </div>
                    <div className="border-b pb-3 mb-3" />
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Protein</span>
                        <span className="font-medium">{product.nutrition.protein}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fat</span>
                        <span className="font-medium">{product.nutrition.fat}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Carbs</span>
                        <span className="font-medium">{product.nutrition.carbs}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sodium</span>
                        <span className="font-medium">{product.nutrition.sodium}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sugar</span>
                        <span className="font-medium text-green-600">{product.nutrition.sugar}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="flex items-center border rounded-lg bg-muted/30">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-muted transition-colors rounded-l-lg"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-6 py-3 font-semibold min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-muted transition-colors rounded-r-lg"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className={`flex-1 gap-2 btn-glow text-lg py-6 font-bold transition-all duration-300 ${isAdded ? 'bg-green-600 hover:bg-green-600' : ''}`}
                >
                  {isAdded ? (
                    <>
                      <Check className="h-5 w-5" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5" />
                      Add to Cart - ${(product.price * quantity).toFixed(2)}
                    </>
                  )}
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="flex flex-col items-center text-center gap-2 p-3">
                  <Truck className="h-6 w-6 text-primary" />
                  <span className="text-xs text-muted-foreground">Free Shipping Over $50</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2 p-3">
                  <Shield className="h-6 w-6 text-primary" />
                  <span className="text-xs text-muted-foreground">Quality Guaranteed</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2 p-3">
                  <Leaf className="h-6 w-6 text-primary" />
                  <span className="text-xs text-muted-foreground">All Natural</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Shop by Category Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary font-medium text-sm tracking-wider uppercase">
                Browse Collection
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
                Shop by Category
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our premium jerky collections, each crafted for a unique taste experience.
              </p>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  name: 'Carnivore Crave',
                  tagline: 'High Protein Snacks',
                  description: '45g protein per bag',
                  icon: Flame,
                  bgClass: 'bg-gradient-to-br from-zinc-900 to-zinc-800',
                  accentClass: 'text-red-500',
                  borderClass: 'hover:border-red-500/50',
                  href: '/category/carnivore-crave',
                },
                {
                  name: 'Beef Jerky Slabs',
                  tagline: 'Classic Jerky Cuts',
                  description: 'Traditional thick-cut slabs',
                  icon: Beef,
                  bgClass: 'bg-gradient-to-br from-stone-800 to-stone-700',
                  accentClass: 'text-orange-500',
                  borderClass: 'hover:border-orange-500/50',
                  href: '/category/beef-jerky-slabs',
                },
                {
                  name: 'Oakridge Beef Slabs',
                  tagline: 'Premium Slabs',
                  description: 'Extra-large vacuum sealed',
                  icon: Trophy,
                  bgClass: 'bg-gradient-to-br from-zinc-900 to-zinc-800',
                  accentClass: 'text-amber-500',
                  borderClass: 'hover:border-amber-500/50',
                  href: '/category/oakridge',
                },
              ].map((category, index) => {
                const Icon = category.icon
                return (
                  <Link
                    key={category.name}
                    href={category.href}
                    className={`group relative overflow-hidden rounded-xl border-2 border-transparent transition-all duration-500 ${category.borderClass} ${category.bgClass}`}
                  >
                    <div className="p-8 text-center relative z-10">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-5 transition-transform duration-300 group-hover:scale-110 ${category.accentClass}`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:scale-105 transition-transform duration-300">
                        {category.name}
                      </h3>
                      <p className={`text-sm font-semibold mb-2 ${category.accentClass}`}>
                        {category.tagline}
                      </p>
                      <p className="text-sm text-white/60">
                        {category.description}
                      </p>
                      <div className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${category.accentClass} opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0`}>
                        Shop Now
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Product Details Tabs */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Ingredients */}
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="font-serif text-xl font-bold mb-4">Ingredients</h3>
                    <ul className="space-y-2">
                      {product.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-center gap-2 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Nutrition Facts */}
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="font-serif text-xl font-bold mb-4">Nutrition Facts</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      Serving Size: {product.nutrition.servingSize}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between py-1 border-b">
                        <span>Calories</span>
                        <span className="font-medium">{product.nutrition.calories}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span>Protein</span>
                        <span className="font-bold text-primary">{product.nutrition.protein}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span>Fat</span>
                        <span className="font-medium">{product.nutrition.fat}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span>Carbs</span>
                        <span className="font-medium">{product.nutrition.carbs}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span>Sugar</span>
                        <span className="font-medium">{product.nutrition.sugar}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Sodium</span>
                        <span className="font-medium">{product.nutrition.sodium}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Product Details */}
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="font-serif text-xl font-bold mb-4">Product Info</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-muted-foreground">Weight</span>
                        <span className="font-medium">{product.weight}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-muted-foreground">Origin</span>
                        <span className="font-medium">{product.origin}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">Shelf Life</span>
                        <span className="font-medium">{product.shelfLife}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* You May Also Like - Upsell Section */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                You May Also Like
              </h2>
              <p className="text-muted-foreground mt-2">
                Customers who bought this also enjoyed these products
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/product/${relatedProduct.id}`}
                  className="group"
                >
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="relative aspect-square bg-muted/50 p-4">
                      {/* Badge */}
                      {relatedProduct.badges.length > 0 && (
                        <span className={`absolute top-3 left-3 z-10 inline-flex items-center gap-1 px-2 py-1 text-xs font-bold rounded-md ${badgeConfig[relatedProduct.badges[0]].className}`}>
                          {badgeConfig[relatedProduct.badges[0]].icon} {badgeConfig[relatedProduct.badges[0]].label}
                        </span>
                      )}
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-xl font-bold text-primary">
                        ${relatedProduct.price.toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Sticky Add to Cart (Mobile) */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t shadow-2xl lg:hidden z-40">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground line-clamp-1">{product.name}</p>
              <p className="text-xl font-bold text-primary">${(product.price * quantity).toFixed(2)}</p>
            </div>
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-muted transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-3 font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-muted transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button
              onClick={handleAddToCart}
              className={`gap-2 font-bold ${isAdded ? 'bg-green-600' : ''}`}
            >
              {isAdded ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
              {isAdded ? 'Added' : 'Add'}
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
      <CartSidebar />
    </div>
  )
}

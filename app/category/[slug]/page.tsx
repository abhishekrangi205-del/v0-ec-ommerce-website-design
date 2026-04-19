"use client"

import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ArrowLeft, ShoppingCart, Check, Flame, Beef, Trophy, Filter, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { products, categoryInfo, badgeConfig, type ProductCategory, type ProductDetails } from '@/lib/products'
import { useCart } from '@/components/cart-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const categoryIcons: Record<ProductCategory, typeof Flame> = {
  'carnivore-crave': Flame,
  'beef-jerky-slabs': Beef,
  'oakridge': Trophy,
}

const categoryColors: Record<ProductCategory, { accent: string; bg: string; border: string }> = {
  'carnivore-crave': { accent: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30' },
  'beef-jerky-slabs': { accent: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
  'oakridge': { accent: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
}

function ProductCard({ product }: { product: ProductDetails }) {
  const { addToCart } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
    })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <div className="group relative bg-card rounded-xl border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Badges */}
      {product.badges.length > 0 && (
        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
          {product.badges.slice(0, 2).map((badge) => (
            <span
              key={badge}
              className={`text-xs font-bold px-2 py-1 rounded-full ${badgeConfig[badge].className}`}
            >
              {badgeConfig[badge].label}
            </span>
          ))}
        </div>
      )}

      {/* Image */}
      <Link href={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[product.category].bg} ${categoryColors[product.category].accent}`}>
            {categoryInfo[product.category].name}
          </span>
        </div>

        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-foreground text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-foreground">${product.price.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground ml-1">CAD</span>
          </div>
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`transition-all duration-300 ${isAdded ? 'bg-green-600 hover:bg-green-600' : ''}`}
          >
            {isAdded ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const [isLoading, setIsLoading] = useState(true)
  const [categoryProducts, setCategoryProducts] = useState<ProductDetails[]>([])
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'name'>('default')
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  // Validate category
  const validCategories: ProductCategory[] = ['carnivore-crave', 'beef-jerky-slabs', 'oakridge']
  const isValidCategory = validCategories.includes(slug as ProductCategory)

  useEffect(() => {
    if (isValidCategory) {
      setIsLoading(true)
      // Simulate loading for smooth transition
      const timer = setTimeout(() => {
        const filtered = products.filter(p => p.category === slug)
        setCategoryProducts(filtered)
        setIsLoading(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [slug, isValidCategory])

  // Sort products
  const sortedProducts = [...categoryProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  if (!isValidCategory) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Category Not Found</h1>
            <p className="text-muted-foreground mb-8">The category you&apos;re looking for doesn&apos;t exist.</p>
            <Button asChild>
              <Link href="/#products">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Browse All Products
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const category = slug as ProductCategory
  const info = categoryInfo[category]
  const colors = categoryColors[category]
  const Icon = categoryIcons[category]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Banner */}
        <section className={`relative py-16 md:py-24 ${colors.bg} border-b`}>
          <div className="container mx-auto px-4">
            <Link 
              href="/#products" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All Products
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 rounded-xl ${colors.bg} ${colors.border} border-2 flex items-center justify-center`}>
                <Icon className={`h-8 w-8 ${colors.accent}`} />
              </div>
              <div>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                  {info.name}
                </h1>
                <p className={`text-lg font-semibold ${colors.accent}`}>
                  {info.tagline}
                </p>
              </div>
            </div>
            
            <p className="text-muted-foreground max-w-2xl text-lg">
              {category === 'carnivore-crave' && 'High-protein beef jerky bites with up to 45g protein per bag. Zero sugar, no fillers. Perfect for athletes and fitness enthusiasts.'}
              {category === 'beef-jerky-slabs' && 'Classic thick-cut beef jerky slabs made in Ontario. Traditional recipes with bold flavors in convenient 60g packs.'}
              {category === 'oakridge' && 'Our premium line of extra-large vacuum-sealed beef slabs. See exactly what you get with clear packaging and superior quality.'}
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-muted-foreground">
                {isLoading ? 'Loading...' : `${sortedProducts.length} product${sortedProducts.length !== 1 ? 's' : ''}`}
              </p>
              
              {/* Sort Dropdown */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Sort
                  <ChevronDown className={`h-4 w-4 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
                </Button>
                
                {showSortDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border rounded-lg shadow-lg z-20 overflow-hidden">
                    {[
                      { value: 'default', label: 'Default' },
                      { value: 'price-low', label: 'Price: Low to High' },
                      { value: 'price-high', label: 'Price: High to Low' },
                      { value: 'name', label: 'Name: A to Z' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value as typeof sortBy)
                          setShowSortDropdown(false)
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                          sortBy === option.value ? 'bg-muted font-semibold' : ''
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-card rounded-xl border overflow-hidden animate-pulse">
                    <div className="aspect-square bg-muted" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-muted rounded w-1/3" />
                      <div className="h-5 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="flex justify-between items-center">
                        <div className="h-6 bg-muted rounded w-1/4" />
                        <div className="h-9 bg-muted rounded w-20" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : sortedProducts.length === 0 ? (
              /* Empty State */
              <div className="text-center py-16">
                <div className={`w-20 h-20 mx-auto rounded-full ${colors.bg} flex items-center justify-center mb-6`}>
                  <Icon className={`h-10 w-10 ${colors.accent}`} />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">No Products Found</h2>
                <p className="text-muted-foreground mb-6">
                  There are currently no products in this category.
                </p>
                <Button asChild>
                  <Link href="/#products">Browse All Products</Link>
                </Button>
              </div>
            ) : (
              /* Products Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Other Categories */}
        <section className="py-12 md:py-16 bg-muted/30 border-t">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
              Explore Other Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {validCategories
                .filter((cat) => cat !== category)
                .map((cat) => {
                  const catInfo = categoryInfo[cat]
                  const catColors = categoryColors[cat]
                  const CatIcon = categoryIcons[cat]
                  return (
                    <Link
                      key={cat}
                      href={`/category/${cat}`}
                      className={`group flex items-center gap-4 p-6 bg-card rounded-xl border-2 border-transparent ${catColors.border} hover:border-current transition-all duration-300`}
                    >
                      <div className={`w-14 h-14 rounded-lg ${catColors.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
                        <CatIcon className={`h-7 w-7 ${catColors.accent}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                          {catInfo.name}
                        </h3>
                        <p className={`text-sm ${catColors.accent}`}>{catInfo.tagline}</p>
                      </div>
                    </Link>
                  )
                })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

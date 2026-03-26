"use client"

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ShoppingCart, Check, Minus, Plus, ChevronLeft, ChevronRight, Truck, Shield, Leaf, Star } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CartSidebar } from '@/components/cart-sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useCart } from '@/components/cart-context'
import { getProductById, getRelatedProducts, makingProcess, type ProductDetails } from '@/lib/products'

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  
  const [product, setProduct] = useState<ProductDetails | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<ProductDetails[]>([])
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const [activeProcessStep, setActiveProcessStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  
  const processRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = params.id as string
    const foundProduct = getProductById(id)
    if (foundProduct) {
      setProduct(foundProduct)
      setRelatedProducts(getRelatedProducts(id, 3))
      setSelectedImage(0)
      setQuantity(1)
    }
  }, [params.id])

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProcessStep((prev) => (prev + 1) % makingProcess.length)
    }, 4000)
    return () => clearInterval(interval)
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

  const nextImage = () => {
    if (product) {
      setSelectedImage((prev) => (prev + 1) % product.gallery.length)
    }
  }

  const prevImage = () => {
    if (product) {
      setSelectedImage((prev) => (prev - 1 + product.gallery.length) % product.gallery.length)
    }
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
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-card border">
                <Image
                  src={product.gallery[selectedImage].src}
                  alt={product.gallery[selectedImage].alt}
                  fill
                  className="object-contain p-6 transition-all duration-500"
                  priority
                />
                
                {/* Navigation Arrows */}
                {product.gallery.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm border shadow-lg hover:bg-background transition-all"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm border shadow-lg hover:bg-background transition-all"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="flex gap-3 justify-center">
                {product.gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index 
                        ? 'border-primary shadow-lg scale-105' 
                        : 'border-transparent hover:border-muted-foreground/30'
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                    {product.origin}
                  </span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    {product.weight}
                  </span>
                </div>
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
                <p className="text-2xl md:text-3xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {product.longDescription}
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 text-sm"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Check className="h-4 w-4 text-accent flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-muted transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-6 py-3 font-medium min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-muted transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className={`flex-1 gap-2 btn-glow text-lg py-6 transition-all duration-300 ${isAdded ? 'bg-accent' : ''}`}
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

        {/* Making Process Section */}
        <section ref={processRef} className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary font-medium text-sm tracking-wider uppercase">
                Our Craft
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
                How We Make Our Jerky
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From premium beef selection to final packaging, every step is handled with care
              </p>
            </div>

            {/* Process Slider */}
            <div className="max-w-5xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden bg-background border shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Image Side */}
                  <div className="relative aspect-[4/3] md:aspect-auto">
                    {makingProcess.map((step, index) => (
                      <div
                        key={step.step}
                        className={`absolute inset-0 transition-all duration-700 ${
                          activeProcessStep === index 
                            ? 'opacity-100 scale-100' 
                            : 'opacity-0 scale-105'
                        }`}
                      >
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
                      </div>
                    ))}
                  </div>

                  {/* Content Side */}
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl">
                          {makingProcess[activeProcessStep].step}
                        </span>
                        <div className="flex gap-1">
                          {makingProcess.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setActiveProcessStep(index)}
                              className={`h-2 rounded-full transition-all duration-300 ${
                                activeProcessStep === index 
                                  ? 'w-8 bg-primary' 
                                  : 'w-2 bg-muted hover:bg-muted-foreground/30'
                              }`}
                              aria-label={`Go to step ${index + 1}`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="min-h-[120px]">
                        <h3 className="font-serif text-2xl font-bold text-foreground mb-3 animate-fade-in">
                          {makingProcess[activeProcessStep].title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed animate-fade-in-up">
                          {makingProcess[activeProcessStep].description}
                        </p>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setActiveProcessStep((prev) => (prev - 1 + makingProcess.length) % makingProcess.length)}
                        >
                          <ChevronLeft className="h-4 w-4 mr-1" />
                          Previous
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => setActiveProcessStep((prev) => (prev + 1) % makingProcess.length)}
                        >
                          Next
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                        <span className="font-medium">{product.nutrition.protein}</span>
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

        {/* Related Products */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                You Might Also Like
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {relatedProducts.map((relatedProduct) => (
                <Link 
                  key={relatedProduct.id} 
                  href={`/product/${relatedProduct.id}`}
                  className="group"
                >
                  <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                    <div className="relative aspect-square bg-muted">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-primary font-bold">
                        ${relatedProduct.price.toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button asChild variant="outline" size="lg">
                <Link href="/#products">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to All Products
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CartSidebar />
    </div>
  )
}

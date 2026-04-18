"use client"

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { X, Plus, Minus, ShoppingBag, ShoppingCart } from 'lucide-react'
import { useCart } from './cart-context'
import { Button } from './ui/button'
import { products, badgeConfig } from '@/lib/products'

export function CartSidebar() {
  const { items, addToCart, removeFromCart, updateQuantity, totalPrice, isCartOpen, setIsCartOpen, clearCart } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  // Get upsell products - products not in cart, limit to 3
  const upsellProducts = useMemo(() => {
    const cartIds = items.map(item => item.id)
    return products
      .filter(p => !cartIds.includes(p.id))
      .slice(0, 3)
  }, [items])

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems: items }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const data = await response.json()

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to start checkout. Please try again.')
    } finally {
      setIsCheckingOut(false)
    }
  }

  if (!isCartOpen) return null

  const handleAddUpsell = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-foreground/50 z-50"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-serif text-xl font-semibold text-foreground flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Your Cart
            {items.length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                {items.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setIsCartOpen(false)}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-muted/50 rounded-lg"
                >
                  <div className="relative w-20 h-20 flex-shrink-0 bg-background rounded-md overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground text-sm line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-primary font-semibold mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto text-muted-foreground hover:text-destructive"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Upsell Section */}
              {items.length > 0 && upsellProducts.length > 0 && (
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    Customers Also Bought
                  </h4>
                  <div className="space-y-3">
                    {upsellProducts.map((product) => (
                      <div 
                        key={product.id} 
                        className="flex items-center gap-3 p-2 bg-background rounded-lg border border-border/50"
                      >
                        <div className="relative w-12 h-12 flex-shrink-0 bg-muted rounded overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground line-clamp-1">
                            {product.name}
                          </p>
                          <p className="text-sm font-bold text-primary">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-xs"
                          onClick={() => handleAddUpsell(product)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-4 space-y-4">
            {/* Free shipping progress */}
            {totalPrice < 50 && (
              <div className="text-center">
                <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${Math.min((totalPrice / 50) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Add <span className="font-semibold text-primary">${(50 - totalPrice).toFixed(2)}</span> more for free shipping!
                </p>
              </div>
            )}
            {totalPrice >= 50 && (
              <p className="text-center text-sm text-green-600 font-medium">
                You qualify for FREE shipping!
              </p>
            )}

            <div className="flex items-center justify-between text-lg">
              <span className="font-medium text-foreground">Subtotal</span>
              <span className="font-bold text-foreground">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <Button
              className="w-full btn-glow font-bold"
              size="lg"
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? 'Processing...' : 'Checkout'}
            </Button>
            <Button
              variant="ghost"
              className="w-full text-muted-foreground"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

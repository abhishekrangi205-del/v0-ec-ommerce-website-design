"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Lock, ShoppingBag } from 'lucide-react'
import { useCart } from '@/components/cart-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'Canada',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          items: items.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          subtotal: totalPrice,
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to submit order')
      }

      clearCart()
      router.push('/checkout/success')
    } catch (err) {
      console.error('[v0] Checkout submit error:', err)
      setError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-24">
          <div className="text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4 mx-auto" />
            <h1 className="font-serif text-2xl font-bold text-foreground mb-2">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground mb-6">
              Add some products before checking out.
            </p>
            <Link href="/#products">
              <Button className="btn-glow">Shop Now</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30 py-10 md:py-16">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">
            Checkout
          </h1>

          <form
            onSubmit={handleSubmit}
            className="grid lg:grid-cols-3 gap-8 items-start"
          >
            {/* Form fields */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="font-semibold text-lg text-foreground mb-4">
                  Contact Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" value={form.firstName} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" value={form.lastName} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required />
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="font-semibold text-lg text-foreground mb-4">
                  Shipping Address
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" name="address" value={form.address} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" value={form.city} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="province">Province / State</Label>
                    <Input id="province" name="province" value={form.province} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input id="postalCode" name="postalCode" value={form.postalCode} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" name="country" value={form.country} onChange={handleChange} required />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="h-4 w-4 text-primary" />
                  <h2 className="font-semibold text-lg text-foreground">
                    Card Details
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input id="cardName" name="cardName" value={form.cardName} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      inputMode="numeric"
                      placeholder="1234 5678 9012 3456"
                      value={form.cardNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardExpiry">Expiry (MM/YY)</Label>
                    <Input
                      id="cardExpiry"
                      name="cardExpiry"
                      placeholder="MM/YY"
                      value={form.cardExpiry}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardCvc">CVC</Label>
                    <Input
                      id="cardCvc"
                      name="cardCvc"
                      inputMode="numeric"
                      placeholder="123"
                      value={form.cardCvc}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:sticky lg:top-24">
              <div className="bg-card rounded-2xl p-6 border border-border space-y-4">
                <h2 className="font-semibold text-lg text-foreground">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-14 h-14 flex-shrink-0 bg-muted rounded-md overflow-hidden">
                        <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4 flex items-center justify-between text-lg">
                  <span className="font-medium text-foreground">Subtotal</span>
                  <span className="font-bold text-foreground">${totalPrice.toFixed(2)}</span>
                </div>

                {error && (
                  <p className="text-sm text-destructive" role="alert">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full btn-glow font-bold"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Your order details will be sent securely to our team for processing.
                </p>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}

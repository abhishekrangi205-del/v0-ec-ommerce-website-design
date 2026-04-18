import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Order Confirmed!
        </h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          We will send you an email confirmation shortly with your order details and shipping information.
        </p>
        <Link href="/">
          <Button className="w-full">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  )
}

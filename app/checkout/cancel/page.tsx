import { XCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function CheckoutCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <XCircle className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Checkout Cancelled
        </h1>
        <p className="text-muted-foreground mb-8">
          Your checkout was cancelled. Your items remain in your cart.
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          Feel free to continue shopping or try again when you are ready.
        </p>
        <Link href="/">
          <Button className="w-full">Back to Home</Button>
        </Link>
      </div>
    </div>
  )
}

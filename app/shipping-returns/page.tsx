import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CartSidebar } from '@/components/cart-sidebar'
import { Button } from '@/components/ui/button'
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  Clock,
  Package,
  AlertTriangle,
  CheckCircle,
  Mail,
  ArrowRight,
  CalendarClock,
  MapPin,
} from 'lucide-react'

export const metadata = {
  title: 'Shipping & Returns | Local Jerky Plus',
  description: 'Learn about our shipping times, return policy, and money-back guarantee at Local Jerky Plus.',
}

export default function ShippingReturnsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">

        {/* Hero Banner */}
        <section className="bg-foreground py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
              Customer Care
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-background mb-4 text-balance">
              Shipping & Returns
            </h1>
            <p className="text-background/70 text-lg max-w-2xl mx-auto">
              We want you to love every bite. Here&apos;s everything you need to know about getting your order and our hassle-free return policy.
            </p>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="bg-primary py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'On orders over $50' },
                { icon: Clock, label: '1–2 Business Days', sub: 'Order processing' },
                { icon: CalendarClock, label: '2–7 Business Days', sub: 'Estimated delivery' },
                { icon: ShieldCheck, label: '14-Day Guarantee', sub: 'Money-back promise' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-2">
                  <stat.icon className="h-6 w-6 text-primary-foreground/80" />
                  <p className="font-bold text-primary-foreground text-sm md:text-base">{stat.label}</p>
                  <p className="text-primary-foreground/70 text-xs">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Shipping Information */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary flex-shrink-0">
                  <Truck className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Shipping Information</h2>
                  <p className="text-muted-foreground text-sm mt-0.5">Everything about getting your jerky to your door</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Processing Time */}
                <div className="bg-muted rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Package className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground text-lg">Order Processing</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    All orders are processed within <strong className="text-foreground">1–2 business days</strong> after payment is confirmed. You will receive a confirmation email once your order is on its way.
                  </p>
                </div>

                {/* Delivery Time */}
                <div className="bg-muted rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CalendarClock className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground text-lg">Estimated Delivery</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Delivery typically takes <strong className="text-foreground">2–7 business days</strong> depending on your location across Canada. Remote areas may require additional transit time.
                  </p>
                </div>

                {/* Tracking */}
                <div className="bg-muted rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground text-lg">Order Tracking</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Once shipped, you will receive a tracking number via email so you can follow your package every step of the way.
                  </p>
                </div>

                {/* Delays */}
                <div className="bg-muted rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground text-lg">Possible Delays</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    During peak seasons, public holidays, or severe weather events, shipping times may be longer than usual. We appreciate your patience and will keep you updated.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Returns & Money-Back Guarantee */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary flex-shrink-0">
                  <RotateCcw className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">Returns & Money-Back Guarantee</h2>
                  <p className="text-muted-foreground text-sm mt-0.5">Your satisfaction is our priority</p>
                </div>
              </div>

              {/* Guarantee Banner */}
              <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 md:p-8 mb-8 flex flex-col md:flex-row items-start md:items-center gap-4">
                <ShieldCheck className="h-12 w-12 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-foreground text-xl mb-1">14-Day Money-Back Guarantee</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Not satisfied with your order? We stand behind our product 100%. Request a full refund within <strong className="text-foreground">14 days</strong> of receiving your order — no questions asked.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* How It Works */}
                <div className="bg-muted rounded-2xl p-6">
                  <h3 className="font-semibold text-foreground text-lg mb-4">How to Request a Refund</h3>
                  <ul className="space-y-3">
                    {[
                      'Contact us at localjerkyplus@gmail.com within 14 days of delivery',
                      'Include your order number and a brief reason for your request',
                      'Attach a photo if your order arrived damaged or incorrect (optional but helpful)',
                      'No physical return is required due to food safety regulations',
                      'Refunds are processed within 5–10 business days back to your original payment method',
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-sm leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Damaged / Incorrect Orders */}
                <div className="bg-muted rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground text-lg">Damaged or Incorrect Orders</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    If your order arrives damaged, defective, or contains the wrong items, please report it within <strong className="text-foreground">48 hours</strong> of delivery.
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Email us with your order number and a photo of the issue. We will send a replacement or issue a full refund at no extra cost to you.
                  </p>
                  <div className="mt-4 p-3 bg-primary/10 rounded-xl">
                    <p className="text-xs text-muted-foreground">
                      <strong className="text-foreground">Report window:</strong> Within 48 hours of delivery
                    </p>
                  </div>
                </div>

                {/* Refund Timeline */}
                <div className="bg-muted rounded-2xl p-6">
                  <h3 className="font-semibold text-foreground text-lg mb-4">Refund Processing Time</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Request received', time: 'Same business day' },
                      { label: 'Review & approval', time: '1–2 business days' },
                      { label: 'Refund issued', time: '5–10 business days' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                        <span className="text-sm font-semibold text-foreground">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Eligibility */}
                <div className="bg-muted rounded-2xl p-6">
                  <h3 className="font-semibold text-foreground text-lg mb-4">Eligibility</h3>
                  <ul className="space-y-3">
                    {[
                      'Request submitted within 14 days of delivery',
                      'Order placed directly through localjerkyplus.com',
                      'Valid order number provided',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Support CTA */}
        <section className="py-16 md:py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">
                Still Have Questions?
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our team is happy to help. Reach out to us directly and we will get back to you as soon as possible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="btn-glow">
                  <a href="mailto:localjerkyplus@gmail.com">
                    Contact Support
                    <Mail className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/#products">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <CartSidebar />
    </div>
  )
}

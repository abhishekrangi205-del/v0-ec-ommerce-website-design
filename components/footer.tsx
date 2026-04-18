import Link from 'next/link'
import { Leaf, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-primary" />
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold text-background tracking-tight">
                  Local Jerky
                </span>
                <span className="text-[10px] text-primary font-semibold -mt-1 tracking-wider">
                  PLUS
                </span>
              </div>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed">
              Premium beef jerky handcrafted in Canada with all-natural ingredients. No fillers, no sugar, just pure flavor.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-background mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#products" className="text-background/70 hover:text-background text-sm transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="#reviews" className="text-background/70 hover:text-background text-sm transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-background/70 hover:text-background text-sm transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-background mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-background/70 hover:text-background text-sm transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/70 hover:text-background text-sm transition-colors">
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/70 hover:text-background text-sm transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-background mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-background/70 text-sm">
                <Mail className="h-4 w-4 flex-shrink-0" />
                localjerkyplus@gmail.com
              </li>
              <li className="flex items-center gap-2 text-background/70 text-sm">
                <Phone className="h-4 w-4 flex-shrink-0" />
                (705) 562-0397
              </li>
              <li className="flex items-center gap-2 text-background/70 text-sm">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                170 Fielding Rd, Lively, ON P3Y 1L5
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center">
          <p className="text-background/60 text-sm">
            &copy; {new Date().getFullYear()} Local Jerky Plus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

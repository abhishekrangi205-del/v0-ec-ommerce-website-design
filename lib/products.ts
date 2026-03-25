import type { Product } from '@/components/cart-context'

export const products: Product[] = [
  {
    id: '1',
    name: 'Beef Jerky - Cracked Pepper & Garlic',
    description: 'Premium quality beef jerky with bold cracked pepper and garlic flavor. All beef, no fillers, 0g sugar. Made in Canada.',
    price: 12.99,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Product%201-KOLmvznXmkurBzJutf19f9CpWunp1n.png',
  },
  {
    id: '2',
    name: 'Beef Jerky Slabs - Cracked Pepper & Garlic',
    description: 'Hearty beef jerky slabs with cracked pepper and garlic seasoning. Ontario approved, 60g pack.',
    price: 14.99,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Product%202-GkFI0meTAupFp3XAJ4rM0ub3HNGFbQ.png',
  },
  {
    id: '3',
    name: 'Beef Jerky - Teriyaki',
    description: 'Sweet and savory teriyaki glazed beef jerky. Made with premium Canadian beef and authentic teriyaki sauce.',
    price: 12.99,
    image: '/images/product-teriyaki.jpg',
  },
  {
    id: '4',
    name: 'Beef Jerky - Spicy Chipotle',
    description: 'Bold and smoky chipotle flavored beef jerky with a kick of heat. Perfect for spice lovers.',
    price: 13.99,
    image: '/images/product-spicy.jpg',
  },
  {
    id: '5',
    name: 'Beef Jerky - Original',
    description: 'Classic original beef jerky with traditional seasoning. Simple, authentic, and delicious.',
    price: 11.99,
    image: '/images/product-original.jpg',
  },
  {
    id: '6',
    name: 'Beef Jerky - Smokehouse Hickory',
    description: 'Slow-smoked hickory beef jerky with rich, deep flavor. A true Canadian wilderness experience.',
    price: 13.99,
    image: '/images/product-smokehouse.jpg',
  },
]

export const featuredProducts = products.slice(0, 6)

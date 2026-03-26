export interface ProductImage {
  src: string
  alt: string
}

export interface NutritionInfo {
  servingSize: string
  calories: number
  protein: string
  fat: string
  carbs: string
  sodium: string
  sugar: string
}

export interface ProductDetails {
  id: string
  name: string
  description: string
  longDescription: string
  price: number
  image: string
  gallery: ProductImage[]
  features: string[]
  ingredients: string[]
  nutrition: NutritionInfo
  weight: string
  origin: string
  shelfLife: string
}

export const makingProcess = [
  {
    step: 1,
    title: 'Premium Selection',
    description: 'We hand-select only the finest cuts of Canadian beef, ensuring every piece meets our strict quality standards.',
    image: '/images/process-1.jpg',
  },
  {
    step: 2,
    title: 'Artisan Marinade',
    description: 'Each batch is carefully marinated with our signature blend of spices, garlic, and cracked pepper for 24-48 hours.',
    image: '/images/process-2.jpg',
  },
  {
    step: 3,
    title: 'Slow Smoking',
    description: 'Traditional hickory smoking techniques bring out deep, rich flavors while preserving the meat naturally.',
    image: '/images/process-3.jpg',
  },
  {
    step: 4,
    title: 'Quality Control',
    description: 'Every piece is inspected by our team to ensure consistent texture, flavor, and food safety standards.',
    image: '/images/process-4.jpg',
  },
  {
    step: 5,
    title: 'Fresh Packaging',
    description: 'Sealed in premium resealable pouches to lock in freshness and flavor for your enjoyment.',
    image: '/images/process-5.jpg',
  },
]

export const products: ProductDetails[] = [
  {
    id: '1',
    name: 'Beef Jerky - Cracked Pepper & Garlic',
    description: 'Premium quality beef jerky with bold cracked pepper and garlic flavor. All beef, no fillers, 0g sugar. Made in Canada.',
    longDescription: 'Our signature Cracked Pepper & Garlic beef jerky is a testament to traditional Canadian craftsmanship. Made from 100% premium beef with absolutely no fillers, this jerky delivers an authentic, bold flavor that jerky enthusiasts crave. The perfect balance of freshly cracked black pepper and aromatic garlic creates a savory taste experience that keeps you coming back for more. Each piece is slow-dried to perfection, resulting in a tender yet satisfying texture that melts in your mouth.',
    price: 12.99,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Product%201-KOLmvznXmkurBzJutf19f9CpWunp1n.png',
    gallery: [
      { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Product%201-KOLmvznXmkurBzJutf19f9CpWunp1n.png', alt: 'Beef Jerky Package Front' },
      { src: '/images/jerky-detail-1.jpg', alt: 'Jerky Texture Close-up' },
      { src: '/images/jerky-detail-2.jpg', alt: 'Jerky on Wooden Board' },
    ],
    features: [
      'All Natural Ingredients',
      'Zero Sugar Added',
      'No Artificial Preservatives',
      'High Protein Snack',
      'Gluten Free',
      'Made in Canada',
    ],
    ingredients: ['Beef', 'Water', 'Salt', 'Black Pepper', 'Garlic', 'Natural Spices'],
    nutrition: {
      servingSize: '30g',
      calories: 80,
      protein: '15g',
      fat: '1.5g',
      carbs: '2g',
      sodium: '450mg',
      sugar: '0g',
    },
    weight: '60g',
    origin: 'Ontario, Canada',
    shelfLife: '12 months',
  },
  {
    id: '2',
    name: 'Beef Jerky Slabs - Cracked Pepper & Garlic',
    description: 'Hearty beef jerky slabs with cracked pepper and garlic seasoning. Ontario approved, 60g pack.',
    longDescription: 'For those who prefer a more substantial jerky experience, our Beef Jerky Slabs deliver thick, hearty pieces of premium Canadian beef. These generously-sized slabs are perfect for tearing and sharing, or enjoying a satisfying snack on your own. The same beloved Cracked Pepper & Garlic flavor you love, now in a format that lets you truly savor every bite. Each slab is hand-cut and slowly dried to achieve the perfect balance of tenderness and chew.',
    price: 14.99,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Product%202-GkFI0meTAupFp3XAJ4rM0ub3HNGFbQ.png',
    gallery: [
      { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Product%202-GkFI0meTAupFp3XAJ4rM0ub3HNGFbQ.png', alt: 'Beef Jerky Slabs Package' },
      { src: '/images/jerky-detail-1.jpg', alt: 'Slab Texture Close-up' },
      { src: '/images/jerky-detail-2.jpg', alt: 'Slabs on Wooden Board' },
    ],
    features: [
      'Thick Cut Slabs',
      'Perfect for Sharing',
      'Zero Sugar Added',
      'Ontario Approved',
      'High Protein',
      'No Fillers',
    ],
    ingredients: ['Beef', 'Water', 'Salt', 'Black Pepper', 'Garlic', 'Natural Spices'],
    nutrition: {
      servingSize: '30g',
      calories: 85,
      protein: '16g',
      fat: '1.5g',
      carbs: '2g',
      sodium: '460mg',
      sugar: '0g',
    },
    weight: '60g',
    origin: 'Ontario, Canada',
    shelfLife: '12 months',
  },
  {
    id: '3',
    name: 'Beef Jerky - Teriyaki',
    description: 'Sweet and savory teriyaki glazed beef jerky. Made with premium Canadian beef and authentic teriyaki sauce.',
    longDescription: 'Experience the perfect fusion of East meets West with our Teriyaki Beef Jerky. We blend traditional Japanese teriyaki flavors with premium Canadian beef to create a sweet and savory masterpiece. The authentic teriyaki glaze caramelizes beautifully during the drying process, creating a slightly glossy finish and an irresistible umami taste. This flavor profile appeals to those who enjoy a sweeter jerky with depth and complexity.',
    price: 12.99,
    image: '/images/product-teriyaki.jpg',
    gallery: [
      { src: '/images/product-teriyaki.jpg', alt: 'Teriyaki Beef Jerky Package' },
      { src: '/images/jerky-detail-1.jpg', alt: 'Teriyaki Texture Close-up' },
      { src: '/images/jerky-detail-2.jpg', alt: 'Teriyaki on Display' },
    ],
    features: [
      'Authentic Teriyaki Glaze',
      'Sweet & Savory Balance',
      'No Artificial Colors',
      'High Protein Snack',
      'Gluten Free Soy Sauce',
      'Made in Canada',
    ],
    ingredients: ['Beef', 'Soy Sauce', 'Brown Sugar', 'Ginger', 'Garlic', 'Sesame'],
    nutrition: {
      servingSize: '30g',
      calories: 90,
      protein: '14g',
      fat: '1.5g',
      carbs: '5g',
      sodium: '480mg',
      sugar: '4g',
    },
    weight: '60g',
    origin: 'Ontario, Canada',
    shelfLife: '12 months',
  },
  {
    id: '4',
    name: 'Beef Jerky - Spicy Chipotle',
    description: 'Bold and smoky chipotle flavored beef jerky with a kick of heat. Perfect for spice lovers.',
    longDescription: 'Heat seekers rejoice! Our Spicy Chipotle Beef Jerky brings the fire with authentic chipotle peppers that deliver both smokiness and heat. This isn\'t just about spice—it\'s about flavor depth. The chipotle peppers are slowly smoked before being ground into our special seasoning blend, creating layers of complexity that build with each bite. The heat is substantial but not overwhelming, making it perfect for those who appreciate bold flavors.',
    price: 13.99,
    image: '/images/product-spicy.jpg',
    gallery: [
      { src: '/images/product-spicy.jpg', alt: 'Spicy Chipotle Package' },
      { src: '/images/jerky-detail-1.jpg', alt: 'Chipotle Texture Close-up' },
      { src: '/images/jerky-detail-2.jpg', alt: 'Spicy Jerky Display' },
    ],
    features: [
      'Real Chipotle Peppers',
      'Medium-Hot Heat Level',
      'Smoky Flavor Profile',
      'High Protein',
      'No Artificial Heat',
      'Made in Canada',
    ],
    ingredients: ['Beef', 'Chipotle Peppers', 'Paprika', 'Cayenne', 'Garlic', 'Natural Smoke'],
    nutrition: {
      servingSize: '30g',
      calories: 82,
      protein: '15g',
      fat: '1.5g',
      carbs: '3g',
      sodium: '470mg',
      sugar: '1g',
    },
    weight: '60g',
    origin: 'Ontario, Canada',
    shelfLife: '12 months',
  },
  {
    id: '5',
    name: 'Beef Jerky - Original',
    description: 'Classic original beef jerky with traditional seasoning. Simple, authentic, and delicious.',
    longDescription: 'Sometimes the classics are classic for a reason. Our Original Beef Jerky pays homage to traditional jerky recipes passed down through generations of Canadian meat crafters. With a simple yet perfectly balanced seasoning blend, the natural beef flavor takes center stage. This is jerky in its purest form—no frills, no gimmicks, just exceptional quality beef prepared with time-honored techniques that let the meat speak for itself.',
    price: 11.99,
    image: '/images/product-original.jpg',
    gallery: [
      { src: '/images/product-original.jpg', alt: 'Original Beef Jerky Package' },
      { src: '/images/jerky-detail-1.jpg', alt: 'Original Texture Close-up' },
      { src: '/images/jerky-detail-2.jpg', alt: 'Classic Jerky Display' },
    ],
    features: [
      'Classic Recipe',
      'Natural Beef Flavor',
      'Zero Sugar Added',
      'Minimal Ingredients',
      'Family Favorite',
      'Made in Canada',
    ],
    ingredients: ['Beef', 'Water', 'Salt', 'Black Pepper', 'Natural Spices'],
    nutrition: {
      servingSize: '30g',
      calories: 78,
      protein: '15g',
      fat: '1g',
      carbs: '1g',
      sodium: '420mg',
      sugar: '0g',
    },
    weight: '60g',
    origin: 'Ontario, Canada',
    shelfLife: '12 months',
  },
  {
    id: '6',
    name: 'Beef Jerky - Smokehouse Hickory',
    description: 'Slow-smoked hickory beef jerky with rich, deep flavor. A true Canadian wilderness experience.',
    longDescription: 'Immerse yourself in the Canadian wilderness with our Smokehouse Hickory Beef Jerky. We use real hickory wood chips to slow-smoke each batch for hours, infusing the premium beef with deep, aromatic smokiness that transports you to a campfire in the great outdoors. The extended smoking process creates a jerky with unparalleled depth of flavor and a satisfying texture that serious jerky connoisseurs appreciate.',
    price: 13.99,
    image: '/images/product-smokehouse.jpg',
    gallery: [
      { src: '/images/product-smokehouse.jpg', alt: 'Smokehouse Hickory Package' },
      { src: '/images/jerky-detail-1.jpg', alt: 'Smokehouse Texture Close-up' },
      { src: '/images/jerky-detail-2.jpg', alt: 'Hickory Jerky Display' },
    ],
    features: [
      'Real Hickory Smoked',
      'Extended Smoking Time',
      'Rich Smoky Flavor',
      'Campfire Inspired',
      'High Protein',
      'Made in Canada',
    ],
    ingredients: ['Beef', 'Water', 'Salt', 'Hickory Smoke', 'Brown Sugar', 'Natural Spices'],
    nutrition: {
      servingSize: '30g',
      calories: 84,
      protein: '15g',
      fat: '1.5g',
      carbs: '2g',
      sodium: '455mg',
      sugar: '1g',
    },
    weight: '60g',
    origin: 'Ontario, Canada',
    shelfLife: '12 months',
  },
]

export const featuredProducts = products.slice(0, 6)

export function getProductById(id: string): ProductDetails | undefined {
  return products.find(p => p.id === id)
}

export function getRelatedProducts(currentId: string, limit: number = 3): ProductDetails[] {
  return products.filter(p => p.id !== currentId).slice(0, limit)
}

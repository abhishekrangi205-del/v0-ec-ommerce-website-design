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

export type ProductBadge = 'best-seller' | 'high-protein' | 'premium' | 'spicy' | 'smoky' | 'popular' | 'limited-stock'
export type ProductCategory = 'carnivore-crave' | 'beef-jerky-slabs' | 'oakridge'

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
  category: ProductCategory
  badges: ProductBadge[]
  benefits: string[]
}

export const categoryInfo: Record<ProductCategory, { name: string; tagline: string; color: string }> = {
  'carnivore-crave': {
    name: 'Carnivore Crave',
    tagline: 'High Protein Snacks',
    color: 'red',
  },
  'beef-jerky-slabs': {
    name: 'Beef Jerky Slabs',
    tagline: 'Classic Jerky Cuts',
    color: 'orange',
  },
  'oakridge': {
    name: 'Oakridge Beef Slabs',
    tagline: 'Premium Slabs',
    color: 'gold',
  },
}

export const badgeConfig: Record<ProductBadge, { label: string; icon: string; className: string }> = {
  'best-seller': { label: 'Best Seller', icon: '🔥', className: 'bg-red-500 text-white' },
  'high-protein': { label: '45g Protein', icon: '💪', className: 'bg-amber-500 text-white' },
  'premium': { label: 'Premium Cut', icon: '🏆', className: 'bg-amber-600 text-white' },
  'spicy': { label: 'Spicy', icon: '🌶️', className: 'bg-red-600 text-white' },
  'smoky': { label: 'Smoky', icon: '🔥', className: 'bg-stone-700 text-white' },
  'popular': { label: 'Popular Choice', icon: '⭐', className: 'bg-primary text-primary-foreground' },
  'limited-stock': { label: 'Limited Stock', icon: '⚡', className: 'bg-orange-500 text-white' },
}

export const makingProcess = [
  {
    step: 1,
    title: 'Premium Selection',
    description: 'We hand-select only the finest cuts of beef, ensuring every piece meets our strict quality standards.',
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
  // Carnivore Crave (45g Protein)
  {
    id: 'cc-traditional',
    name: 'Carnivore Crave Traditional',
    description: 'High protein beef jerky bites with classic traditional flavor. 45g protein, 0g sugar.',
    longDescription: 'Fuel your day with our Carnivore Crave Traditional beef jerky bites. Packed with an incredible 45g of protein per bag and zero sugar, these bite-sized pieces are perfect for athletes, gym-goers, and anyone seeking a powerful protein snack. The traditional recipe delivers authentic beef flavor without any unnecessary additives.',
    price: 1.00,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Carnivore%20Crave%20Traditional-RPNRMJoGpc6iqp5WRedTXvq2N7sEZP.png',
    gallery: [
      { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Carnivore%20Crave%20Traditional-RPNRMJoGpc6iqp5WRedTXvq2N7sEZP.png', alt: 'Carnivore Crave Traditional Package' },
      { src: '/images/jerky-detail-1.jpg', alt: 'Jerky Texture Close-up' },
      { src: '/images/jerky-detail-2.jpg', alt: 'Jerky on Wooden Board' },
    ],
    features: ['45g Protein Per Bag', 'Zero Sugar', 'No Fillers', 'High Protein', 'Perfect for Gym', 'Travel Friendly'],
    ingredients: ['Beef', 'Water', 'Salt', 'Natural Spices', 'Garlic Powder'],
    nutrition: { servingSize: '80g', calories: 280, protein: '45g', fat: '8g', carbs: '4g', sodium: '980mg', sugar: '0g' },
    weight: '80g',
    origin: 'Ontario, Canada',
    shelfLife: '12 months',
    category: 'carnivore-crave',
    badges: ['high-protein', 'best-seller'],
    benefits: ['Massive 45g protein per bag', 'Zero sugar formula', 'Perfect pre/post workout snack', 'No artificial preservatives'],
  },
  {
    id: 'cc-pepper-garlic',
    name: 'Carnivore Crave Pepper & Garlic',
    description: 'Bold cracked pepper and garlic flavor. 45g protein, 0g sugar per bag.',
    longDescription: 'Experience bold flavor without compromise. Our Carnivore Crave Pepper & Garlic delivers the perfect balance of freshly cracked black pepper and aromatic garlic, all while packing 45g of protein and zero sugar. Ideal for fitness enthusiasts who refuse to sacrifice taste for nutrition.',
    price: 14.00,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Carnivore%20Crave%20Pepper%20%26%20Garlic-uDhGaa98tfXizi1vKh9afkVbjMBe3y.png',
    gallery: [
      { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Carnivore%20Crave%20Pepper%20%26%20Garlic-uDhGaa98tfXizi1vKh9afkVbjMBe3y.png', alt: 'Carnivore Crave Pepper & Garlic Package' },
      { src: '/images/jerky-detail-1.jpg', alt: 'Jerky Texture Close-up' },
      { src: '/images/jerky-detail-2.jpg', alt: 'Jerky on Wooden Board' },
    ],
    features: ['45g Protein Per Bag', 'Zero Sugar', 'Bold Flavor', 'High Protein', 'Gym Ready', 'No Fillers'],
    ingredients: ['Beef', 'Water', 'Salt', 'Black Pepper', 'Garlic', 'Natural Spices'],
    nutrition: { servingSize: '80g', calories: 285, protein: '45g', fat: '8g', carbs: '4g', sodium: '990mg', sugar: '0g' },
    weight: '80g',
    origin: 'Ontario, Canada',
    shelfLife: '12 months',
    category: 'carnivore-crave',
    badges: ['high-protein', 'popular'],
    benefits: ['45g protein powerhouse', 'Bold pepper & garlic taste', 'Zero sugar, zero guilt', 'Perfect for active lifestyles'],
  },
  {
    id: 'cc-teriyaki',
    name: 'Carnivore Crave Teriyaki',
    description: 'Sweet and savory teriyaki with 45g protein. Perfect blend of flavor and nutrition.',
    longDescription: 'Who says high protein has to be boring? Our Carnivore Crave Teriyaki brings the beloved sweet and savory teriyaki flavor to your protein routine. With 45g of protein and 0g sugar, this is the perfect guilt-free indulgence for those who want flavor without compromise.',
    price: 14.00,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Carnivore%20Crave%20Teriyaki-rjCaebFKuviKYTvcLKW9pv8GZGi536.png',
    gallery: [
      { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Carnivore%20Crave%20Teriyaki-rjCaebFKuviKYTvcLKW9pv8GZGi536.png', alt: 'Carnivore Crave Teriyaki Package' },
      { src: '/images/jerky-detail-1.jpg', alt: 'Jerky Texture Close-up' },
      { src: '/images/jerky-detail-2.jpg', alt: 'Jerky on Wooden Board' },
    ],
    features: ['45g Protein Per Bag', 'Zero Sugar', 'Sweet & Savory', 'No Artificial Flavors', 'Gym Approved', 'Travel Snack'],
    ingredients: ['Beef', 'Soy Sauce', 'Natural Sweetener', 'Ginger', 'Garlic', 'Sesame'],
    nutrition: { servingSize: '80g', calories: 290, protein: '45g', fat: '7g', carbs: '6g', sodium: '1020mg', sugar: '0g' },
    weight: '80g',
    origin: 'Ontario, Canada',
    shelfLife: '12 months',
    category: 'carnivore-crave',
    badges: ['high-protein'],
    benefits: ['45g protein per bag', 'Authentic teriyaki taste', 'Zero sugar formula', 'Great for meal prep'],
  },

  // Beef Jerky Slabs
  {
    id: 'bjs-pepper-garlic',
    name: 'Beef Jerky Slabs - Pepper & Garlic',
    description: 'Classic beef jerky slabs with cracked pepper and garlic. Ontario made, 60g pack.',

    price: 13.40,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Beef%20Jerky%20Pepper%20%26%20Garlic-Zwc1rHWq0xVhEUaaSwTI77T52UdLH6.png',
    gallery: [
      { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Beef%20Jerky%20Pepper%20%26%20Garlic-Zwc1rHWq0xVhEUaaSwTI77T52UdLH6.png', alt: 'Beef Jerky Slabs Pepper & Garlic Package' },
      { src: '/images/jerky-detail-1.jpg', alt: 'Slab Texture Close-up' },
      { src: '/images/jerky-detail-2.jpg', alt: 'Slabs on Wooden Board' },
    ],
    features: ['Thick Cut Slabs', 'Ontario Made', 'Zero Sugar', 'High Protein', 'No Fillers', 'Ontario Approved'],
    ingredients: ['Beef', 'Water', 'Salt', 'Black Pepper', 'Garlic', 'Natural Spices'],
    nutrition: { servingSize: '30g', calories: 85, protein: '16g', fat: '1.5g', carbs: '2g', sodium: '460mg', sugar: '0g' },
    weight: '60g',
    origin: 'Ontario, Canada',
    shelfLife: '12 months',
    category: 'beef-jerky-slabs',
    badges: ['best-seller'],
    benefits: ['Premium thick-cut slabs', 'Bold pepper & garlic flavor', 'High protein content', 'Perfect for sharing'],
  },
  {
    id: 'bjs-traditional',
    name: 'Beef Jerky Slabs - Traditional',
    description: 'Classic traditional beef jerky slabs. Simple, authentic Canadian taste.',
    longDescription: 'Sometimes the classics are classic for a reason. Our Traditional Beef Jerky Slabs honor time-tested recipes with simple, authentic seasoning. The natural beef flavor takes center stage in these thick-cut slabs that deliver a satisfying chew and genuine taste.',
    price: 13.40,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Beef%20Jerky%20Traditional-ELaq432zjLQQTw1yLIvl6yuNuQmzwG.png',
    gallery: [
      { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Beef%20Jerky%20Traditional-ELaq432zjLQQTw1yLIvl6yuNuQmzwG.png', alt: 'Beef Jerky Slabs Traditional Package' },
      { src: '/images/jerky-detail-1.jpg', alt: 'Traditional Texture Close-up' },
      { src: '/images/jerky-detail-2.jpg', alt: 'Traditional on Display' },
    ],
    features: ['Classic Recipe', 'Thick Cut Slabs', 'Natural Beef Flavor', 'Ontario Made', 'No Fillers', 'High Protein'],
    ingredients: ['Beef', 'Water', 'Salt', 'Natural Spices'],
    nutrition: { servingSize: '30g', calories: 82, protein: '16g', fat: '1g', carbs: '1g', sodium: '440mg', sugar: '0g' },
    weight: '60g',
    origin: 'Ontario, Canada',
    shelfLife: '12 months',
    category: 'beef-jerky-slabs',
    badges: ['popular'],
    benefits: ['Authentic traditional flavor', 'Thick hearty slabs', 'Minimal ingredients', 'Perfect snacking size'],
  },
  {
    id: 'bjs-hickory',
    name: 'Beef Jerky Slabs - Hickory',
    description: 'Slow-smoked hickory pork jerky slabs with rich, deep smoky flavor.',
    longDescription: 'Experience the Canadian wilderness with our Hickory Pork Jerky Slabs. Real hickory wood chips infuse each batch with deep, aromatic smokiness. The extended smoking process creates slabs with unparalleled depth of flavor and satisfying texture.',
    price: 13.40,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Beef%20Jerky%20Hickory-f4uK2JDvz3fRhFbZifVqB8UPQUrfKY.png',
    gallery: [
      { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Beef%20Jerky%20Hickory-f4uK2JDvz3fRhFbZifVqB8UPQUrfKY.png', alt: 'Beef Jerky Slabs Hickory Package' },
      { src: '/images/jerky-detail-1.jpg', alt: 'Hickory Texture Close-up' },
      { src: '/images/jerky-detail-2.jpg', alt: 'Hickory Jerky Display' },
    ],
    features: ['Real Hickory Smoked', 'Thick Cut Slabs', 'Rich Smoky Flavor', 'Ontario Made', 'High Protein', 'No Fillers'],
    ingredients: ['Pork', 'Water', 'Salt', 'Hickory Smoke', 'Natural Spices'],
    nutrition: { servingSize: '30g', calories: 88, protein: '15g', fat: '2g', carbs: '2g', sodium: '470mg', sugar: '0g' },
    weight: '80g',
    origin: 'Ontario, Canada',
    shelfLife: '12 months',
    category: 'beef-jerky-slabs',
    badges: ['smoky'],
    benefits: ['Authentic hickory smoke', 'Premium pork slabs', 'Deep smoky aroma', 'Campfire inspired'],
  },
  {
    id: 'bjs-firehouse5',
    name: 'Beef Jerky Slabs - Firehouse 5',
    description: 'Fiery hot beef jerky slabs for those who love serious heat. Bring the fire!',
    longDescription: 'Heat seekers, this one is for you! Our Firehouse 5 Beef Jerky Slabs bring intense, building heat that will satisfy even the most dedicated spice lovers. Multiple pepper varieties create layers of heat that develop with each bite. Not for the faint of heart!',
    price: 13.40,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Beef%20Jerky%20Firehouse%205-F1Sw9t8s0xg3BxCfs4dL1V9oe7Ac3r.png',
    gallery: [
      { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Beef%20Jerky%20Firehouse%205-F1Sw9t8s0xg3BxCfs4dL1V9oe7Ac3r.png', alt: 'Beef Jerky Slabs Firehouse 5 Package' },
      { src: '/images/jerky-detail-1.jpg', alt: 'Firehouse Texture Close-up' },
      { src: '/images/jerky-detail-2.jpg', alt: 'Spicy Jerky Display' },
    ],
    features: ['Extreme Heat', 'Multiple Pepper Blend', 'Thick Cut Slabs', 'Ontario Made', 'High Protein', 'Challenge Accepted'],
    ingredients: ['Beef', 'Water', 'Cayenne', 'Habanero', 'Ghost Pepper', 'Salt', 'Natural Spices'],
    nutrition: { servingSize: '30g', calories: 84, protein: '16g', fat: '1.5g', carbs: '2g', sodium: '480mg', sugar: '0g' },
    weight: '60g',
    origin: 'Ontario, Canada',
    shelfLife: '12 months',
    category: 'beef-jerky-slabs',
    badges: ['spicy', 'limited-stock'],
    benefits: ['Intense multi-pepper heat', 'For serious spice lovers', 'High protein kick', 'Bold flavor challenge'],
  },
  {
    id: 'bjs-cajun',
    name: 'Beef Jerky Slabs - Cajun',
    description: 'Zesty Cajun seasoned beef jerky slabs with authentic Southern heat.',
    longDescription: 'Bring the taste of Louisiana to your snacking with our Cajun Beef Jerky Slabs. A proprietary blend of Cajun spices delivers zesty heat with notes of paprika, cayenne, and garlic. These thick-cut slabs offer bold Southern flavor in every bite.',
    price: 13.40,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Beef%20Jerky%20Cajun-2IXklbUCFB96aosh9KWfoK45IBGX7t.png',
    gallery: [
      { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Beef%20Jerky%20Cajun-2IXklbUCFB96aosh9KWfoK45IBGX7t.png', alt: 'Beef Jerky Slabs Cajun Package' },
      { src: '/images/jerky-detail-1.jpg', alt: 'Cajun Texture Close-up' },
      { src: '/images/jerky-detail-2.jpg', alt: 'Cajun Jerky Display' },
    ],
    features: ['Authentic Cajun Spice', 'Medium Heat', 'Thick Cut Slabs', 'Ontario Made', 'High Protein', 'Southern Flavor'],
    ingredients: ['Beef', 'Water', 'Cajun Spice Blend', 'Paprika', 'Cayenne', 'Garlic', 'Salt'],
    nutrition: { servingSize: '30g', calories: 84, protein: '16g', fat: '1.5g', carbs: '2g', sodium: '475mg', sugar: '0g' },
    weight: '60g',
    origin: 'Ontario, Canada',
    shelfLife: '12 months',
    category: 'beef-jerky-slabs',
    badges: ['spicy', 'popular'],
    benefits: ['Authentic Cajun taste', 'Balanced Southern heat', 'Premium beef slabs', 'Bold zesty flavor'],
  },
  {
    id: 'bjs-teriyaki',
    name: 'Beef Jerky Slabs - Teriyaki',
    description: 'Sweet and savory teriyaki beef jerky slabs. Asian-inspired perfection.',
    longDescription: 'Experience the perfect fusion of East meets West with our Teriyaki Beef Jerky Slabs. Authentic teriyaki glaze caramelizes during drying, creating a slightly glossy finish and irresistible umami taste. Sweet, savory, and absolutely delicious.',
    price: 13.40,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Beef%20Jerky%20Teriyaki-yvzY597cBLsESWoy73h352btLlCPDI.png',
    gallery: [
      { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Beef%20Jerky%20Teriyaki-yvzY597cBLsESWoy73h352btLlCPDI.png', alt: 'Beef Jerky Slabs Teriyaki Package' },
      { src: '/images/jerky-detail-1.jpg', alt: 'Teriyaki Texture Close-up' },
      { src: '/images/jerky-detail-2.jpg', alt: 'Teriyaki on Display' },
    ],
    features: ['Authentic Teriyaki', 'Sweet & Savory', 'Thick Cut Slabs', 'Ontario Made', 'High Protein', 'Asian Inspired'],
    ingredients: ['Beef', 'Soy Sauce', 'Brown Sugar', 'Ginger', 'Garlic', 'Sesame', 'Natural Spices'],
    nutrition: { servingSize: '30g', calories: 90, protein: '15g', fat: '1.5g', carbs: '4g', sodium: '490mg', sugar: '3g' },
    weight: '60g',
    origin: 'Ontario, Canada',
    shelfLife: '12 months',
    category: 'beef-jerky-slabs',
    badges: ['best-seller'],
    benefits: ['Sweet teriyaki glaze', 'Umami flavor profile', 'Premium thick slabs', 'Family favorite'],
  },

  // Oakridge Beef Slabs
  {
    id: 'oak-pepper-garlic',
    name: 'Oakridge Cracked Pepper & Garlic',
    description: 'Premium vacuum-sealed beef slab with cracked pepper and garlic. Extra large cut.',

    price: 10.00,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oakridge%20Cracked%20Pepper%20and%20Garlic%20Beef%20Slab-G8udLLeAXCpyB5vX8cTZnkVGIi7pTG.png',
    gallery: [
      { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oakridge%20Cracked%20Pepper%20and%20Garlic%20Beef%20Slab-G8udLLeAXCpyB5vX8cTZnkVGIi7pTG.png', alt: 'Oakridge Pepper & Garlic Package' },
      { src: '/images/jerky-detail-1.jpg', alt: 'Premium Slab Close-up' },
      { src: '/images/jerky-detail-2.jpg', alt: 'Oakridge Display' },
    ],
    features: ['Premium Cut', 'Extra Large Slab', 'Vacuum Sealed', 'Visible Product', 'High Protein', 'Ontario Approved'],
    ingredients: ['Beef', 'Water', 'Salt', 'Cracked Black Pepper', 'Garlic', 'Natural Spices'],
    nutrition: { servingSize: '40g', calories: 120, protein: '22g', fat: '2g', carbs: '2g', sodium: '520mg', sugar: '0g' },
    weight: '80g',
    origin: 'Ontario, Canada',
    shelfLife: '12 months',
    category: 'oakridge',
    badges: ['premium', 'best-seller'],
    benefits: ['Premium extra-large cut', 'Vacuum sealed freshness', 'Bold pepper & garlic', 'See exactly what you get'],
  },
  {
    id: 'oak-teriyaki',
    name: 'Oakridge Teriyaki',
    description: 'Premium vacuum-sealed teriyaki beef slab. Sweet, savory, exceptional.',

    price: 10.00,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oakridge%20Teriyaki-ePb0DnzSwJf54UFpV3d8OvlDiwBMQl.png',
    gallery: [
      { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oakridge%20Teriyaki-ePb0DnzSwJf54UFpV3d8OvlDiwBMQl.png', alt: 'Oakridge Teriyaki Package' },
      { src: '/images/jerky-detail-1.jpg', alt: 'Premium Teriyaki Close-up' },
      { src: '/images/jerky-detail-2.jpg', alt: 'Oakridge Teriyaki Display' },
    ],
    features: ['Premium Cut', 'Extra Large Slab', 'Vacuum Sealed', 'Teriyaki Glazed', 'High Protein', 'Visible Product'],
    ingredients: ['Beef', 'Soy Sauce', 'Brown Sugar', 'Ginger', 'Garlic', 'Sesame', 'Natural Spices'],
    nutrition: { servingSize: '40g', calories: 125, protein: '21g', fat: '2g', carbs: '4g', sodium: '540mg', sugar: '3g' },
    weight: '80g',
    origin: 'Ontario, Canada',
    shelfLife: '12 months',
    category: 'oakridge',
    badges: ['premium'],
    benefits: ['Premium teriyaki glaze', 'Extra-large slab format', 'Vacuum sealed quality', 'Restaurant-grade taste'],
  },
  {
    id: 'oak-traditional',
    name: 'Oakridge Traditional',
    description: 'Premium vacuum-sealed traditional beef slab. Classic flavor, premium quality.',

    price: 10.00,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oakridge%20Traditional-8DZwPamSZYpSJh8YCqrfNTl92zFvmD.png',
    gallery: [
      { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oakridge%20Traditional-8DZwPamSZYpSJh8YCqrfNTl92zFvmD.png', alt: 'Oakridge Traditional Package' },
      { src: '/images/jerky-detail-1.jpg', alt: 'Premium Traditional Close-up' },
      { src: '/images/jerky-detail-2.jpg', alt: 'Oakridge Traditional Display' },
    ],
    features: ['Premium Cut', 'Extra Large Slab', 'Vacuum Sealed', 'Classic Flavor', 'High Protein', 'Minimal Ingredients'],
    ingredients: ['Beef', 'Water', 'Salt', 'Natural Spices'],
    nutrition: { servingSize: '40g', calories: 115, protein: '22g', fat: '1.5g', carbs: '1g', sodium: '500mg', sugar: '0g' },
    weight: '80g',
    origin: 'Ontario, Canada',
    shelfLife: '12 months',
    category: 'oakridge',
    badges: ['premium', 'popular'],
    benefits: ['Pure traditional taste', 'Premium extra-large cut', 'Minimal clean ingredients', 'Vacuum sealed freshness'],
  },
]

export const featuredProducts = [
  products.find(p => p.id === 'cc-traditional')!,
  products.find(p => p.id === 'oak-pepper-garlic')!,
  products.find(p => p.id === 'bjs-pepper-garlic')!,
  products.find(p => p.id === 'cc-pepper-garlic')!,
  products.find(p => p.id === 'bjs-teriyaki')!,
  products.find(p => p.id === 'oak-traditional')!,
]

export function getProductById(id: string): ProductDetails | undefined {
  return products.find(p => p.id === id)
}

export function getRelatedProducts(currentId: string, limit: number = 3): ProductDetails[] {
  const currentProduct = products.find(p => p.id === currentId)
  if (!currentProduct) return products.slice(0, limit)
  
  // Prioritize same category products
  const sameCategory = products.filter(p => p.id !== currentId && p.category === currentProduct.category)
  const otherProducts = products.filter(p => p.id !== currentId && p.category !== currentProduct.category)
  
  return [...sameCategory, ...otherProducts].slice(0, limit)
}

export function getProductsByCategory(category: ProductCategory): ProductDetails[] {
  return products.filter(p => p.category === category)
}

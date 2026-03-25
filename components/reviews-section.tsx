import { Star } from 'lucide-react'
import { Card, CardContent } from './ui/card'

interface Review {
  id: string
  name: string
  rating: number
  text: string
  location: string
}

const reviews: Review[] = [
  {
    id: '1',
    name: 'Michael T.',
    rating: 5,
    text: "Best jerky I've ever had! The cracked pepper & garlic flavor is incredible. You can really taste the quality.",
    location: 'Toronto, ON',
  },
  {
    id: '2',
    name: 'Sarah L.',
    rating: 5,
    text: "Finally found a jerky with no sugar that actually tastes amazing. Perfect for my keto diet!",
    location: 'Vancouver, BC',
  },
  {
    id: '3',
    name: 'James R.',
    rating: 4,
    text: "Great texture and flavor. The slabs are perfect for hiking trips. Will definitely order again.",
    location: 'Calgary, AB',
  },
  {
    id: '4',
    name: 'Emily W.',
    rating: 5,
    text: "Love supporting local Canadian businesses. This jerky is top-notch quality and ships fast!",
    location: 'Ottawa, ON',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? 'fill-primary text-primary' : 'text-muted'
          }`}
        />
      ))}
    </div>
  )
}

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-primary tracking-wider uppercase">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Customer Reviews
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See what our customers are saying about Local Jerky Plus
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="bg-card">
              <CardContent className="p-6">
                <StarRating rating={review.rating} />
                <p className="text-foreground mt-4 mb-4 leading-relaxed">
                  {`"${review.text}"`}
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

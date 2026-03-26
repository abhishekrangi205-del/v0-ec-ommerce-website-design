"use client"

import { useEffect, useRef, useState } from 'react'
import { Star, Quote } from 'lucide-react'
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
          className={`h-4 w-4 transition-all duration-300 ${
            i < rating ? 'fill-primary text-primary' : 'text-muted'
          }`}
        />
      ))}
    </div>
  )
}

export function ReviewsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="reviews" className="py-16 md:py-24 bg-muted/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
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
          {reviews.map((review, index) => (
            <Card 
              key={review.id} 
              className={`bg-card group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 relative overflow-hidden
                ${isVisible ? (index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right') : 'opacity-0'}`}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <CardContent className="p-6 relative">
                {/* Quote decoration */}
                <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10 transition-all duration-300 group-hover:text-primary/20 group-hover:scale-110" />
                
                <StarRating rating={review.rating} />
                <p className="text-foreground mt-4 mb-4 leading-relaxed relative z-10">
                  {`"${review.text}"`}
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">{review.name}</p>
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

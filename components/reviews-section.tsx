"use client"

import { useEffect, useRef, useState } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
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
    name: 'Kalea Loewen',
    rating: 5,
    text: "Amazing and flavourful jerky. My husband's favourite and we both like the toughness",
    location: '2 years ago',
  },
  {
    id: '2',
    name: 'Marc Lefebvre',
    rating: 5,
    text: "Well I went to my corner store and purchased a couple of packages (dill & pepper and garlic i left them on the coffee table my uncle tried the garlic and he did everything but lick the bag clean I love a bunch of of flavors\nJust wish they were a bit better priced but I do loooooooooooove your jerky",
    location: '4 months ago',
  },
  {
    id: '3',
    name: 'Dave Bennett',
    rating: 5,
    text: "Best jerky I've had. I love how it's not wet and soft.\nFlavour is amazing. Only thing I asked for this Xmas was a huge bag.",
    location: '4 months ago',
  },
  {
    id: '4',
    name: 'Brandon Desrosiers',
    rating: 5,
    text: "I brought some of my deer meat and got it turned into pepperettes, by far the best I've had!! I also bought some jerky and it did not disappoint. I highly recommend Local Jerky Plus",
    location: 'a year ago',
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
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

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

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 320 // Card width + gap
      if (direction === 'left') {
        carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
      } else {
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    }
  }

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

        {/* Desktop Grid Layout */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* Mobile Carousel Layout */}
        <div className="md:hidden relative">
          <div 
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4"
            style={{ scrollBehavior: 'smooth' }}
          >
            {reviews.map((review, index) => (
              <Card 
                key={review.id} 
                className="flex-shrink-0 w-80 bg-card group hover:shadow-lg transition-all duration-300 relative overflow-hidden snap-center"
              >
                <CardContent className="p-6 relative">
                  {/* Quote decoration */}
                  <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10 transition-all duration-300 group-hover:text-primary/20 group-hover:scale-110" />
                  
                  <StarRating rating={review.rating} />
                  <p className="text-foreground mt-4 mb-4 leading-relaxed relative z-10 text-sm">
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

          {/* Mobile Carousel Controls */}
          <div className="flex justify-center gap-2 mt-6">
            <button
              onClick={() => scrollCarousel('left')}
              className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300"
              aria-label="Next review"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

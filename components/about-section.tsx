"use client"

import { useEffect, useRef, useState } from 'react'
import { Leaf, Award, Heart, MapPin } from 'lucide-react'

const features = [
  {
    icon: Leaf,
    title: 'All Natural',
    description: 'No artificial preservatives, colors, or flavors. Just pure, natural ingredients.',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Made with the finest Canadian beef, carefully selected for superior taste.',
  },
  {
    icon: Heart,
    title: 'Zero Sugar',
    description: 'Perfect for health-conscious snackers and those following low-carb diets.',
  },
  {
    icon: MapPin,
    title: 'Made in Canada',
    description: 'Proudly crafted in Ontario, supporting local farmers and communities.',
  },
]

export function AboutSection() {
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
    <section ref={sectionRef} id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-sm font-semibold text-primary tracking-wider uppercase">
            Why Choose Us
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            The Local Jerky Difference
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We believe in creating jerky the right way - with quality ingredients, traditional methods, and a whole lot of care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className={`text-center group ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                <feature.icon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2 transition-colors duration-300 group-hover:text-primary">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

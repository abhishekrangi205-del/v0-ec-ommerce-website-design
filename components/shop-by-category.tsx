"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Flame, Trophy, Beef } from 'lucide-react'

const categories = [
  {
    id: 'carnivore-crave',
    name: 'Carnivore Crave',
    tagline: 'High Protein Snacks',
    description: '45g protein per bag',
    icon: Flame,
    bgClass: 'bg-gradient-to-br from-zinc-900 to-zinc-800',
    accentClass: 'text-red-500',
    borderClass: 'hover:border-red-500/50',
    href: '/category/carnivore-crave',
  },
  {
    id: 'beef-jerky-slabs',
    name: 'Beef Jerky Slabs',
    tagline: 'Classic Jerky Cuts',
    description: 'Traditional thick-cut slabs',
    icon: Beef,
    bgClass: 'bg-gradient-to-br from-stone-800 to-stone-700',
    accentClass: 'text-orange-500',
    borderClass: 'hover:border-orange-500/50',
    href: '/category/beef-jerky-slabs',
  },
  {
    id: 'oakridge',
    name: 'Oakridge Beef Slabs',
    tagline: 'Premium Slabs',
    description: 'Extra-large vacuum sealed',
    icon: Trophy,
    bgClass: 'bg-gradient-to-br from-zinc-900 to-zinc-800',
    accentClass: 'text-amber-500',
    borderClass: 'hover:border-amber-500/50',
    href: '/category/oakridge',
  },
]

export function ShopByCategory() {
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
    <section ref={sectionRef} className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-sm font-semibold text-primary tracking-wider uppercase">
            Browse Collection
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-3">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore our premium jerky collections, each crafted for a unique taste experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <Link
                key={category.id}
                href={category.href}
                className={`group relative overflow-hidden rounded-xl border-2 border-transparent transition-all duration-500 ${category.borderClass} ${category.bgClass}
                  ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 150 + 200}ms` }}
              >
                <div className="p-8 text-center relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-5 transition-transform duration-300 group-hover:scale-110 ${category.accentClass}`}>
                    <Icon className="h-8 w-8" />
                  </div>

                  {/* Text Content */}
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:scale-105 transition-transform duration-300">
                    {category.name}
                  </h3>
                  <p className={`text-sm font-semibold mb-2 ${category.accentClass}`}>
                    {category.tagline}
                  </p>
                  <p className="text-sm text-white/60">
                    {category.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold ${category.accentClass} opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0`}>
                    Shop Now
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        if (rect.bottom > 0) {
          setScrollY(window.scrollY)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[70vh] md:min-h-[85vh] flex items-center overflow-hidden parallax-hero"
    >
      {/* Parallax Background Image */}
      <div 
        className="absolute inset-0 z-0 parallax-bg"
        style={{ transform: `translateY(${scrollY * 0.3}px) scale(1.1)` }}
      >
        <Image
          src="/images/hero.jpg"
          alt="Premium beef jerky on rustic cutting board"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-foreground/20" />
      </div>

      {/* Animated Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <div 
            className={`flex items-center gap-3 mb-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.1s' }}
          >
            <span className="inline-block px-4 py-1.5 bg-primary text-primary-foreground text-xs md:text-sm font-bold rounded-full">
              Ontario Made
            </span>
            <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-xs md:text-sm font-semibold rounded-full backdrop-blur-sm">
              Premium Quality
            </span>
          </div>
          <h1 
            className={`font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-balance
              ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.2s' }}
          >
            Fuel Your Day with Premium Canadian Jerky
          </h1>
          <p 
            className={`text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-xl
              ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.4s' }}
          >
            Up to 45g protein per bag. Zero sugar. No fillers. Handcrafted in Ontario with 100% premium beef for athletes and snack lovers alike.
          </p>
          <div 
            className={`flex flex-col sm:flex-row gap-4
              ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.6s' }}
          >
            <Button asChild size="lg" className="text-base btn-glow">
              <Link href="#products">
                View Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="text-base bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white transition-all duration-300"
            >
              <Link href="/about">
                Our Story
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
        style={{ animationDelay: '1s' }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}

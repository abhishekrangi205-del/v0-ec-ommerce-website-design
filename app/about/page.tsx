"use client"

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CartSidebar } from '@/components/cart-sidebar'
import { Button } from '@/components/ui/button'
import { ArrowRight, Leaf, Award, Heart, MapPin, Users, Clock, Target } from 'lucide-react'

const tabs = [
  {
    id: 'story',
    label: 'Our Story',
    icon: Clock,
    content: {
      title: 'Our Story',
      description: `Local Jerky Plus Inc. started with a simple idea and a passion for quality.

Founder Shawn Scott began making jerky out of his home in Copper Cliff when he was young. After sharing it with friends, they encouraged him to turn it into a business. What started as a small home operation quickly grew into something much bigger.

Taking that advice seriously, Shawn built a licensed meat kitchen in his home and became provincially licensed through the Ministry of Agriculture, Food and Rural Affairs.

Since officially launching in 2019, Local Jerky Plus has expanded into a fully licensed provincial meat plant located in Lively, Ontario. Today, the company produces thousands of packs of jerky daily while staying true to its roots of quality and consistency.`,
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Our%20story-WzWuJ9Vq8ObImpn4Azeh6YgvlrUeKD.png'
    }
  },
  {
    id: 'mission',
    label: 'Our Mission',
    icon: Target,
    content: {
      title: 'Our Mission',
      description: `At Local Jerky Plus, our mission is simple:

To deliver high-quality, high-protein jerky made locally with clean ingredients and no compromises.

We are committed to:

- Producing premium jerky with exceptional taste and nutrition
- Offering high-protein, low to zero grams of sugar options
- Maintaining strict quality standards in a licensed facility
- Supporting local production and Canadian-made products

Our goal is to fuel active lifestyles with products people can trust.`,
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Our%20mission-IpuymDOoB2AltMdndgrxQINjviAi93.png'
    }
  },
  {
    id: 'team',
    label: 'Our Team',
    icon: Users,
    content: {
      title: 'Our Team',
      description: `Local Jerky Plus Inc. was founded by Shawn Scott, whose dedication and vision turned a small home operation into a growing business.

Today, our team works out of a provincially licensed meat plant in Lively, Ontario, producing thousands of packs of jerky each day. Every member of our team is committed to maintaining quality, consistency, and efficiency at every step of the process.

From production to packaging, we take pride in delivering a product that represents hard work, local roots, and high standards.`,
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Our%20team-yrWW941ys5kjX1cgEHnITIjj7YUNDI.png'
    }
  }
]

const values = [
  {
    icon: Leaf,
    title: 'Natural Ingredients',
    description: 'We never use artificial preservatives, colors, or flavors.'
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Only the finest beef makes it into our products.'
  },
  {
    icon: Heart,
    title: 'Health First',
    description: 'Zero grams of sugar and no fillers—just pure, wholesome protein.'
  },
  {
    icon: MapPin,
    title: 'Proudly Canadian',
    description: 'Made in Ontario, supporting local farmers and communities.'
  }
]

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('story')
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)

  // Intersection observer for fade-in animations
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        if (rect.bottom > 0) {
          setScrollY(window.scrollY)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    setIsVideoLoaded(true)
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const activeContent = tabs.find(tab => tab.id === activeTab)?.content

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Video Hero Section */}
        <div 
          ref={heroRef}
          className="relative h-[70vh] md:h-[80vh] overflow-hidden"
        >
          {/* Background with parallax */}
          <div 
            className="absolute inset-0 parallax-bg"
            style={{ transform: `translateY(${scrollY * 0.4}px) scale(1.15)` }}
          >
            <Image
              src="/images/about-hero.jpg"
              alt="Jerky making process"
              fill
              className="object-cover"
              priority
            />
            <div className="video-overlay absolute inset-0" />
          </div>

          {/* Animated Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <span 
              className={`inline-block px-4 py-1.5 bg-primary/90 text-primary-foreground text-xs md:text-sm font-semibold rounded-full mb-6
                ${isVideoLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: '0.2s' }}
            >
              Since 2015
            </span>
            <h1 
              className={`font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 max-w-4xl text-balance
                ${isVideoLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: '0.4s' }}
            >
              Crafting Premium Jerky, One Batch at a Time
            </h1>
            <p 
              className={`text-lg md:text-xl text-white/90 max-w-2xl mb-8
                ${isVideoLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: '0.6s' }}
            >
              Discover the passion, craftsmanship, and Canadian pride behind every piece of Local Jerky Plus.
            </p>
            <div 
              className={`${isVideoLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: '0.8s' }}
            >
              <Button asChild size="lg" className="btn-glow">
                <Link href="#brand-story">
                  Explore Our Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div 
            className={`absolute bottom-8 left-1/2 -translate-x-1/2 ${isVideoLoaded ? 'animate-fade-in' : 'opacity-0'}`}
            style={{ animationDelay: '1.2s' }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1">
              <div className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce" />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <section 
          id="values-section"
          data-animate
          className="py-16 md:py-20 bg-muted"
        >
          <div className="container mx-auto px-4">
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 ${visibleSections.has('values-section') ? 'animate-fade-in-up' : 'opacity-0'}`}>
              {values.map((value, index) => (
                <div 
                  key={value.title}
                  className="text-center"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4 transition-transform duration-300 hover:scale-110">
                    <value.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Tabs Section */}
        <section 
          id="brand-story"
          data-animate
          className="py-16 md:py-24 bg-background"
        >
          <div className="container mx-auto px-4">
            <div className={`text-center mb-12 ${visibleSections.has('brand-story') ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <span className="text-sm font-semibold text-primary tracking-wider uppercase">
                Get to Know Us
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2">
                The Local Jerky Story
              </h2>
            </div>

            {/* Tab Navigation */}
            <div 
              className={`flex flex-wrap justify-center gap-2 md:gap-4 mb-12 ${visibleSections.has('brand-story') ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all duration-300 
                    ${activeTab === tab.id 
                      ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                      : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:scale-102'
                    }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeContent && (
              <div 
                key={activeTab}
                className="grid md:grid-cols-2 gap-8 md:gap-12 items-center tab-content-enter"
              >
                <div className="order-2 md:order-1">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">
                    {activeContent.title}
                  </h3>
                  <div className="prose prose-lg text-muted-foreground whitespace-pre-line">
                    {activeContent.description}
                  </div>
                  <div className="mt-8">
                    <Button asChild className="btn-glow">
                      <Link href="/#products">
                        Shop Our Products
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="order-1 md:order-2 relative w-full rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={activeContent.image}
                    alt={activeContent.title}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section 
          id="cta-section"
          data-animate
          className="py-16 md:py-24 bg-primary text-primary-foreground"
        >
          <div className="container mx-auto px-4 text-center">
            <div className={`max-w-2xl mx-auto ${visibleSections.has('cta-section') ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Ready to Taste the Difference?
              </h2>
              <p className="text-primary-foreground/90 text-lg mb-8">
                Join thousands of jerky lovers who&apos;ve made the switch to premium beef jerky with zero grams of sugar.
              </p>
              <Button 
                asChild 
                size="lg" 
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 transition-all duration-300 hover:scale-105"
              >
                <Link href="/#products">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CartSidebar />
    </div>
  )
}

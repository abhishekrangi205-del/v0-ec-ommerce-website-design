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
      title: 'From Passion to Premium',
      description: `It all started in 2015 with a simple idea: create beef jerky that we'd be proud to share with our own families. Frustrated with mass-produced snacks loaded with artificial ingredients, our founder set out to craft something different.

Starting in a small kitchen in rural Ontario, we experimented with traditional recipes, sourcing the finest Canadian beef and selecting only natural seasonings. Word spread quickly through local farmers' markets, and what began as a weekend hobby transformed into a mission.

Today, Local Jerky Plus operates from a modern facility in Ontario, but we've never forgotten our roots. Every batch is still crafted with the same care and attention that went into those first kitchen experiments.`,
      image: '/images/founder.jpg'
    }
  },
  {
    id: 'mission',
    label: 'Our Mission',
    icon: Target,
    content: {
      title: 'Redefining Snack Food',
      description: `Our mission is simple: prove that delicious snacks don't have to compromise on health or quality. We believe that what you put into your body matters, which is why we're committed to:

• Using only 100% Canadian beef from trusted local farms
• Never adding artificial preservatives, colors, or flavors
• Maintaining zero sugar in all our products
• Supporting sustainable farming practices
• Creating jobs in our local Ontario community

We're not just making jerky—we're building a movement toward better, cleaner snacking that doesn't sacrifice taste for health.`,
      image: '/images/process.jpg'
    }
  },
  {
    id: 'team',
    label: 'Our Team',
    icon: Users,
    content: {
      title: 'The People Behind the Product',
      description: `Behind every bag of Local Jerky Plus is a dedicated team of food lovers, quality experts, and passionate Canadians. From our master jerky makers who've perfected the art of seasoning and smoking, to our quality control team who taste-tests every batch, everyone here shares the same commitment to excellence.

Our team includes:
• Expert jerky artisans with decades of combined experience
• Quality assurance specialists ensuring consistent perfection
• Local farmers who share our values
• Customer service heroes who treat every customer like family

We're proud to be a tight-knit team that genuinely loves what we do.`,
      image: '/images/about-hero.jpg'
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
    description: 'Only the finest Canadian beef makes it into our products.'
  },
  {
    icon: Heart,
    title: 'Health First',
    description: 'Zero sugar and no fillers—just pure, wholesome protein.'
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
                <div className="order-1 md:order-2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={activeContent.image}
                    alt={activeContent.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
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
                Join thousands of jerky lovers who&apos;ve made the switch to premium, all-natural Canadian beef jerky.
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

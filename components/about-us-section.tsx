"use client"

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Leaf, Award, Heart, MapPin, Users, Clock, Target, ArrowRight } from 'lucide-react'

const tabs = [
  {
    id: 'story',
    label: 'Our Story',
    icon: Clock,
    content: {
      title: 'From Passion to Premium',
      description: `It all started in 2015 with a simple idea: create beef jerky that we'd be proud to share with our own families. Frustrated with mass-produced snacks loaded with artificial ingredients, our founder set out to craft something different.

Starting in a small kitchen in rural Ontario, we experimented with traditional recipes, sourcing the finest Canadian beef and selecting only natural seasonings. Word spread quickly through local farmers' markets, and what began as a weekend hobby transformed into a mission.`,
      image: '/images/founder.jpg'
    }
  },
  {
    id: 'mission',
    label: 'Our Mission',
    icon: Target,
    content: {
      title: 'Redefining Snack Food',
      description: `Our mission is simple: prove that delicious snacks don't have to compromise on health or quality. We believe that what you put into your body matters, which is why we're committed to using only 100% Canadian beef from trusted local farms, never adding artificial preservatives, and maintaining zero sugar in all our products.

We support sustainable farming practices and create jobs in our local Ontario community.`,
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

We're proud to be a tight-knit team that genuinely loves what we do.`,
      image: '/images/about-hero.jpg'
    }
  }
]

const values = [
  {
    icon: Leaf,
    title: 'All Natural',
    description: 'No artificial preservatives, colors, or flavors.',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Made with the finest Canadian beef.',
  },
  {
    icon: Heart,
    title: 'Zero Sugar',
    description: 'Perfect for health-conscious snackers.',
  },
  {
    icon: MapPin,
    title: 'Made in Canada',
    description: 'Proudly crafted in Ontario.',
  },
]

export function AboutUsSection() {
  const [activeTab, setActiveTab] = useState('story')
  const [isVisible, setIsVisible] = useState(false)
  const [valuesVisible, setValuesVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === sectionRef.current) {
              setIsVisible(true)
            }
            if (entry.target === valuesRef.current) {
              setValuesVisible(true)
            }
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    if (valuesRef.current) observer.observe(valuesRef.current)

    return () => observer.disconnect()
  }, [])

  const activeContent = tabs.find(tab => tab.id === activeTab)?.content

  return (
    <section ref={sectionRef} id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-sm font-semibold text-primary tracking-wider uppercase">
            Get to Know Us
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            The Local Jerky Story
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the passion, craftsmanship, and Canadian pride behind every piece of Local Jerky Plus.
          </p>
        </div>

        {/* Values Grid */}
        <div 
          ref={valuesRef}
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 ${valuesVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          {values.map((value, index) => (
            <div 
              key={value.title} 
              className="text-center group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-3 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                <value.icon className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-foreground mb-1 transition-colors duration-300 group-hover:text-primary">
                {value.title}
              </h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Interactive Tabs */}
        <div className={`${isVisible ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all duration-300 
                  ${activeTab === tab.id 
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
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
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {activeContent.title}
                </h3>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line mb-6">
                  {activeContent.description}
                </div>
                <Button asChild className="btn-glow">
                  <Link href="/#products">
                    Shop Our Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="order-1 md:order-2 relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src={activeContent.image}
                  alt={activeContent.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

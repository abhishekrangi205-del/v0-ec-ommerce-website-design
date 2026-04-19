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
    description: 'No artificial preservatives, colors, or flavors.',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Made with the finest beef.',
  },
  {
    icon: Heart,
    title: 'Zero Grams of Sugar',
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
              <div className="order-1 md:order-2 relative w-full rounded-xl overflow-hidden shadow-xl">
                <Image
                  src={activeContent.image}
                  alt={activeContent.title}
                  width={1200}
                  height={900}
                  className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                  unoptimized
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

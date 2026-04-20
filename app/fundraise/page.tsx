'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Check, AlertCircle } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function FundraisePage() {
  const [formData, setFormData] = useState({
    organizationName: '',
    organizationType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')

    try {
      const response = await fetch('/api/fundraise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setMessage('Thank you! Your fundraising request has been submitted. Our team will contact you shortly.')
        setFormData({
          organizationName: '',
          organizationType: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          province: '',
          postalCode: '',
        })
      } else {
        setStatus('error')
        setMessage('Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Failed to submit form. Please try again.')
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const steps = [
    {
      number: '1',
      title: 'Fill out the Form',
      description: 'Provide your organization and contact details',
      icon: '📋',
    },
    {
      number: '2',
      title: 'Start Selling',
      description: 'We&apos;ll send you everything you need',
      icon: '💰',
    },
    {
      number: '3',
      title: 'Submit your order',
      description: 'Orders go directly to your supporters',
      icon: '✓',
    },
    {
      number: '4',
      title: 'We deliver',
      description: 'Your group receives products & profits',
      icon: '🚚',
    },
  ]

  return (
    <>
    <Header />
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-4xl md:text-5xl font-bold">EXTRA</span>
              <span className="text-4xl md:text-5xl font-bold text-primary">BONUS</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Earn Prizes & Raise Money!
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Raise money for your team, school, or organization with Local Jerky Plus. Great quality healthy snacks that everyone will love!
            </p>
          </div>

          {/* Fundraising Image */}
          <div className="max-w-4xl mx-auto mb-12 rounded-xl overflow-hidden shadow-xl">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FUNDRAISE_7943e13e-c265-404a-8cc7-8d5f9116b807-KDmlaH3z9AcqFsUxhSJKSzFOIzFOyY.png"
              alt="Local Jerky Plus Fundraising"
              width={1000}
              height={600}
              className="w-full h-auto object-cover"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">Ready to Start Fundraising</h2>
          
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4 flex justify-center">{step.icon}</div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-lg p-4 border-l-4 border-primary">
            <p className="text-center text-muted-foreground">
              <strong>Our team will contact you with more information as soon as the form is submitted</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Start Your Fundraiser</h2>

          {status === 'success' && (
            <Card className="mb-6 border-green-200 bg-green-50">
              <CardContent className="pt-6">
                <div className="flex gap-4 text-green-700">
                  <Check className="h-6 w-6 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Success!</h3>
                    <p>{message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {status === 'error' && (
            <Card className="mb-6 border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex gap-4 text-red-700">
                  <AlertCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Error</h3>
                    <p>{message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="pt-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Organization Info */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Organization Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Organization Name *</label>
                    <input
                      type="text"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g., Lincoln High School"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Organization Type *</label>
                    <select
                      name="organizationType"
                      value={formData.organizationType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select organization type</option>
                      <option value="school">School</option>
                      <option value="sports-team">Sports Team</option>
                      <option value="scout-group">Scout Group</option>
                      <option value="charity">Charity/Non-profit</option>
                      <option value="community">Community Organization</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Contact Information</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Address Info */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Address</h3>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Street Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Province *</label>
                      <input
                        type="text"
                        name="province"
                        value={formData.province}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Postal Code *</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Fundraising Request'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
    <Footer />
    </>
  )
}

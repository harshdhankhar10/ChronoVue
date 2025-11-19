import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Target, Zap, Globe } from 'lucide-react'
import Footer from '@/components/Homepage/Footer'
import Navbar from '@/components/Navbar'

const AboutUs = () => {
  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Our Mission",
      description: "To democratize career planning by making professional development accessible, visual, and data-driven for everyone."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Our Vision",
      description: "A world where anyone can visualize their path to success and have the tools to make it reality."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Our Approach",
      description: "Combining AI insights with human-centric design to create personalized career journeys."
    }
  ]


  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-white">
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-serif">
            About ChronoVue
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            We're building the future of career planning—where AI meets human ambition to create 
            clear, actionable paths to professional success.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  ChronoVue was born from a simple observation: traditional career planning is broken. 
                  Static resumes, vague advice, and one-size-fits-all approaches leave talented people 
                  unsure about their next steps.
                </p>
                <p>
                  We set out to change that by creating a platform that combines the power of AI with 
                  intuitive visual timelines. Our goal is to transform abstract career goals into 
                  clear, achievable milestones.
                </p>
                <p>
                  Today, we help thousands of professionals, students, and career-changers visualize 
                  their path to success and take confident steps toward their dreams.
                </p>
              </div>
            </div>
          </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">What Drives Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center border border-gray-200 rounded-lg p-6 bg-white">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <section className="py-20 px-4 bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Visualize Your Journey?</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Join thousands of professionals who are already planning their success with ChronoVue.
          </p>
          <Link href="/signup">
            <Button>
              Start Your Journey
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
    <Footer />
    </>
  )
}

export default AboutUs
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'
import WhyWeStandOutSection from './WhyWeStandOutSection'
import Footer from './Footer'

const HeroSection = () => {
    const steps = [
        {
          number: "01",
          title: "Define Your Goals",
          description: "Start by entering your personal, career, or educational goals.",
        },
        {
          number: "02",
          title: "Create Timeline",
          description: "Break down goals into milestones and create a visual timeline.",
        },
        {
          number: "03",
          title: "Get AI Insights",
          description: "Receive personalized recommendations to optimize your path.",
        },
        {
          number: "04",
          title: "Track & Celebrate",
          description: "Monitor progress and celebrate wins along the way.",
        },
      ]
    
  return (
    <>
      <section className="relative pt-[216px] pb-16">
      <div className="max-w-[1060px] mx-auto px-4">
        <div className="flex flex-col items-center gap-12">
          <div className="max-w-[937px] flex flex-col items-center gap-3">
            <div className="flex flex-col items-center gap-6">
              <h1 className="max-w-[748px] text-center text-[#37322f] text-5xl md:text-[80px] font-normal leading-tight md:leading-[96px] font-serif">
                Visualize your journey to success
              </h1>
              <p className="max-w-[506px] text-center text-[#37322f]/80 text-lg font-medium leading-7">
                ChronoVue transforms your goals into interactive timelines. Plan smarter, track progress in real-time,
                and achieve more with AI-powered insights.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
           <Link href="/signup">
           <Button className="h-10 px-12 bg-[#ea580c] hover:bg-[#c2410c] text-white rounded-full font-medium text-sm shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset]">
              Start planning free
            </Button>
           </Link>
          </div>
        </div>
      </div>
    </section>
    <section id="how-it-works" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-gray-900 text-center mb-16">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 h-full">
                <div className="text-5xl font-bold text-orange-200 mb-4">{step.number}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 w-8 h-8 bg-orange-600 rounded-full border-4 border-white"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
        <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Beautiful Timeline Visualization</h2>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              See your entire journey at a glance. Our intuitive timeline interface makes it easy to visualize where
              you've been and where you're going.
            </p>
            <ul className="space-y-4">
              {[
                "Drag-and-drop timeline builder",
                "Color-coded milestones",
                "Real-time progress updates",
                "Shareable timeline links",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-700">
                  <span className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Image height={350} width={600} src="https://cdn.prod.website-files.com/59e16042ec229e00016d3a66/654418e90187f69ed0fe20c6_final%20slide.webp" alt="Timeline Visualization" className="rounded-3xl shadow-2xl" />
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img src="/Homepage/ai-insights.png" alt="AI Insights" className="rounded-3xl shadow-2xl" />
          </div>
          <div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">AI-Powered Insights</h2>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Our advanced AI analyzes your goals and habits to provide personalized recommendations that accelerate
              your path to success.
            </p>
            <div className="space-y-4">
              {["Smart goal suggestions", "Predictive analytics", "Habit optimization", "Risk identification"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="text-2xl">🎯</span>
                    <span className="text-lg text-gray-700">{item}</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="py-20 px-4 bg-gradient-to-r from-orange-50 to-orange-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Join Our Community</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: "💬", title: "Forums", desc: "Share experiences and get advice" },
            { icon: "🏆", title: "Challenges", desc: "Participate in community challenges" },
            { icon: "🤝", title: "Mentorship", desc: "Connect with experienced mentors" },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <WhyWeStandOutSection/>
    <Footer/>

    </>
  )
}

export default HeroSection
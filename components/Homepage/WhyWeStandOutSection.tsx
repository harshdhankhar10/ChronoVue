import React from 'react'

const WhyWeStandOutSection = () => {
    const features= [
        "AI-Powered Insights",
        "Beautiful Timelines",
        "Community Features",
        "Mobile App",
        "24/7 Support",
        "Lifetime Updates",
      ]
  return (
    <>
            <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-gray-900 text-center mb-16">Why ChronoVue Stands Out</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-4 px-4 font-bold text-gray-900">Feature</th>
                <th className="text-center py-4 px-4 font-bold">ChronoVue</th>
                <th className="text-center py-4 px-4 font-bold text-gray-500">Others</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr key={feature} className="border-b border-gray-200">
                  <td className="py-4 px-4 text-gray-900 font-medium">{feature}</td>
                  <td className="py-4 px-4 text-center text-orange-600 text-2xl">✓</td>
                  <td className="py-4 px-4 text-center text-gray-400 text-2xl">✗</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
    </>
  )
}

export default WhyWeStandOutSection
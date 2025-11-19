import { Heart } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <>
          <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="font-bold text-3xl mb-4">
            Chrono
            <span className="text-primary">Vue</span>

            </div>
            <p className="text-gray-400 text-sm">
              Turn big dreams into achievable steps with clear visual planning and intelligent guidance.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Product</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <Link href="/#features" className="hover:text-white transition-all duration-300 ease-in-out">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-white transition-all duration-300 ease-in-out">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-all duration-300 ease-in-out">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-all duration-300 ease-in-out">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <Link href="/about-us" className="hover:text-white transition-all duration-300 ease-in-out">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-all duration-300 ease-in-out">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-all duration-300 ease-in-out">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-all duration-300 ease-in-out">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-all duration-300 ease-in-out">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-all duration-300 ease-in-out">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-white transition-all duration-300 ease-in-out">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-all duration-300 ease-in-out">
                  API
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© {currentYear} ChronoVue. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="/legal/privacy" className="hover:text-white transition-all duration-300 ease-in-out">
                Privacy
              </Link>
              <Link href="/legal/terms-conditions" className="hover:text-white transition-all duration-300 ease-in-out">
                Terms &amp; Conditions
              </Link>
              <Link href="/legal/cancellation-refunds" className="hover:text-white transition-all duration-300 ease-in-out">
                Refunds &amp; Cancellations
              </Link>
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              Made with
              <Heart className="w-4 h-4 text-orange-600 fill-orange-600" />
              by the ChronoVue team
            </div>
          </div>
        </div>
      </div>
      </footer>
    </>
  )
  }
export default Footer
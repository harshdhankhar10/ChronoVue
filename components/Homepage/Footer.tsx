import { Heart } from 'lucide-react'
import Image from 'next/image';
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
                <a href="#features" className="hover:text-white transition-all duration-300 ease-in-out">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-all duration-300 ease-in-out">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-all duration-300 ease-in-out">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-all duration-300 ease-in-out">
                  Roadmap
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-all duration-300 ease-in-out">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-all duration-300 ease-in-out">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-all duration-300 ease-in-out">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-all duration-300 ease-in-out">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-all duration-300 ease-in-out">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-all duration-300 ease-in-out">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-all duration-300 ease-in-out">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-all duration-300 ease-in-out">
                  API
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© {currentYear} ChronoVue. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-all duration-300 ease-in-out">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-all duration-300 ease-in-out">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-all duration-300 ease-in-out">
                Cookies
              </a>
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
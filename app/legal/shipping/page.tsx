"use client";

import Footer from '@/components/Homepage/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

const ShippingPage = () => {
  return (
   <>
   <Navbar/>
     <div className="min-h-screen bg-gray-50 py-8 mt-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Digital Service Delivery Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: November 7, 2025</p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Nature of Digital Services</h2>
              <div className="text-gray-600 space-y-3">
                <p>ChronoVue provides exclusively digital services and does not ship physical products. Our platform offers AI-powered career development tools, analytics, and insights delivered electronically through our web platform and associated services.</p>
                <p>All services are delivered instantly upon successful payment processing and credit allocation to your account.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Instant Digital Delivery</h2>
              <div className="text-gray-600 space-y-3">
                <p>Upon successful payment processing through our payment partner Razorpay:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Credits are immediately added to your account balance</li>
                  <li>Access to purchased features is granted instantly</li>
                  <li>You receive email confirmation with transaction details</li>
                  <li>Service availability begins immediately</li>
                </ul>
                <p>Delivery confirmation is provided through both platform notification and email receipt.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Service Access and Availability</h2>
              <div className="text-gray-600 space-y-3">
                <p>Our digital services are accessible 24/7 through our web platform, subject to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Scheduled maintenance windows (announced 48 hours in advance)</li>
                  <li>Unforeseen technical issues or outages</li>
                  <li>Internet connectivity and browser compatibility</li>
                  <li>Account status and active subscription</li>
                </ul>
                <p>We strive to maintain 99.5% uptime but do not guarantee uninterrupted service.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Geographic Availability</h2>
              <div className="text-gray-600 space-y-3">
                <p>ChronoVue services are available worldwide, with the following considerations:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>All payments are processed in Indian Rupees (INR)</li>
                  <li>Automatic currency conversion is handled by Razorpay</li>
                  <li>Service content is primarily optimized for Indian job markets</li>
                  <li>Some features may have regional limitations based on data availability</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Technical Requirements</h2>
              <div className="text-gray-600 space-y-3">
                <p>To access and use ChronoVue services, you need:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>A modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)</li>
                  <li>Stable internet connection (minimum 2 Mbps recommended)</li>
                  <li>JavaScript enabled in your browser</li>
                  <li>Cookies enabled for optimal functionality</li>
                  <li>Screen resolution of 1024x768 or higher</li>
                </ul>
                <p>Mobile access is supported through responsive web design, but some features may have optimized desktop experiences.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Service Updates and Maintenance</h2>
              <div className="text-gray-600 space-y-3">
                <p>We continuously improve our platform through:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Regular feature updates and enhancements</li>
                  <li>AI model improvements and retraining</li>
                  <li>Security patches and performance optimizations</li>
                  <li>Bug fixes and user experience improvements</li>
                </ul>
                <p>Significant updates that affect service delivery or functionality will be communicated to users in advance.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Delivery Confirmation and Receipts</h2>
              <div className="text-gray-600 space-y-3">
                <p>For every transaction, you will receive:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Immediate on-screen confirmation of credit allocation</li>
                  <li>Email receipt with transaction details within 15 minutes</li>
                  <li>Access to transaction history in your account dashboard</li>
                  <li>Razorpay payment confirmation email</li>
                </ul>
                <p>Please retain these confirmations for your records and any customer support inquiries.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Failed or Delayed Deliveries</h2>
              <div className="text-gray-600 space-y-3">
                <p>In rare cases of delivery issues:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>If credits are not delivered within 1 hour of payment, contact support</li>
                  <li>If service access is interrupted, check our status page first</li>
                  <li>For payment processed but service not activated, provide transaction ID</li>
                  <li>Technical support response time is within 24 business hours</li>
                </ul>
                <p>We maintain transaction logs and can verify delivery status for any purchase.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Regional Restrictions</h2>
              <div className="text-gray-600 space-y-3">
                <p>While we aim for global accessibility, certain restrictions may apply:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Services may be limited in countries under international sanctions</li>
                  <li>Payment processing availability depends on Razorpay's supported countries</li>
                  <li>Content may be optimized for specific geographic job markets</li>
                  <li>Language support is primarily English</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Contact for Delivery Issues</h2>
              <div className="text-gray-600 space-y-3">
                <p>If you experience any issues with service delivery:</p>
                <p>Email: dhankhar14804@gmail.com</p>
                <p>Include: Transaction ID, purchase date, and description of the issue</p>
                <p>Response Time: Within 24 business hours</p>
                <p>Escalation: For unresolved issues, contact dhankhar14804@gmail.com</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
   <Footer/>
   </>
  );
};

export default ShippingPage;
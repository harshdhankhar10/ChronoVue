"use client";

import Footer from '@/components/Homepage/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

const PrivacyPage = () => {
  return (
   <>
   <Navbar />
 <div className="min-h-screen bg-gray-50 py-8 mt-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: November 10, 2025</p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <div className="text-gray-600 space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Personal Information</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Name, email address, and contact information</li>
                    <li>Account credentials and profile information</li>
                    <li>Payment information processed through Razorpay</li>
                    <li>Career goals, skill assessments, and learning preferences</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Usage Data</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>IP address, browser type, and device information</li>
                    <li>Pages visited, features used, and time spent</li>
                    <li>Progress tracking, milestone completion, and learning patterns</li>
                    <li>AI interaction data and prediction requests</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Career and Learning Data</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Skill levels, progress metrics, and learning velocity</li>
                    <li>Career aspirations, target roles, and salary expectations</li>
                    <li>Journal entries, reflections, and self-assessments</li>
                    <li>Timeline data, milestones, and project information</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <div className="text-gray-600 space-y-3">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide personalized AI career predictions and recommendations</li>
                  <li>Improve our AI models and service quality</li>
                  <li>Process payments and manage your account</li>
                  <li>Send important service updates and notifications</li>
                  <li>Conduct research and analytics to enhance user experience</li>
                  <li>Prevent fraud and ensure platform security</li>
                  <li>Comply with legal obligations and enforce our terms</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Data Sharing and Disclosure</h2>
              <div className="text-gray-600 space-y-4">
                <p>We do not sell your personal data to third parties. We may share information with:</p>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Service Providers</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Razorpay for payment processing</li>
                    <li>Google AI for generating career predictions</li>
                    <li>Hosting providers and cloud infrastructure services</li>
                    <li>Analytics and monitoring tools</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Legal Requirements</h3>
                  <p>We may disclose information if required by law, court order, or governmental authority, or when we believe disclosure is necessary to protect our rights, your safety, or the safety of others.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Business Transfers</h3>
                  <p>In connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business by another company, user information may be transferred to the new owners.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
              <div className="text-gray-600 space-y-3">
                <p>We implement appropriate technical and organizational security measures to protect your personal data, including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Encryption of data in transit using SSL/TLS protocols</li>
                  <li>Secure storage with access controls and authentication</li>
                  <li>Regular security assessments and vulnerability testing</li>
                  <li>Employee training on data protection and privacy</li>
                  <li>Incident response procedures for data breaches</li>
                </ul>
                <p>While we strive to use commercially acceptable means to protect your data, we cannot guarantee absolute security.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Data Retention</h2>
              <div className="text-gray-600 space-y-3">
                <p>We retain your personal data only for as long as necessary to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide the services you requested</li>
                  <li>Comply with legal obligations</li>
                  <li>Resolve disputes and enforce agreements</li>
                  <li>Maintain business records for analytical purposes</li>
                </ul>
                <p>You can request account deletion at any time, which will permanently remove your personal data from our active systems, subject to legal retention requirements.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Your Rights and Choices</h2>
              <div className="text-gray-600 space-y-3">
                <p>Depending on your location, you may have the following rights:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access and receive a copy of your personal data</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Delete your personal data</li>
                  <li>Restrict or object to processing of your data</li>
                  <li>Data portability to transfer your data to another service</li>
                  <li>Withdraw consent where processing is based on consent</li>
                </ul>
                <p>To exercise these rights, contact us at privacy@chronovue.com. We will respond within 30 days.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Cookies and Tracking</h2>
              <div className="text-gray-600 space-y-3">
                <p>We use cookies and similar tracking technologies to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Authenticate users and maintain session state</li>
                  <li>Remember your preferences and settings</li>
                  <li>Analyze site traffic and usage patterns</li>
                  <li>Improve our services and user experience</li>
                </ul>
                <p>You can control cookies through your browser settings, but disabling cookies may affect platform functionality.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. International Data Transfers</h2>
              <div className="text-gray-600 space-y-3">
                <p>Your data may be processed and stored in servers located outside your country of residence. We ensure appropriate safeguards are in place for international data transfers, including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Standard contractual clauses for data protection</li>
                  <li>Adequacy decisions where applicable</li>
                  <li>Technical and organizational security measures</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
              <div className="text-gray-600 space-y-3">
                <p>Our service is not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16. If you become aware that a child has provided us with personal data, please contact us immediately.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Changes to This Policy</h2>
              <div className="text-gray-600 space-y-3">
                <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. Significant changes will be communicated via email or platform notification.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
              <div className="text-gray-600 space-y-3">
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <p>Email: dhankhar14804@gmail.com</p>
                <p>Data Protection Officer: dhankhar14804@gmail.com</p>
                <p>Response Time: Within 15 business days for privacy-related inquiries</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
   <Footer />
   </>
  );
};

export default PrivacyPage;
"use client";

import Footer from '@/components/Homepage/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

const CancellationRefundsPage = () => {
  return (
   <>
   <Navbar/>
    <div className="min-h-screen bg-gray-50 py-8 mt-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Cancellation & Refunds Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: November 7, 2025</p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Credit-Based Purchases</h2>
              <div className="text-gray-600 space-y-3">
                <p>All credit purchases on ChronoVue are final and non-refundable. Credits once purchased are immediately added to your account balance and cannot be cancelled, refunded, or transferred to another account under normal circumstances.</p>
                <p>Credits have a validity period of 12 months from the date of purchase. Unused credits will automatically expire after this period and no refunds will be provided for expired credits.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Credit Consumption</h2>
              <div className="text-gray-600 space-y-3">
                <p>Credits are consumed when you access premium features including but not limited to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>AI Career Predictor analysis</li>
                  <li>Detailed skill gap assessments</li>
                  <li>Advanced progress analytics</li>
                  <li>Personalized learning roadmaps</li>
                  <li>Market intelligence reports</li>
                </ul>
                <p>Once credits are consumed for a service, the action cannot be reversed and credits cannot be refunded or returned to your account balance.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Technical Issues & Service Disruptions</h2>
              <div className="text-gray-600 space-y-3">
                <p>If you experience technical issues that prevent you from using purchased credits or accessing paid features, please contact our support team within 7 days of the issue occurring. Provide detailed information including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Transaction ID and date</li>
                  <li>Description of the technical issue</li>
                  <li>Screenshots or error messages received</li>
                  <li>Steps you've taken to resolve the issue</li>
                </ul>
                <p>We will investigate reported issues and may, at our discretion, provide credit compensation or service restoration.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Duplicate or Unauthorized Charges</h2>
              <div className="text-gray-600 space-y-3">
                <p>In cases of duplicate charges or unauthorized transactions, please contact us immediately at support@chronovue.com with the following information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Transaction reference numbers</li>
                  <li>Date and time of transactions</li>
                  <li>Amount charged</li>
                  <li>Payment method used</li>
                </ul>
                <p>We will investigate within 3-5 business days and process refunds for verified duplicate or unauthorized charges.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Account Termination & Suspension</h2>
              <div className="text-gray-600 space-y-3">
                <p>Upon voluntary account termination or involuntary suspension due to terms of service violations:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Any unused credits in your account will be forfeited</li>
                  <li>No refunds will be provided for unused credits</li>
                  <li>Access to previously generated reports will be revoked</li>
                  <li>Data deletion will follow our privacy policy guidelines</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Special Circumstances</h2>
              <div className="text-gray-600 space-y-3">
                <p>We understand that exceptional circumstances may occur. In such cases, including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Medical emergencies preventing service usage</li>
                  <li>Extended service outages beyond 48 hours</li>
                  <li>Billing errors from our payment processor</li>
                </ul>
                <p>Please contact our support team with documentation. Each case will be reviewed individually, and resolution will be provided at our discretion.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Refund Processing</h2>
              <div className="text-gray-600 space-y-3">
                <p>Approved refunds will be processed within 7-10 business days to the original payment method. The timeline for funds to appear in your account depends on your financial institution's processing times.</p>
                <p>Refunds are processed in Indian Rupees (INR). International customers will receive the refund in their local currency based on the exchange rate at the time of refund processing.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Policy Updates</h2>
              <div className="text-gray-600 space-y-3">
                <p>We reserve the right to modify this cancellation and refund policy at any time. Significant changes will be communicated to users via email or platform notifications 30 days before they take effect.</p>
                <p>Continued use of ChronoVue services after policy changes constitutes acceptance of the modified terms.</p>
              </div>
            </section>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
              <h3 className="font-semibold text-blue-900 mb-3">Contact Our Support Team</h3>
              <div className="text-blue-800 space-y-2">
                <p>Email: dhankhar14804@gmail.com</p>
                <p>Response Time: 24-48 business hours</p>
                <p>Business Hours: Monday-Friday, 9:00 AM - 6:00 PM IST</p>
                <p>Include your registered email and transaction details for faster resolution</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
   </>
  );
};

export default CancellationRefundsPage;
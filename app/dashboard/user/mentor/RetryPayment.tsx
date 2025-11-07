"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'

const RetryPayment = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

        const loadRazorpay = () => {
        return new Promise((resolve) => {
            if (typeof window === 'undefined') {
                resolve(false);
                return;
            }

            if ((window as any).Razorpay) {
                resolve(true);
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };


    const handleRetryPayment = async() => {
        setLoading(true);
        try {
            const response = await axios.post('/api/dashboard/mentor/retry-payment');
            const orderData = response.data;
            const razorpayLoaded = await loadRazorpay();
            if (!razorpayLoaded) {
                throw new Error('Failed to load payment gateway');
            }
                        const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
                amount: 49900,
                currency: "INR",
                name: 'Chronovue',
                description: `Retry Mentor Application Payment`,
                order_id: orderData.orderId,
                handler: async function (razorpayResponse: any) {
                    try {
                        const verificationResponse = await axios.post('/api/dashboard/mentor/retry-payment/verify', {
                            razorpay_order_id: razorpayResponse.razorpay_order_id,
                            razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                            razorpay_signature: razorpayResponse.razorpay_signature,
                            paymentId: orderData.paymentId,
                        });

                        const verificationData = verificationResponse.data;

                        Swal.fire({
                            title: "Payment successful!",
                            text: `Payment ID: ${verificationData.paymentId}`,
                            icon: "success",
                        });

                        router.refresh();
                    } catch (error: any) {
                        Swal.fire({
                            title: "Payment verification failed!",
                            text: `Payment verification failed: ${error.response?.data?.error || 'Unknown error'}`,
                            icon: "error",
                        });

                    }
                },
                prefill: {
                    name: '',
                    email: '',
                },
                theme: {
                    color: '#dd6b20',
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                    }
                }
            };

            const razorpay = new (window as any).Razorpay(options);
            razorpay.open();


        } catch (error:any) {
                Swal.fire({
                title: "An error occurred!",
                text: `An error occurred: ${error.response?.data?.error || error.message || 'Please try again.'}`,
                icon: "error",
            });

            
        }finally{
            setLoading(false);
        }
    }
  return (
    (
              <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg border shadow-sm p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Payment Pending
            </h1>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your mentor application has been submitted successfully. We are currently processing your payment.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-yellow-800 text-sm font-medium">
                    Important Notice
                  </p>
                  <p className="text-yellow-700 text-xs mt-1">
                    Your Payment is not completed. If not completed within 24 hours, your application will be automatically rejected.
                  </p>
                  <p className="text-yellow-700 text-xs mt-1 font-bold">
                    and this payment is non-refundable.
                  </p>
                </div>
              </div>
            </div>

            <Button className="w-full" onClick={handleRetryPayment} disabled={loading}>
                {loading ? 'Processing...' : 'Retry Payment'}
            </Button>
            <span className="text-sm text-gray-500 mt-4 block">
              If you have already made the payment, please allow up to 30 minutes for processing.
            </span>
            <span className="mt-4 border-t pt-4 text-sm text-gray-500 block">
              For assistance, contact support at <Link href="mailto:dhankhar14804@gmail.com">dhankhar14804@gmail.com</Link>
            </span>
          </div>
        </div>
      </div>

    )
  )
}

export default RetryPayment
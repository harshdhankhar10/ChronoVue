'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import axios from 'axios';
import Swal from "sweetalert2"
import { useRouter } from 'next/navigation';


interface User {
    credits: number;
}

interface UserProps {
    user: User;
}



const CreditsBuyHomepage = ({ user }: UserProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    const creditPacks = [
        { id: 1, credits: 60, price: 99, popular: false },
        { id: 2, credits: 180, price: 249, popular: true },
        { id: 3, credits: 450, price: 499, popular: false }
    ];

    const features = [
        { id: 1, name: 'Timeline Generation', credits: 5, },
        { id: 2, name: 'AI Insight Generation', credits: 25, },
        { id: 3, name: 'AI Chat Message', credits: 2, },
        { id: 4, name: 'AI Career Predictor', credits: 60, },
        { id: 5, name: 'Skill Gap Analysis', credits: 15, },
        { id: 6, name: 'Progress Predictions', credits: 10, },
        { id: 7, name: 'Market Skills Analysis', credits: 60, },
        { id: 8, name: 'Milestone Generation', credits: 5, },
    ];


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

    const handlePurchase = async (credits: number, amount: number) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/dashboard/credits/buy', {
                credit: credits,
                amount
            });

            const orderData = response.data;

            const razorpayLoaded = await loadRazorpay();
            if (!razorpayLoaded) {
                throw new Error('Failed to load payment gateway');
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount * 100,
                currency: orderData.currency,
                name: 'ChronoVue',
                description: `Total Credits you are purchasing : ${credits} `,
                order_id: orderData.orderId,
                handler: async function (razorpayResponse: any) {
                    try {
                        const verificationResponse = await axios.post('/api/dashboard/credits/verify', {
                            razorpay_order_id: razorpayResponse.razorpay_order_id,
                            razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                            razorpay_signature: razorpayResponse.razorpay_signature,
                            paymentId: orderData.paymentId,
                            creditsAdded: credits
                        });

                        const verificationData = verificationResponse.data;

                        Swal.fire({
                            title: "Payment successful!",
                            text: `Payment successful! Credits added to your account.`,
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
                        router.refresh();
                    }
                }
            };

            const razorpay = new (window as any).Razorpay(options);
            razorpay.open();
        } catch (error: any) {
            Swal.fire({
                title: "An error occurred!",
                text: `An error occurred: ${error.response?.data?.error || error.message || 'Please try again.'}`,
                icon: "error",
            });
        } finally {
            router.refresh();
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Buy Credits
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Unlock powerful AI features to accelerate your growth journey
                    </p>
                    <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-gray-200 max-w-md mx-auto">
                        <div className="text-sm text-gray-500">Your Balance</div>
                        <div className="text-3xl font-bold text-orange-600">{user?.credits || 0} credits</div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {creditPacks.map((pack, index) => (
                        <div
                            key={index}
                            className={`bg-white rounded-2xl p-6 shadow-sm border-2 ${pack.popular
                                ? 'border-orange-500 relative'
                                : 'border-gray-200'
                                }`}
                        >
                            {pack.popular && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                                    Most Popular
                                </div>
                            )}
                            <div className="text-center mb-6">
                                <div className="text-4xl font-bold text-gray-900 mb-2">
                                    {pack.credits}
                                </div>
                                <div className="text-gray-600">credits</div>
                            </div>
                            <div className="text-center mb-6">
                                <div className="text-3xl font-bold text-orange-600 mb-1">
                                    ₹{pack.price}
                                </div>
                                <div className="text-sm text-gray-500">
                                    ₹{(pack.price / pack.credits).toFixed(2)} per credit
                                </div>
                            </div>
                            <Button onClick={() => handlePurchase(pack.credits, pack.price)} className="w-full h-12" disabled={loading}>
                                Buy Now
                            </Button>
                        </div>
                    ))}
                </div>


                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        How Credits Work
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div className="text-gray-900 font-medium">{feature.name}</div>

                                <div className="flex items-center space-x-2">
                                    <span className="text-orange-600 font-bold">{feature.credits}</span>
                                    <span className="text-gray-500 text-sm">credits</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 text-center text-gray-600">
                        <p>Credits never expire. Use them whenever you need AI assistance.</p>
                    </div>
                </div>

                <div className="mt-12 bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">What are credits used for?</h3>
                            <p className="text-gray-600">Credits power our AI features like insights generation, chat assistance, and progress analysis.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Do credits expire?</h3>
                            <p className="text-gray-600">No, your credits never expire. Use them at your own pace.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Can I get a refund?</h3>
                            <p className="text-gray-600"><span className='font-semibold text-primary'>No</span>, We don't offer refunds for unused credits after purchase.</p>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default CreditsBuyHomepage

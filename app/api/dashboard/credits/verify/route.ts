import { NextRequest, NextResponse } from "next/server";
import { currentLoggedInUserInfo } from "@/lib/currentLoggedInUserInfo";
import crypto from "crypto";
import prisma from "@/lib/prisma";


export async function POST(req: NextRequest) {
    try {
        const user = await currentLoggedInUserInfo();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentId, creditsAdded } = await req.json();

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !paymentId) {
            return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
        }

        const key_secret = process.env.RAZORPAY_SECRET as string;
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", key_secret)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
        }

        const payment = await prisma.paymentTransaction.findUnique({
            where: { id: paymentId },
            include: { user: true },
        });

        if (!payment) {
            return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
        }

        if (payment.user.email !== user.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (payment.status === 'COMPLETED') {
            return NextResponse.json({
                message: 'Payment already verified',
            });
        }

            const updatedPayment = await prisma.paymentTransaction.update({
                where: { id: paymentId },
                data: {
                    status: 'COMPLETED',
                    transactionId: razorpay_payment_id,
                },
            });

            await prisma.user.update({
                where: { id: payment.userId },
                data: {
                    credits: {
                        increment: creditsAdded,
                    },
                },
            });

        const updatedUser = await prisma.user.findUnique({
            where: { id: payment.userId },
            select: { credits: true }
        });

        return NextResponse.json({
            message: 'Payment verified successfully',
            credits: updatedUser?.credits
        });

    } catch (error) {
        console.error('Error verifying payment:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
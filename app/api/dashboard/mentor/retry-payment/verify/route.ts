import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";
import prisma from "@/lib/prisma";
import crypto from "crypto";


export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(NEXT_AUTH);
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentId } = await req.json();
        console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentId);

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

        // Get payment record
        const payment = await prisma.paymentTransaction.findUnique({
            where: { id: paymentId },
            include: { user: true },
        });


        if (!payment) {
            return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
        }

        if (payment.user.email !== session.user.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if(payment.status === "COMPLETED"){
            return NextResponse.json({ message: 'Payment already verified' });
        }

        await prisma.$transaction(async (tx) => {

            const updatedPayment = await tx.paymentTransaction.update({
                where: { id: paymentId },
                data: {
                    status: 'COMPLETED',
                    id: razorpay_payment_id,
                    
                },
            });

            await prisma.mentorProfile.update({
                where: { userId: payment.userId },
                data: {
                    paymentStatus: 'COMPLETED',
                },
            });

            await tx.user.update({
                where: { id: payment.userId },
                data: {
                    isMentor: true,
                },
            });
        });


        return NextResponse.json({
            message: 'Payment verified successfully',
            paymentId: razorpay_payment_id,});

    } catch (error) {
        console.error('Error verifying payment:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";
import Razorpay from "razorpay";
const key_id = process.env.RAZORPAY_KEY_ID as string;
const key_secret = process.env.RAZORPAY_SECRET as string;

if (!key_id || !key_secret) {
    throw new Error("Razorpay keys are missing");
}

const razorpay = new Razorpay({
    key_id,
    key_secret
})




export async function POST(req: NextRequest){
    const session = await getServerSession(NEXT_AUTH);
    if(!session){
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const user = await prisma.user.findUnique({
        where: {
            email: session.user?.email || '',
        },
    });
    
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    try {

         const options = {
            amount: 499 * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        }

        const order = await razorpay.orders.create(options);
        const payment = {
            amount: order.amount,
            currency: order.currency,
            status: order.status,
            date: new Date(),
        }

        const py = await prisma.paymentTransaction.create({
            data: {
                transactionId: order.id,
                userId: user.id,
                amount: 499,
                paymentMethod: "RAZORPAY",
                type : "MENTOR_APPLICATION",
                additionalInfo : "Paid Rs.499 for Mentor Application Fee"
            }
        });

        return NextResponse.json({
            message : 'Payment retried successfully',
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            paymentId: py.id

        }, {status: 201})

    } catch (error) {
        console.error("Error in retry-payment route:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
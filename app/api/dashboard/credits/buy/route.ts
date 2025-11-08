import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { currentLoggedInUserInfo } from "@/lib/currentLoggedInUserInfo";
import prisma from "@/lib/prisma";

const key_id = process.env.RAZORPAY_KEY_ID as string;
const key_secret = process.env.RAZORPAY_SECRET as string;

if (!key_id || !key_secret) {
    throw new Error("Razorpay keys are missing");
}

const razorpay = new Razorpay({
    key_id,
    key_secret
})

export type OrderBody = {
    amount: number;
    currency: string;
    credit: number;
}




export async function POST(req: NextRequest){
    const user = await currentLoggedInUserInfo();
    if(!user){
        return NextResponse.json({
            error : "UnAuthorized!"
        }, {status : 401})
    }
    try {
        const {amount, credit}:OrderBody = await req.json();
        if (!amount || !credit ) {
            return NextResponse.json({ message: `Amount is required` }, { status: 400 })
        }

        const currency = "INR";
        let updatedAmount = amount * 100;
        const options = {
            amount: updatedAmount,
            currency,
            receipt: `receipt_${Date.now()}`,
        }

        const order = await razorpay.orders.create(options);
        console.log(order)

        const payment = await prisma.paymentTransaction.create({
            data: {
                userId: user!.id,
                amount: amount, 
                transactionId: order.id,
                type : "BUY_CREDIT",
                paymentMethod : "RAZORPAY",
                additionalInfo : `Purchased ${credit} credits for Rs. ${amount} `,
            },
        });

        return NextResponse.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            paymentId: payment!.id,
        }, { status: 200 });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error : "Internal Server Error"
        }, {status : 500})
    }
}
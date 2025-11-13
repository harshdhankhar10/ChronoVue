import { NextRequest, NextResponse } from "next/server";
import { currentLoggedInUserInfo } from "@/lib/currentLoggedInUserInfo";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { sendMail } from "@/utils/mail";
import { formatDate } from "@/utils/formatDate";

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

        await prisma.notification.create({
            data: {
                userId: user.id,
                type : "INFO",
                message: `Your purchase of ${creditsAdded} ChronoVue AI Credits was successful!`,
                title: `Purchase Successful of ${updatedPayment.currency}${updatedPayment.amount}`,
            }
        })

        const subject = 'Thank you for your purchase! Here is your ChronoVue invoice';
        const to = user.email;
        const htmlContent = `
            <!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
    <!--[if mso]>
    <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
    <style>
        td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
    </style>
    <![endif]-->
    <title>Your ChronoVue Invoice</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Rajdhani:wght@700&display=swap" rel="stylesheet" media="screen">
    <style>
        .hover-text-orange-700:hover {
            color: #c2410c !important;
        }
        @media (max-width: 600px) {
            .sm-w-full {
                width: 100% !important;
            }
            .sm-px-6 {
                padding-left: 24px !important;
                padding-right: 24px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; width: 100%; padding: 0; word-break: break-word; -webkit-font-smoothing: antialiased; background-color: #f8fafc;">
    <div style="display: none;">
        Your invoice from ChronoVue for your recent credit purchase.
        &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &zwnj;
        &#160;
    </div>
    <div role="article" aria-roledescription="email" aria-label="Your ChronoVue Invoice" lang="en">
        <table style="width: 100%; font-family: 'Poppins', sans-serif;" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
                <td align="center" style="background-color: #f8fafc; padding-top: 24px; padding-bottom: 24px;">
                    <table class="sm-w-full" style="width: 600px;" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                            <td align="center" class="sm-px-6" style="padding: 24px;">
                                <a href="https://chronovue.com" style="text-decoration: none; color: #1e293b;">
                                    <h1 style="font-family: 'Rajdhani', sans-serif; font-size: 24px; font-weight: 700; margin: 0;">ChronoVue</h1>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td class="sm-px-6">
                                <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                                    <tr>
                                        <td style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.05); padding: 48px;">
                                            <h2 style="margin: 0; font-family: 'Rajdhani', sans-serif; font-size: 28px; font-weight: 700; color: #1e293b; text-align: center;">
                                                Thank You For Your Purchase!
                                            </h2>
                                            <p style="margin: 24px 0; font-size: 16px; line-height: 26px; color: #334155; text-align: center;">
                                                Hi ${user.fullName} , here is your invoice for your recent purchase of ChronoVue AI Credits.
                                            </p>
                                            
                                            <!-- Invoice Details -->
                                            <table style="width: 100%; margin-top: 32px; border-bottom: 1px solid #e2e8f0; padding-bottom: 16px;" cellpadding="0" cellspacing="0" role="presentation">
                                                <tr>
                                                    <td style="font-size: 14px; color: #64748b;">Invoice ID</td>
                                                    <td style="font-size: 14px; color: #1e293b; font-weight: 500; text-align: right;">INV-${updatedPayment.id.toUpperCase()}</td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-top: 8px; font-size: 14px; color: #64748b;">Date</td>
                                                    <td style="padding-top: 8px; font-size: 14px; color: #1e293b; font-weight: 500; text-align: right;">${formatDate(updatedPayment.createdAt)}</td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-top: 8px; font-size: 14px; color: #64748b;">Bill To</td>
                                                    <td style="padding-top: 8px; font-size: 14px; color: #1e293b; font-weight: 500; text-align: right;">${user.fullName} (${user.email})</td>
                                                </tr>
                                            </table>

                                            <!-- Itemized List -->
                                            <table style="width: 100%; margin-top: 24px;" cellpadding="0" cellspacing="0" role="presentation">
                                                <thead>
                                                    <tr>
                                                        <th style="padding-bottom: 12px; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; text-align: left;">Description</th>
                                                        <th style="padding-bottom: 12px; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; text-align: right;">Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td style="padding: 12px 0; font-size: 14px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">ChronoVue AI Credits (${creditsAdded} Pack)</td>
                                                        <td style="padding: 12px 0; font-size: 14px; color: #1e293b; font-weight: 600; text-align: right; border-bottom: 1px solid #e2e8f0;">${updatedPayment.currency}${updatedPayment.amount}</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <!-- Summary -->
                                            <table style="width: 100%; margin-top: 24px;" cellpadding="0" cellspacing="0" role="presentation">
                                                <tr>
                                                    <td style="padding: 4px 0; font-size: 14px; color: #64748b;">Subtotal</td>
                                                    <td style="padding: 4px 0; font-size: 14px; color: #1e293b; text-align: right;">${updatedPayment.currency}${updatedPayment.amount}</td>
                                                </tr>
                                                 <tr>
                                                    <td style="padding: 4px 0; font-size: 14px; color: #64748b;">Taxes (0%)</td>
                                                    <td style="padding: 4px 0; font-size: 14px; color: #1e293b; text-align: right;">${updatedPayment.currency}0.00</td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 12px 0; font-size: 16px; color: #1e293b; font-weight: 600; border-top: 2px solid #e2e8f0;">Total Paid</td>
                                                    <td style="padding: 12px 0; font-size: 16px; color: #ea580c; font-weight: 700; text-align: right; border-top: 2px solid #e2e8f0;">${updatedPayment.currency}${updatedPayment.amount}</td>
                                                </tr>
                                            </table>
                                            
                                            <p style="margin: 24px 0 0; font-size: 14px; line-height: 24px; color: #475569; text-align: center;">
                                                Paid with Razorpay ending in 1234. You can view this invoice and your full billing history in your account settings.
                                            </p>

                                            <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                                                <tr>
                                                    <td style="padding-top: 32px; border-bottom: 1px solid #e2e8f0;"></td>
                                                </tr>
                                            </table>

                                            <p style="margin: 24px 0 0; font-size: 14px; color: #64748b; text-align: center;">
                                                Thank you for using ChronoVue!
                                                <br><strong>The ChronoVue Team</strong>
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td class="sm-px-6" style="padding: 32px; text-align: center; font-size: 12px; color: #64748b;">
                                <p style="margin: 0 0 8px;">&copy; ${new Date().getFullYear()} ChronoVue. All rights reserved.</p>
                                <p style="margin-top: 8px;">
                                    <a href="https://chronovue.in/dashboard/user/settings/transactions-history?page=1" class="hover-text-orange-700" style="color: #ea580c; text-decoration: none;">Billing History</a> &bull; 
                                    <a href="https://chronovue.in/contact" class="hover-text-orange-700" style="color: #ea580c; text-decoration: none;">Help Center</a>
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>
        `

        await sendMail({
            email: user.email,
            to,
            subject,
            htmlContent
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
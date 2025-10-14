import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendMail } from "@/utils/mail";

let otp = Math.floor(100000 + Math.random() * 900000).toString();
let otpExpiry = new Date(Date.now() + 10 * 60 * 1000);


let otpData = {
    otp,
    expiry: otpExpiry.toISOString(),
}



export async function POST(req: NextRequest) {
    try {
        const { email, communityId } = await req.json();
        if (!email || email.trim() === '') {
            return NextResponse.json({ errror: "Email is Required" }, { status: 400 })
        }

        const community = await prisma.communitySpace.findUnique({
            where: { id: communityId }
        })

        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!community) {
            return NextResponse.json({ error: "Community Not Found" }, { status: 404 })
        }

        const subject = "OTP For Community Space Verification - ChronoVue";
        const to = email;
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
    <title>Verify Your New Community</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Rajdhani:wght@700&display=swap" rel="stylesheet" media="screen">
    <style>
        .hover-bg-orange-700:hover {
            background-color: #c2410c !important;
        }
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
    <div role="article" aria-roledescription="email" aria-label="Verify Your New Community" lang="en">
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
                                                Confirm Your New Community
                                            </h2>
                                            <p style="margin: 24px 0; font-size: 16px; line-height: 26px; color: #334155; text-align: center;">
                                                Hi ${user?.fullName}, you're just one step away from launching your new community, <strong>"${community?.name}"</strong>. Click the button below to verify this action and officially create your space.
                                            </p>
                                            
                                            <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                                                 <tr>
                                                    <td align="center" style="padding: 20px 0; text-align: center;">
                                                        <table cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: separate;">
                                                            <tr style="text-align: center;">
                                                                <td class="hover-bg-orange-700" align="center" style="background-color: #ea580c; border-radius: 8px;">
                                                                    <span style="display: inline-block; padding: 12px 24px; font-family: 'Poppins', sans-serif; font-size: 24px; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600;">
                                                                        ${otpData.otp}
                                                                    </span>
                
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>

                                            <p style="margin: 24px 0 0; font-size: 14px; line-height: 24px; color: #475569; text-align: center;">
                                                This verification code is valid for the next <strong>10 minutes</strong>. If you did not request to create a community, you can safely ignore this email.
                                            </p>

                                            <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                                                <tr>
                                                    <td style="padding-top: 32px; border-bottom: 1px solid #e2e8f0;"></td>
                                                </tr>
                                            </table>

                                            <p style="margin: 24px 0 0; font-size: 14px; color: #64748b; text-align: center;">
                                                Cheers,
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
                                    <a href="#" class="hover-text-orange-700" style="color: #ea580c; text-decoration: none;">Unsubscribe</a> &bull; 
                                    <a href="#" class="hover-text-orange-700" style="color: #ea580c; text-decoration: none;">Help Center</a>
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

        await sendMail({ to, subject, htmlContent })
        return NextResponse.json({ message: "We have sent you an OTP to verify your Community" }, { status: 201 });

    } catch (error) {
        console.log(Error)
        return NextResponse.json({
            error: "Error sending email"
        }, { status: 404 })

    }
}


export async function PATCH(req: NextRequest) {
    try {
        const { otp, communityId } = await req.json();

        if (!communityId) {
            return NextResponse.json({ error: "Community ID is required" }, { status: 400 });
        }
        if (!otp) {
            return NextResponse.json({ error: "ALL Fields Required!" }, { status: 404 })
        }

        const currentTime = new Date();
        const community = await prisma.communitySpace.findUnique({
            where: { id: communityId }
        });

        if (community && community.isVerified) {
            return NextResponse.json({ message: "This Community is already verified" }, { status: 200 });
        }
        if (otp === otpData.otp && community && !community.isVerified) {
            await prisma.communitySpace.update({
                where: { id: communityId },
                data: { isVerified: true },
            });
            const expiryTime = new Date(otpData.expiry);
            if (currentTime < expiryTime) {

                return NextResponse.json({ message: "Your Community has been verified successfully" }, { status: 201 });
            } else {
                return NextResponse.json({ error: "The OTP You entered has expired" }, { status: 400 });
            }
        } else {
            return NextResponse.json({ error: "Your OTP is incorrect" }, { status: 400 });
        }


    } catch (error) {
        console.error("Error verifying OTP:", error);
        return NextResponse.json({ error: "Error verifying OTP" }, { status: 500 });

    }
}
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
        const { email } = await req.json();
        if (!email || email.trim() === '') {
            return NextResponse.json({ errror: "Email is Required" }, { status: 400 })
        }

        const isEmailExists = await prisma.user.findUnique({
            where: { email }
        })
        if (!isEmailExists) {
            return NextResponse.json({ error: "Email Not Exists. Use another Email." }, { status: 400 });
        }

        if (isEmailExists.isVerified) {
            return NextResponse.json({ message: "Account Already Verified." }, { status: 201 })
        }

        const subject = "OTP For Account Verification - ChronoVue";
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
    <title>Verify Your Email Address</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Rajdhani:wght@700&display=swap" rel="stylesheet" media="screen">
    <style>
        .hover-bg-teal-dark:hover {
            background-color: #16a085 !important;
        }
        .hover-text-teal-dark:hover {
            color: #16a085 !important;
        }
        @media (max-width: 600px) {
            .sm-w-full {
                width: 100% !important;
            }
            .sm-px-6 {
                padding-left: 24px !important;
                padding-right: 24px !important;
            }
            .sm-py-8 {
                padding-top: 32px !important;
                padding-bottom: 32px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; width: 100%; padding: 0; word-break: break-word; -webkit-font-smoothing: antialiased; background-color: #f7f8fa;">
    <div style="display: none;">
        Your ChronoVue verification code is here!
        &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &zwnj;
        &#160;
    </div>
    <div role="article" aria-roledescription="email" aria-label="Verify Your Email Address" lang="en">
        <table style="width: 100%; font-family: 'Poppins', sans-serif;" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
                <td align="center" style="background-color: #f7f8fa; padding-top: 24px; padding-bottom: 24px;">
                    <table class="sm-w-full" style="width: 600px;" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                            <td align="center" class="sm-px-6" style="padding: 24px;">
                                <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                                    <tr>
                                        <td align="center">
                                            <a href="#">
                                                <img src="/final_logo.png" width="44" alt="ChronoVue Logo" style="border: 0; max-width: 100%; vertical-align: middle; line-height: 100%;">
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td class="sm-px-6">
                                <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                                    <tr>
                                        <td style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.05); padding: 48px;">
                                            <h1 style="margin: 0; font-family: 'Rajdhani', sans-serif; font-size: 30px; font-weight: 700; color: #111827; text-align: center;">
                                                Confirm Your Identity
                                            </h1>
                                            <p style="margin: 24px 0; font-size: 16px; line-height: 26px; color: #374151; text-align: center;">
                                                Please use the following verification code to complete your sign-up process. This code is valid for the next 10 minutes.
                                            </p>
                                            
                                            <!-- OTP Code -->
                                            <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                                                <tr>
                                                    <td align="center" style="padding: 20px 0;">
                                                        <div style="background-color: #f3f4f6; border-radius: 8px; padding: 20px 24px;">
                                                            <p style="margin: 0; letter-spacing: 10px; font-family: 'Poppins', sans-serif; font-size: 40px; font-weight: 700; color: #2C3E50; line-height: 1;">
                                                                ${otp}
                                                            </p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>

                                            <p style="margin: 24px 0 0; font-size: 16px; line-height: 26px; color: #374151; text-align: center;">
                                                If you didn't request this code, you can safely ignore this email. Someone may have typed your email address by mistake.
                                            </p>

                                            <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                                                <tr>
                                                    <td style="padding-top: 32px; border-bottom: 1px solid #e5e7eb;"></td>
                                                </tr>
                                            </table>

                                            <p style="margin: 24px 0 0; font-size: 14px; color: #6b7280; text-align: center;">
                                                Thanks for joining us,
                                                <br><strong>The ChronoVue Team</strong>
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td class="sm-px-6" style="padding: 32px; text-align: center; font-size: 12px; color: #6b7280;">
                               
                                <p style="margin: 0 0 8px;">&copy; ${new Date().getFullYear()} ChronoVue. All rights reserved.</p>

                                <p style="margin-top: 8px;">
                                    <a href="#" class="hover-text-teal-dark" style="color: #1ABC9C; text-decoration: none;">Unsubscribe</a> &bull; 
                                    <a href="#" class="hover-text-teal-dark" style="color: #1ABC9C; text-decoration: none;">Help Center</a>
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
        return NextResponse.json({ message: "We have sent you an OTP to verify your account" }, { status: 201 });

    } catch (error) {
        console.log(Error)
        return NextResponse.json({
            error: "Error sending email"
        }, { status: 404 })

    }
}


export async function PATCH(req: NextRequest) {
    try {
        const { email, otp } = await req.json();
        if (!email || !otp) {
            return NextResponse.json({ error: "ALL Fields Required!" }, { status: 404 })
        }

        const currentTime = new Date();

        if (email === email && otpData.otp === otp) {
            const expiryTime = new Date(otpData.expiry);
            if (currentTime < expiryTime) {
                await prisma.user.update({
                    where: { email },
                    data: { isVerified: true, status: 'ACTIVE' },
                });
                return NextResponse.json({ message: "Your account has been verified successfully" }, { status: 201 });
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
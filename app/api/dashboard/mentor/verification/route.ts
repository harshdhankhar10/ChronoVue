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

        const subject = "OTP For Mentor Verification on ChronoVue";
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
    <title>Verify Your Account for Applying as Mentor</title>
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
        Verify your account to apply as a mentor on ChronoVue.
        &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &zwnj;
        &#160;
    </div>
    <div role="article" aria-roledescription="email" aria-label="Verify Your Mentor Connection Request" lang="en">
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
                                                Verify Your Mentor Application
                                            </h2>
                                            <p style="margin: 24px 0; font-size: 16px; line-height: 26px; color: #334155; text-align: center;">
                                                Hi ${isEmailExists?.fullName}, you requested to apply as a mentor on ChronoVue. To ensure this request was made by you, please use the verification code below.
                                            </p>
                                            
                                            <!-- OTP Code -->
                                            <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                                                <tr>
                                                    <td align="center" style="padding: 20px 0;">
                                                        <div style="background-color: #fff7ed; border: 1px dashed #fed7aa; border-radius: 8px; padding: 20px 24px;">
                                                            <p style="margin: 0; letter-spacing: 10px; font-family: 'Poppins', sans-serif; font-size: 40px; font-weight: 700; color: #ea580c; line-height: 1;">
                                                                ${otpData.otp}
                                                            </p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>

                                             <p style="margin: 24px 0 0; font-size: 14px; line-height: 24px; color: #475569; text-align: center;">
                                                Enter this code in the ChronoVue app or website to confirm your mentor application. This code will expire in 10 minutes.
                                            </p>
                                            <p style="margin: 16px 0 0; font-size: 14px; line-height: 24px; color: #475569; text-align: center;">
                                                If you didn't request this application, please ignore this email. Your account security is important to us.
                                            </p>

                                            <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                                                <tr>
                                                    <td style="padding-top: 32px; border-bottom: 1px solid #e2e8f0;"></td>
                                                </tr>
                                            </table>

                                            <p style="margin: 24px 0 0; font-size: 14px; color: #64748b; text-align: center;">
                                                Best regards,
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
                                    <a href="#" class="hover-text-orange-700" style="color: #ea580c; text-decoration: none;">Help Center</a> &bull; 
                                    <a href="#" class="hover-text-orange-700" style="color: #ea580c; text-decoration: none;">Account Settings</a>
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
        return NextResponse.json({ message: "OTP sent to your email successfully" }, { status: 200 });

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
                return NextResponse.json({ message: "OTP Verified Successfully" }, { status: 201 });
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
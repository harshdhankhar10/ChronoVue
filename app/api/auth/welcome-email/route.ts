import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/utils/mail";

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json()

        const subject = "👋 Welcome to ChronoVue — Your Future, Visualized";
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
    <title>👋 Welcome to ChronoVue — Your Future, Visualized</title>
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
            .sm-leading-8 {
                line-height: 32px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; width: 100%; padding: 0; word-break: break-word; -webkit-font-smoothing: antialiased; background-color: #f7f8fa;">
    <div style="display: none;">
        Welcome to ChronoVue! Your journey to achieving your goals starts now.
        &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &zwnj;
        &#160;
    </div>
    <div role="article" aria-roledescription="email" aria-label="Welcome to ChronoVue!" lang="en">
        <table style="width: 100%; font-family: 'Poppins', sans-serif;" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
                <td align="center" style="background-color: #f7f8fa; padding-top: 24px; padding-bottom: 24px;">
                    <table class="sm-w-full" style="width: 600px;" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                            <td class="sm-px-6" style="padding: 0 24px;">
                                <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                                    <tr>
                                        <td style="background: linear-gradient(90deg, #2C3E50 0%, #465a70 100%); border-radius: 12px 12px 0 0; padding: 32px 48px;">
                                            <h1 style="margin: 0; font-family: 'Rajdhani', sans-serif; font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: 1px; text-align: center;">
                                                ChronoVue
                                            </h1>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="background-color: #ffffff; border-radius: 0 0 12px 12px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05); padding: 48px;">
                                            <h2 class="sm-leading-8" style="margin: 0; font-family: 'Rajdhani', sans-serif; font-size: 30px; font-weight: 700; color: #111827; text-align: center;">
                                               Your Timeline to Success Starts Now
                                            </h2>
                                            <p style="margin: 24px 0; font-size: 16px; line-height: 26px; color: #374151; text-align: center;">
                                                Hi , we're thrilled to have you. ChronoVue helps you transform your goals into a clear, visual timeline. Your journey to the future starts today.
                                            </p>
                                            <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                                                 <tr>
                                                    <td align="center" style="padding: 16px 0; text-align: center;">
                                                        <table cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: separate;">
                                                            <tr>
                                                                <td class="hover-bg-teal-dark" align="center" style="background-color: #1ABC9C; border-radius: 8px;">
                                                                    <a href="https://chronovue.com/dashboard" style="padding: 16px 32px; font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; display: inline-block;">
                                                                        Create Your First Timeline
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            
                                            <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                                                <tr><td style="padding-top: 24px; border-bottom: 1px solid #e5e7eb;"></td></tr>
                                            </table>

                                            <h3 style="margin: 32px 0 16px; font-family: 'Rajdhani', sans-serif; font-size: 20px; font-weight: 700; color: #111827; text-align: center;">
                                                What's inside for you?
                                            </h3>

                                            <!-- Feature List -->
                                            <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                                                <tr>
                                                    <td style="width: 28px; padding-right: 12px; vertical-align: top; font-size: 24px; color: #1ABC9C;">&rarr;</td>
                                                    <td style="vertical-align: top;">
                                                        <p style="margin: 0 0 4px; font-size: 16px; font-weight: 600; color: #111827;">AI-Powered Timelines</p>
                                                        <p style="margin: 0; font-size: 14px; color: #6b7280; line-height: 22px;">Instantly map your 1–5 year future with intelligent suggestions and risk analysis.</p>
                                                    </td>
                                                </tr>
                                                <tr><td style="height: 16px;"></td></tr>
                                                <tr>
                                                    <td style="width: 28px; padding-right: 12px; vertical-align: top; font-size: 24px; color: #1ABC9C;">&rarr;</td>
                                                    <td style="vertical-align: top;">
                                                        <p style="margin: 0 0 4px; font-size: 16px; font-weight: 600; color: #111827;">Smart Milestones</p>
                                                        <p style="margin: 0; font-size: 14px; color: #6b7280; line-height: 22px;">Track progress with automated checkpoints and celebrate every win.</p>
                                                    </td>
                                                </tr>
                                                <tr><td style="height: 16px;"></td></tr>
                                                <tr>
                                                    <td style="width: 28px; padding-right: 12px; vertical-align: top; font-size: 24px; color: #1ABC9C;">&rarr;</td>
                                                    <td style="vertical-align: top;">
                                                        <p style="margin: 0 0 4px; font-size: 16px; font-weight: 600; color: #111827;">Scenario Simulation</p>
                                                        <p style="margin: 0; font-size: 14px; color: #6b7280; line-height: 22px;">Explore multiple "what-if" outcomes to make the best decisions for your future.</p>
                                                    </td>
                                                </tr>
                                            </table>

                                            <p style="margin: 32px 0 0; font-size: 14px; color: #6b7280; text-align: center;">
                                                We can't wait to see what you achieve. If you need anything, just reply to this email!
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td class="sm-px-6" style="padding: 32px; text-align: center; font-size: 12px; color: #6b7280;">
                                <p style="margin: 0 0 16px;">
                                    <a href="#" class="hover-text-teal-dark" style="color: #6b7280; text-decoration: none; padding: 0 8px;">Twitter</a> &bull;
                                    <a href="#" class="hover-text-teal-dark" style="color: #6b7280; text-decoration: none; padding: 0 8px;">LinkedIn</a> &bull;
                                    <a href="#" class="hover-text-teal-dark" style="color: #6b7280; text-decoration: none; padding: 0 8px;">Help Center</a>
                                </p>
                                <p style="margin: 0 0 8px;">&copy; 2025 ChronoVue. All rights reserved.</p>
                                <p style="margin-top: 8px;">
                                    <a href="#" class="hover-text-teal-dark" style="color: #1ABC9C; text-decoration: none;">Unsubscribe</a>
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

        await sendMail({ to, email, htmlContent, subject })
        return NextResponse.json({ message: "Welcome Mail Sent Sucessfully!" }, { status: 201 });


    } catch (error) {

    }
}
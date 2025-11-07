import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";
import { sendMail } from "@/utils/mail";


export async function POST(req: NextRequest){
    const session = await getServerSession(NEXT_AUTH);
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const user = await prisma.user.findUnique({ where: { email: session.user.email! } });
    if (!user || user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        const { mentorId, action, userId, additionalInfo } = await req.json();
    
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        if(action === 'APPROVE'){
            await prisma.mentorProfile.update({
                where: { id: mentorId },
                data: {
                    isVerified: true,
                    isActive: true
                }
            })
            await prisma.notification.create({
                data : {
                    userId: userId,
                    title: 'Mentor Application Approved',
                    message: 'Your mentor application has been approved. You can now start making an impact.',
                }
            })
            await prisma.user.update({
                where: { id: userId },
                data: {
                    isMentor: true
                }
            })
            const subject = "Congratulations! Your Mentor Application has been Approved";
            const to = user.email;
            const email = user.email;
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
    <title>Congratulations! You're a Verified ChronoVue Mentor</title>
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
            .sm-leading-8 { line-height: 32px !important; }
        }
    </style>
</head>
<body style="margin: 0; width: 100%; padding: 0; word-break: break-word; -webkit-font-smoothing: antialiased; background-color: #f7f8fa;">
    <div style="display: none;">
        Welcome to the ChronoVue Mentor Network! Your application has been approved. Start making an impact today.
        &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &zwnj;
        &#160;
    </div>
    <div role="article" aria-roledescription="email" aria-label="Welcome Mentor!" lang="en">
        <table style="width: 100%; font-family: 'Poppins', sans-serif;" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
                <td align="center" style="background-color: #f7f8fa; padding-top: 24px; padding-bottom: 24px;">
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
                                            <h2 class="sm-leading-8" style="margin: 0; font-family: 'Rajdhani', sans-serif; font-size: 30px; font-weight: 700; color: #1e293b; text-align: center;">
                                                Welcome to the Mentor Network!
                                            </h2>
                                            <p style="margin: 24px 0; font-size: 16px; line-height: 26px; color: #334155; text-align: center;">
                                                Hi ${user.fullName || 'Mentor'}, we're thrilled to inform you that your mentor application has been approved. Congratulations and welcome aboard! Your profile is now visible to users seeking guidance.
                                            </p>

                                            <!-- What You Can Do Section -->
                                            <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                                                <tr>
                                                    <td style="padding: 24px 0;">
                                                        <table style="width: 100%; background-color: #fff7ed; border: 1px solid #fed7aa; border-radius: 8px; padding: 24px;" cellpadding="0" cellspacing="0" role="presentation">
                                                            <tr>
                                                                <td style="font-size: 18px; font-weight: 600; color: #9a3412; padding-bottom: 16px; text-align: center;">
                                                                    Start Making an Impact:
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="font-size: 14px; line-height: 22px; color: #7c2d12;">
                                                                    <ul style="margin: 0; padding-left: 20px; list-style-type: disc;">
                                                                        <li style="margin-bottom: 10px;"><strong>Manage Your Profile & Availability:</strong> Access your Mentor Dashboard to keep your information up-to-date and set when you're available to connect.</li>
                                                                        <li style="margin-bottom: 10px;"><strong>Connect with Mentees:</strong> Review connection requests from users who are inspired by your expertise and journey.</li>
                                                                        <li style="margin-bottom: 0px;"><strong>Share Your Wisdom:</strong> Provide valuable guidance on timelines, milestones, and career paths to help others achieve their goals.</li>
                                                                    </ul>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            
                                            <!-- Button -->
                                            <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                                                 <tr>
                                                    <td align="center" style="padding: 16px 0; text-align: center;">
                                                        <table cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: separate;">
                                                            <tr>
                                                                <td class="hover-bg-orange-700" align="center" style="background-color: #ea580c; border-radius: 8px;">
                                                                    <a href="[Link_To_Mentor_Dashboard]" style="padding: 16px 32px; font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; display: inline-block;">
                                                                        Go to Your Mentor Dashboard
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>

                                            <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                                                <tr>
                                                    <td style="padding-top: 24px; border-bottom: 1px solid #e2e8f0;"></td>
                                                </tr>
                                            </table>

                                            <p style="margin: 24px 0 0; font-size: 14px; color: #64748b; text-align: center;">
                                                Thank you for joining our community of mentors!
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

            await sendMail({ to,email, subject, htmlContent });

            return NextResponse.json({ message: 'Mentor application approved and user notified.' }, { status: 201 });
        }
        if(action === 'REJECT'){
            await prisma.mentorProfile.update({
                where: { id: mentorId },
                data : {
                    isActive : false,
                    isVerified : false,
                    reasonForNotVerification: {
                        reason: additionalInfo?.reason || 'Not specified',
                        details: additionalInfo?.details || '',
                        dateOfRejection: new Date().toISOString().split('T')[0]
                    }
                }
            })
            await prisma.notification.create({
                data : {
                    userId: userId,
                    title: 'Mentor Application Rejected',
                    message: 'Your mentor application has been rejected. You can reapply after 21 days.',
                }
            })

            const subject = "Sorry, Your Mentor Application has been Rejected - ChronoVue";
            const to = user.email;
            const email = user.email;
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
    <title>Update on Your ChronoVue Mentor Application</title>
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
            .sm-leading-8 { line-height: 32px !important; }
        }
    </style>
</head>
<body style="margin: 0; width: 100%; padding: 0; word-break: break-word; -webkit-font-smoothing: antialiased; background-color: #f7f8fa;">
    <div style="display: none;">
        An update regarding your application to join the ChronoVue Mentor Network.
        &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &#847; &zwnj;
        &#160;
    </div>
    <div role="article" aria-roledescription="email" aria-label="Mentor Application Update" lang="en">
        <table style="width: 100%; font-family: 'Poppins', sans-serif;" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
                <td align="center" style="background-color: #f7f8fa; padding-top: 24px; padding-bottom: 24px;">
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
                                            <h2 class="sm-leading-8" style="margin: 0; font-family: 'Rajdhani', sans-serif; font-size: 30px; font-weight: 700; color: #1e293b; text-align: center;">
                                                Update on Your Mentor Application
                                            </h2>
                                            <p style="margin: 24px 0; font-size: 16px; line-height: 26px; color: #334155; text-align: center;">
                                                Hi ${user.fullName}, thank you for your interest in becoming a mentor on ChronoVue and for taking the time to apply.
                                            </p>
                                            <p style="margin: 16px 0; font-size: 16px; line-height: 26px; color: #334155; text-align: center;">
                                                After careful review, we regret to inform you that we are unable to approve your application at this time. We received many applications, and the selection process was highly competitive.
                                            </p>

                                            <!-- Rejection Details Section -->
                                            <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                                                <tr>
                                                    <td style="padding: 24px 0;">
                                                        <table style="width: 100%; background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 24px;" cellpadding="0" cellspacing="0" role="presentation">
                                                            <tr>
                                                                <td style="font-size: 16px; font-weight: 600; color: #991b1b; padding-bottom: 16px; border-bottom: 1px solid #fee2e2;">
                                                                    Application Review Details (Date: ${new Date().toISOString().split('T')[0]})
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="padding-top: 16px; font-size: 14px; line-height: 22px; color: #7f1d1d;">
                                                                    <p style="margin: 0 0 10px;"><strong>Reason for Rejection:</strong> 
                                                                            ${additionalInfo?.reason || 'Not specified'}</p>                                                    
                                                                    <p style="margin: 0 0 10px;"><strong>
                                                                    Details:</strong> ${additionalInfo?.details || 'Not specified'}</p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                            <span style="font-size: 16px; line-height: 26px; color: #334155; text-align: center;">
                                             You will be eligible to reapply after 21 days from the date of this notification.
                                            </span>
                                            
                                            <p style="margin: 16px 0; font-size: 16px; line-height: 26px; color: #334155; text-align: center;">
                                                We encourage you to update your profile with any new experience or details and consider reapplying in the future if circumstances change.
                                            </p>

                                            <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                                                <tr>
                                                    <td style="padding-top: 24px; border-bottom: 1px solid #e2e8f0;"></td>
                                                </tr>
                                            </table>

                                            <p style="margin: 24px 0 0; font-size: 14px; color: #64748b; text-align: center;">
                                                We appreciate your interest in contributing to the ChronoVue community.
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

            `;
            await sendMail({ to,email, subject, htmlContent });

            return NextResponse.json({ message: 'Mentor application rejected and user notified.' }, { status: 201 });
        }

        
    } catch (error) {
        console.error("Error processing mentor application action:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
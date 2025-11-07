import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";

export async function POST(req: NextRequest){
    const session = await getServerSession(NEXT_AUTH);
    if(!session){
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }
    
    const user = await prisma.user.findUnique({
        where: {
            email: session.user?.email,
        },
    });

    if(!user){
        return NextResponse.json({error: "User not found"}, {status: 404});
    }

    try {
        const { formData } = await req.json();
        if(!formData){
            return NextResponse.json({error: "Invalid form data"}, {status: 400});
        }

        if(user.isMentor){
            return NextResponse.json(
                { error: "You have already applied or are registered as a mentor." }, 
                { status: 400 }
            );
        }

       await prisma.mentorProfile.create({
            data: {
                userId: user.id,
                
                bio: formData.bio,
                expertise: formData.expertise,
                experienceYears: formData.experienceYears,
                timezone: formData.timezone,
                
                availabilitySlots: formData.availabilitySlots,
                currentJob: formData.currentJob,
                pastJobs: formData.pastJobs,
                
                socialProfiles: formData.socialProfiles,
                
                technicalSkills: formData.technicalSkills,
                softSkills: formData.softSkills,
                certifications: formData.certifications,
                specializations: formData.specializations,
                
                mentoringCategories: formData.mentoringCategories,
                targetAudiences: formData.targetAudiences,
                sessionTypesOffered: formData.sessionTypesOffered,
                
                rate: formData.rate,
                currency: formData.currency,
                
                applicationQuestions: formData.applicationQuestions,
                
                isAgreedToTerms: formData.isAgreedToTerms,
                codeOfConductAgreement: formData.codeOfConductAgreement,
                backgroundCheckAgreement: formData.backgroundCheckAgreement,
                
            }
        });

        await prisma.notification.create({
            data : {
                userId: user.id,
                title: 'Mentor Application Submitted',
                message: 'We have received your mentor application successfully. You can expect a response from us within 5-7 business days regarding the next steps in the process.',
            }
        })

        return NextResponse.json(
            { 
                message: "We have received your mentor application successfully. You can expect a response from us within 5-7 business days regarding the next steps in the process.",
            }, 
            { status: 201 }
        );

    } catch (error) {
        console.log("Error submitting mentor application:", error);
        return NextResponse.json(
            { error: "Internal Server Error" }, 
            { status: 500 }
        );
    }
}
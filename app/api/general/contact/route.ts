import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest){
    try {
        const {name, email, message, category, priority, subject} = await req.json();

        if(!name || !email || !message || !category || !priority || !subject){
            return NextResponse.json({error: "All fields are required"}, {status: 400});
        }

        if(!name.trim() || !email.trim() || !message.trim() || !category.trim() || !priority.trim() || !subject.trim()){
            return NextResponse.json({error: "Fields cannot be empty"}, {status: 400});
        }

        await prisma.contactUs.create({
            data: {
                fullName: name,
                email,
                message,
                category,
                priority,
                subject
            }   
        });
        
        return NextResponse.json({message: "Contact request submitted successfully"}, {status: 201});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
    }
}
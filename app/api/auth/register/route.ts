import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const { fullName, email, password, username } = await req.json();

        if (username.trim() === '' || password.trim() === '' || email.trim() === '' || fullName.trim() === '') {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        if (!email.endsWith('@gmail.com') && !email.endsWith('@zohomail.in')) {
            return NextResponse.json({ error: 'Only Gmail and Zoho Mail addresses are allowed' }, { status: 400 });
        }

        if (password.length < 8) {
            return NextResponse.json({ error: 'Password must be at least 8 characters long' }, { status: 400 });
        }

        if (username.length < 3) {
            return NextResponse.json({ error: 'Username must be at least 3 characters long' }, { status: 400 });
        }
        if (fullName.length < 3) {
            return NextResponse.json({ error: 'Full name must be at least 3 characters long' }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
        }

        const existingUsername = await prisma.user.findUnique({ where: { username } });
        if (existingUsername) {
            return NextResponse.json({ error: 'Username already taken! Please choose another one.' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                fullName,
                email,
                password: hashedPassword,
                username,
            },
        });

        return NextResponse.json({ message: 'You have registered successfully. Please verify your email to continue.' }, { status: 201 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import {currentLoggedInUserInfo} from "@/lib/currentLoggedInUserInfo"

export async function PATCH(){
    const user = await currentLoggedInUserInfo();
    if(!user){
        return (
            NextResponse.json({
                error : "UnAuthorized!"
            }, {status : 400})
        )
    }
    try {
      
        await prisma.notification.updateMany({
            where : {
                userId : user.id
            },
            data : {
                isRead : true
            }
        })

        return NextResponse.json({
            message : "Notifications Marked as read."
        }, {status : 200})
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error : "Internal Server Error"
        }, {status : 404})
    }
}
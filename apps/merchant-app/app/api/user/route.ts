import { NextResponse } from "next/server"
import { PrismaClient } from "@repo/db/client" 

const client = new PrismaClient();
export const GET = async () =>{
    await client.user.create({
        data:{
            email:"dhdhdhj",
            name:"hjdf"
        }
    })
    return NextResponse.json({
        message:"Hi there"
    })
}
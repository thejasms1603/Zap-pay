"use server"

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../Auth";

export async function createOnRampTransaction(provider:string, amount:number)
{
    const session = await getServerSession(authOptions);
    if(!session?.user || !session.user?.id)
    {
        return {
             message:"Unauthorised Request"
        }
    }

    const token = (Math.random()*1000).toString();
    await prisma.onRampTransaction.create({
        data:{
            provider,
            status:"Processing",
            startTime: new Date(),
            token:token,
            amount: amount * 100,
            userId:Number(session?.user?.id)
        }
    });
    return {
        message:"Done"
    }
}
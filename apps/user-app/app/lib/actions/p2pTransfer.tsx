"use server"

import {getServerSession} from 'next-auth';
import {authOptions} from "../Auth";
import prisma from '@repo/db/client';

const p2pTransfer = async (amount: number, to:string) =>
{
    const session = await getServerSession(authOptions);
    const from = session?.user || session?.user?.id;
    if(!from)
    {
        return {
            message: "Error while Sending"
        }
    }
    const toUser = await prisma.user.findFirst({
        where:{
            number:to
        }  
    });
    if(!toUser)
    {
        return{
            message:"User not found"
        }
    }
    await prisma.$transaction(async (tx) =>{
        await tx.$queryRaw`SELECT * FROM "balance" WHERE "userId"=${Number(from)} FOR UPDATE`;
        const fromBalance= await tx.balance.findUnique({
            where:{userId:Number(from)},
        });
        if(!fromBalance || fromBalance.amount < amount)
        {
            throw new Error("Insufficient Funds")
        }
        await tx.balance.update({
            where:{userId: Number(from)},
            data:{amount : {decrement : amount}},
        });

        await tx.balance.update({
            where:{userId:toUser.id},
            data:{amount: {increment: amount}}
        })
        await tx.balance.update({
            where:{userId:toUser.id},
            data:{amount : {increment: amount}}
        });
    });
}
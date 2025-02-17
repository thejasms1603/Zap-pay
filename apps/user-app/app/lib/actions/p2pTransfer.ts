"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../Auth";
import prisma from "@repo/db/client";

export const p2pTransfer = async (amount: number, to: string) => {
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;

  if (!from) {
    return {
      message: "Error while Sending: Unauthorized",
    };
  }

  const toUser = await prisma.user.findFirst({
    where: {
      number: to,
    },
  });

  if (!toUser) {
    return {
      message: "User not found",
    };
  }

  try {
    await prisma.$transaction(async (tx) => {
      // Lock sender's balance row
      await tx.$queryRaw`SELECT * FROM "balance" WHERE "userId"=${Number(from)} FOR UPDATE`;

      // Fetch sender's balance
      const fromBalance = await tx.balance.findUnique({
        where: { userId: Number(from) },
      });

      if (!fromBalance || fromBalance.amount < amount) {
        throw new Error("Insufficient Funds");
      }

      // Deduct from sender
      await tx.balance.update({
        where: { userId: Number(from) },
        data: { amount: { decrement: amount } },
      });

      // Add to recipient
      await tx.balance.update({
        where: { userId: toUser.id },
        data: { amount: { increment: amount } },
      });

      // Log the transaction
      await tx.p2pTransfer.create({
        data: {
          fromUserId: Number(from),
          toUserId: toUser.id,
          amount,
          timestamp: new Date(),
        },
      });
    });

    return {
      message: "Transfer successful",
    };
  } catch (error: any) {
    return {
      message: `Transaction failed: ${error.message || error}`,
    };
  }
};

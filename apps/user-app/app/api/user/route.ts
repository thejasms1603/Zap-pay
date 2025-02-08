import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const client = new PrismaClient();

export const GET = async () => {
  try {
    await client.user.create({
      data: {
        email: "hdhdhd",
        password: "shaha",
      },
    });

    return NextResponse.json({ message: "Account Created" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating account" },
      { status: 500 }
    );
  } finally {
    await client.$disconnect();
  }
};

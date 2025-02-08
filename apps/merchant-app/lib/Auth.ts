import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import db from "@repo/db/client";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signin({
      user,
      account,
    }: {
      user: {
        email: string;
        name: string;
      };
      account: {
        provider: "google" | "github";
      };
    }) {
      console.log("Hi Signin");
      if (!user || !user.email) {
        return false;
      }
      await db.merchant.upsert({
        select: {
          id: true,
        },
        where: {
          email: user.email,
        },
        create: {
          email: user.email,
          name: user.name,
          auth_type: account.provider === "google" ? "Google" : "Github"
        },
        update:{
            name:user.name,
            auth_type:account.provider === 'google' ? "Google" : "Github"
        }
      });
    return true;
    },
  },
  secret:process.env.NEXTAUTH_SECRET || ""
};

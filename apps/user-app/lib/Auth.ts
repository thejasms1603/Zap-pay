import  CredentialsProvider  from "next-auth/providers/credentials";
import db from "@repo/db/client";
import bcrypt from 'bcrypt';


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone Number",
          type: "text",
          placeholder: "Enter your number",
          required: true,
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
          required: true,
        },
        email:{
          label:"email",
          type:"text",
          placeholder:"Enter your email",
          required:false
        }
      },
      async authorize(credentials: any) {
        const hashedPasswords = await bcrypt.hash(credentials.password, 10);
        const exisitingUser = await db.user.findFirst({
          where: {
            number: credentials.phone,
          },
        });
        if (exisitingUser) {
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            exisitingUser.password
          );
          if (passwordValidation) {
            return {
              id: exisitingUser.id.toString(),
              name: exisitingUser.name,
              number: exisitingUser.number,
            };
          }
          return null;
        }

        try {
          const user = await db.user.create({
            data: {
              number: credentials.phone,
              password: hashedPasswords,
              email:credentials.email
            },
          });
          return {
            id: user.id.toString(),
            name: user.name,
            number: user.number,
          };
        } catch (e) {
          console.error(e);
        }
        return null;
      },
    }),
  ],
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  secret:process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub;
      return session;
    },
  },
};
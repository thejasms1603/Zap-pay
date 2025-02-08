import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from 'next-auth/providers/facebook';
import  CredentialsProvider  from "next-auth/providers/credentials";
import db from "@repo/db/client";
import bcrypt from 'bcrypt';


export const authOptions = {
    providers:[
        CredentialsProvider({
            name:'Credentials',
            Credentials:{
                phone:{label:"Phone Number", type:"text", placeholder:"Enter your number", required:true},
                password:{label:"Password", type:"password",placeholder:"Enter your password", required:true}
            },
            async authorize(Credentials: any)
            {
                const hashedPasswords = await bcrypt.hash(
                  Credentials.password,
                  10
                );
                const exisitingUser = await db.user.findFirst({
                    where:{
                        number:Credentials.phone
                    }
                });
                if(exisitingUser)
                {
                    const passwordValidation = await bcrypt.compare(
                      Credentials.password,
                      exisitingUser.password
                    );
                    if(passwordValidation)
                    {
                        return {
                            id:exisitingUser.id.toString(),
                            name:exisitingUser.name,
                            number:exisitingUser.number,
                        }
                    }
                return null
                }

                try{
                    const user = await db.user.create({
                        data:{
                            number:Credentials.phone,
                            password:hashedPasswords
                        }
                    });
                    return {
                        id:user.id.toString(),
                        name:user.name,
                        number:user.number
                    }
                } catch(e)
                {
                    console.error(e);
                }
            return null
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID || "",
            clientSecret:process.env.FACEBOOK_CLIENT_SECRET || ""
        })
    ],
    callbacks:{
        async session({token, session} :any ) {
            session.user.id = token.sub
            return session
        }
    }

}
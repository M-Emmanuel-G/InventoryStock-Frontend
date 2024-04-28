import NextAuth, { AuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { db } from "./prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { Adapter } from "next-auth/adapters"

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers

    pages:{
        signIn:"/Login"    
    },
    
    providers: [
        
    Credentials({
        name:"Credentials",
        credentials:{
            email:{label:"Insira seu email", type:"text"},
        },
        
        async authorize(credentials){
            const user = await db.users.findUnique({
                where:{
                    email: credentials?.email
                }
            })
             
            if(!user) return null

            return  {
                id: user.id,
                userName: user.createdAt
            }
            
         
        }
    })
    ],

    callbacks: {
        session: async ({ session, token }) => {
          if (session?.user) {
            session.user.id = token.sub as string
          }
          return session;
        },
        jwt: async ({ user, token }) => {
          if (user) {
            token.uid = user.id;
          }
          return token;
        },
      },
      session: {
        strategy: 'jwt',
      },
    
    secret: "asdasjdpkasndio0aspfdsaf46.dfh45fdg1h89gsf123fd1g065153412345651asdaasdsdas65321",
}

export default NextAuth(authOptions)
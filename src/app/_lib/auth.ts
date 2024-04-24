import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { db } from "./prisma"
import { signIn } from "next-auth/react"

export const authOptions = {
  // Configure one or more authentication providers
    pages:{
        signIn:"/Login"    
    },
    providers: [
    Credentials({
        name:"Credentials",
        credentials:{
            email:{label:"Insira seu email", type:"text"},
            password:{label:"Insira seu email", type:"text"},
        },
        async authorize(credentials){
            const user = await db.users.findUnique({
                where:{
                    email: credentials?.email,
                    password: credentials?.password
                }
            })

            if(user){
                return user
            } else{ 
                return null
            }
        }
    })
  
    ],
    
    // callbacks:{
    //     async signIn() {
    //         return '/Dashboard';
    //     }
    // },

    secret: "asdasjdpkasndio0aspfdsaf46.dfh45fdg1h89gsf123fd1g065153412345651asdaasdsdas65321",
}

export default NextAuth(authOptions)
import NextAuth, { AuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { db } from "./prisma"
import { DateGenerator } from "../Services/getID"

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
            password:{label:"Insira seu email", type:"password"},
            // password:{label:"Insira sua senha", type:"password"},
            
        },
        
        async authorize(credentials){
            const user = await db.users.findUnique({
                where:{
                    email: credentials?.email,
                    // password: credentials?.password
                }
            })
             
            if(!user){ return null}
            else{
            
              await db.auditLog.create({
                data:{
                  changed:`O usuário ${user.name}, acabou de logar!`,
                  date:DateGenerator.dateNow(),
                  user:user.name as string
                }
              })
              
              return user
            }
          }
      })
    ],

    callbacks: {
        session: async ({ session, token }) => {
          if (session?.user) {
            session.user.id = token.sub as string
            session.user.name = token.name as string
          }
          return session;
        },
        jwt: async ({ user, token }) => {
          if (user) {
            token.uid = user.id;
            token.name = user.name
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
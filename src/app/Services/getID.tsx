import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"



export abstract class GetUserID{
    static getID = async ()=>{
        const session = await getServerSession(authOptions)
        
        return (session?.user as any).id 
    }
}
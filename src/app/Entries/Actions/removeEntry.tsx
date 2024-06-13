// "use server"

// import { authOptions } from "@/app/_lib/auth";
// import { db } from "@/app/_lib/prisma";
// import { getServerSession } from "next-auth";

// interface EntryProps{
//     id:string
// }

// export default async function RemoveEntryDatabase(params: EntryProps) {

//     const session = await getServerSession(authOptions)

//     console.log(session);
    

//     try {
//         const getEntry = await db.productEntries.findUnique({
//             where:{
//                 id: params.id
//             }
//         })

//         if(!getEntry) return "Nota nao localizada!"
//     } catch (error:any) {
//         throw new Error(error.message);
//     }
// }
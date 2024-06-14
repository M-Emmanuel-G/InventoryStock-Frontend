"use server"

import { db } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"

interface ClientProps{
        address:string,
        available:boolean,
        id:string,
        contact:string,
        email:string,
        name:string
}

export default async function UpdateClientDatabase(params:ClientProps) {
try {

    const getClient = await db.clients.findUnique({
        where:{
            id: params.id
        }
    })

    if(!getClient) return "Cliente nao encontrado!"

    await db.clients.update({
        data:{
            address: params.address,
            isBlocked: params.available,
            contact: params.contact,
            name:params.name,
            email:params.email
        },
        where:{
            id: params.id
        }
    })

    revalidatePath("/Clients")
    return "Os dados do cliente foram atualizados com sucesso!"
} catch (error:any) {
    return error.message
}
}
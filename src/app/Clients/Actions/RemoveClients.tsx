"use server"

import { db } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"

interface ClientProps{
    id:string
}

export default async function RemoveClientDatabase(params:ClientProps) {
    try {

        const getClient = await db.clients.findUnique({
            where:{
                id: params.id
            }
        })

        if(!getClient) return "Cliente nao encontrado!"

        await db.clients.delete({
            where:{
                id: params.id
            }
        })

        revalidatePath("/Clients")
        return "Cliente excluido com sucesso!"
    } catch (error:any) {
        return error.message
    }
}
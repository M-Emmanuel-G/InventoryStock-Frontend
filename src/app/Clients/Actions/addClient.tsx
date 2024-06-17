"use server"

import { db } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"

interface ClientProps{
    fullName: string,
    address:string,
    email:string,
    contact:string,
    CPF :string
}

export default async function AddClientDatabase(params:ClientProps) {
    try {
        
        const getClientByEmail = await db.clients.findUnique({
            where:{
                email: params.email
            }
        })

        const getClientByCPF = await db.clients.findUnique({
            where:{
                cpf: params.CPF
            }
        })

        if(!params.fullName) return "Nome completo nao foi digitado"
        if(!params.email) return "Email nao foi digitado"
        if(!params.address) return "Endereco nao foi digitado"
        if(!params.contact) return "Contato nao foi digitado"
        if(!params.CPF) return "CPF nao foi digitado"

        if(getClientByEmail) return "Este email ja esta sendo utilizado!"
        if(getClientByCPF) return "Este CPF ja esta sendo utilizado!"

        await db.clients.create({
            data:{
                address:params.address,
                contact:params.contact,
                email:params.email,
                name: params.fullName,
                cpf:params.CPF
            }
        })

        revalidatePath("/Clients")
        return "Cliente foi cadastrado com sucesso!"

    } catch (error:any) {
        return error.message
    }
}
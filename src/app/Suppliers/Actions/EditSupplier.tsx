"use server"

import { db } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"

interface SupplierProps{
    supplierID: string,
    supplierName?:string,
    contact?:string,
    address?:string,
    cnpj?:string,
    email?:string
}

export default async function EditSupplierDatabase(params:SupplierProps) {
    try {

        const getSupplier = await db.suppliers.findUnique({
            where:{
                id: params.supplierID
            },
            
        })

        if(!getSupplier) return "Fornecedor nao encontrado!"

        await db.suppliers.update({
            where:{
                id:params.supplierID
            },
            data:{
                Address:params.address,
                supplier:params.supplierName,
                contact:params.contact

            }
        })

        revalidatePath("/Suppliers")

        return "Os dados do fornecedor foram editados com sucesso!"
    } catch (error:any) {
        throw new Error(error.message);
        
    }
}
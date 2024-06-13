"use server"

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

interface SupplierProps{
    supplierID:string
}

export default async function RemoveSupplierDatabase(params:SupplierProps) {
    try {
        const getSupplier = await db.suppliers.findUnique({
            where:{
                id:params.supplierID
            }
        })

        if(!getSupplier) throw new Error("Fornecedor nao encontrado!");

        await db.suppliers.delete({
            where:{
                id:params.supplierID
            }
        })

        revalidatePath("/Suppliers")
        return "Fornecedor excluido com sucesso!"

    } catch (error:any) {
        throw new Error(error.message);
    }
}
"use server"

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

interface SupplierProps{
    supplier:string,
    address:string,
    email:string,
    contact:string,
    cnpj:string
}

export default async function AddSuppliersDatabase(params:SupplierProps) {
try {

    const getSupplier = await db.suppliers.findUnique({
        where:{
            cnpj: params.cnpj
        }
    })

    const getSupplierByEmail = await db.suppliers.findUnique({
        where:{ email: params.email}
    })

    if(getSupplier) return "Já existe um fornecedor cadastrado com este CNPJ!"
    if(getSupplierByEmail) return "Já existe um fornecedor cadastrado com este EMAIL"

    await db.suppliers.create({
        data:{
            Address:params.address,
            cnpj:params.cnpj,
            contact:params.contact,
            email:params.email,
            supplier:params.supplier,
        }
    })

    revalidatePath("/Suppliers")

    return "Fornecedor cadastrado com sucesso!"
} catch (error:any) 
    {
        throw new Error(error.message);
    }
}
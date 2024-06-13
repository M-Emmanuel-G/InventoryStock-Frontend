"use server"

import { DateGenerator } from "@/app/Services/getID"
import { db } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"

interface EntryProps{
    cnpj:string
    qtd:number
    price:number
    codProduct:string
}

export const AddEntryDatabase = async (params:EntryProps)=>{

    try {

        const getProduct = await db.products.findUnique({
            where:{
                cod_product:Number(params.codProduct)
            }
        })
    
        const getSupplier = await db.suppliers.findUnique({
            where:{
                cnpj: params.cnpj
            }
        })
        
        if(!getProduct) return "Produto nao encontrado!"
        if(!getSupplier) return "Fornecedor nao encontrado!"

        await db.productEntries.create({
            data:{
                date:DateGenerator.dateNow(),
                price:params.price,
                qtd:params.qtd,
                note_value: params.price * params.qtd,
                product_id:getProduct?.id as string,
                supplier_id: getSupplier?.id as string
    
            }
        })

        await db.products.update({
            where:{
                cod_product:Number(params.codProduct)
            },
            data:{
                qtd_stock: getProduct.qtd_stock + params.qtd
            }
        })
        
        revalidatePath("Entries")

        return "Nota do produto foi cadastrada com sucesso!"

    } catch (error:any) {
        throw new Error(error.message);
    }

}
"use server"

import { DateGenerator } from "@/app/Services/getID"
import { db } from "@/app/_lib/prisma"

interface EntryProps{
    cnpj:string
    qtd:number
    price:number
    codProduct:string
}

export const AddEntryDatabase = async (params:EntryProps)=>{

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
}
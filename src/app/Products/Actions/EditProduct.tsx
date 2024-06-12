"use server"

import { db } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"

interface ProductProps{
    percentage?: number
    product:string
    qtd?:number
    price?:number
    id:string
}

export default async function UpdateProductDatabase(params:ProductProps) {
    await db.products.update({
        data:{
            sales_percentage: params.percentage,
            product: params.product,
            qtd_stock : params.qtd,
            price: params.price
        },
        where:{
            id: params.id
        }
    })

    revalidatePath("Products")
}
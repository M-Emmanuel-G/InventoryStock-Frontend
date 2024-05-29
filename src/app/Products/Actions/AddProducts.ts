"use server"

import { DateGenerator } from "@/app/Services/getID"
import { db } from "@/app/_lib/prisma"

interface ProductsProps{
    product: string
    price:number
}

export default async function AddProductsDatabase(params:ProductsProps) {
    await db.products.create({
        data:{
            product:params.product,
            price: params.price,
            entry_time: DateGenerator.dateNow()
        }
    })
}
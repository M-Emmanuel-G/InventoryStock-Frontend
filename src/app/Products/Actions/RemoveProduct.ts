"use server"

import { db } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

interface ProductProps{
    id:string
}

export default async function RemoveProductDatabase(params:ProductProps) {
    await db.products.delete({
        where:{
            id: params.id
        }
    })
    revalidatePath("/Products")
}
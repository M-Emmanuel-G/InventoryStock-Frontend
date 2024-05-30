"use server"

import { db } from "@/app/_lib/prisma"
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
    redirect("/Dashboard")
}
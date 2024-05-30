import { db } from "@/app/_lib/prisma"

interface ProductProps{
    id:string
}

export default async function RemoveProductDatabase(params:ProductProps) {
    await db.products.delete({
        where:{
            id: params.id
        }
    })
}
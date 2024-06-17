"use server"

import { DateGenerator } from "@/app/Services/getID"
import { db } from "@/app/_lib/prisma"

interface SaveProps{
    qtdPurchase:number
    codClient:number
    codProduct:number
}

export default async function SaveOutputDatabase(params:SaveProps) {
   try {
    const getClient = await db.clients.findUnique({
        where:{
            cod_client:params.codClient
        }
    })
    const getProduct = await db.products.findUnique({
        where:{
            cod_product: params.codProduct
        }
    })

    if(!params.qtdPurchase) return "Quantidade nao informada!"
    if(isNaN(params.qtdPurchase) || isNaN(params.codProduct) || isNaN(params.codClient)) return "Serao aceito somente numeros!"
    if(!getClient) return "Cliente nao encontrado!"
    if(!getProduct) return "Produto nao encontrado!"
    if(params.qtdPurchase < 0) return "Quantidade invalida!"

    // Regras de negocio

    if(getClient.isBlocked === true) return "Venda nao realizada. Cliente Bloqueado!"
    if(getProduct.qtd_stock <=0) return "Quantidade de estoque indisponivel!"
    if(getProduct.qtd_stock < params.qtdPurchase) return `Quantidade insuficiente no estoque!`

    await db.products.update({
        data:{
            qtd_stock: getProduct.qtd_stock - params.qtdPurchase
        },
        where:{
            id:getProduct.id
        }
    })
    
    await db.outputProducts.create({
        data:{
            date_output: DateGenerator.dateNow(),
            qtd_purchase: params.qtdPurchase,
            clientsID: getClient.id,
            productID: getProduct.id,

        }
    })

    return "Venda realizada com sucesso!"

   } catch (error:any) {
    return error.message
   }
}
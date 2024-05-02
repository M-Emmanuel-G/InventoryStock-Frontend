"use client"

import { Products } from "@prisma/client";
import Header from "../_components/header";
import useRequestData from "../_hooks/useRequestData";
import { BASE_URL } from "../_Constants/URL";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function Report() {

   const [GetProducts] = useRequestData(`${BASE_URL}products/getallproducts`)
    
    const showProducts = GetProducts.map((prod:Products, key:number)=>{
        return (
            <div key={prod.id} className="w-full flex justify-between">
                <div className="flex mx-4 mt-2">
                    <strong>Produto: </strong>
                    <span> {prod.product}</span>
                </div>
                <div className="flex mx-4 mt-2">
                    <strong>Estoque: </strong>
                    <span> {prod.qtd_stock}</span>
                </div>
            </div>
        )
    })

    return (
        <main className="w-screen h-screen flex flex-col"> 
        <Header/>
        <section className="w-full h-[10%] flex justify-center items-center" >
            <h1>Relatorios</h1>
        </section>
        <section className="w-full h-[80%]  flex flex-col items-center">
                <Card className="bg-sky-200 w-96 h-80">
                    <CardTitle></CardTitle>
                    <CardDescription className="flex flex-col items-center overflow-y-auto">
                        <h2 className="text-xl mt-4">Produtos</h2>
                        {showProducts}
                    </CardDescription>
                </Card>
        </section>
    </main>
    );
}
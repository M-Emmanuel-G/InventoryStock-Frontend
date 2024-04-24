"use client"

import { Card } from "@/components/ui/card";
import Header from "../_components/header";
import useRequestData from "../_hooks/useRequestData";
import { BASE_URL } from "../_Constants/URL";

export default function Dashboard () {

    const [products] = useRequestData(`${BASE_URL}products/getallproducts`)
    const [entries] = useRequestData(`${BASE_URL}entries/getallentries`)
    const [ stockOuts ] = useRequestData(`${BASE_URL}outputs/getalloutputs`)
    
    const lowStock = products.map((prod:any)=>{ return prod.qtd_stock < 100})
    const invested = entries.map((entry:any)=>{return Number(entry.note_value) }).reduce((a:number, b:number)=> a + b,0)
    const financeOuts = stockOuts.map((out:any)=>{ return Number(out.qtd_purchase * out.products.price)}).reduce((a:number, b:number)=> a + b ,0)

    return (
        <main className="w-screen h-screen flex flex-col">
            <Header/>
            <section className="w-full h-[90%">
                <section className="w-full flex text-center sm:flex-row flex-col sm:flex-wrap justify-center items-center ">
                    <Card className="sm:w-52 w-72 h-20 bg-emerald-400 mx-4 mt-4 flex items-center justify-center flex-col">
                        <strong>Produtos Cadastrados</strong>
                        <span>{products.length}</span>
                    </Card>
                    <Card className="sm:w-52 w-72 h-20 bg-emerald-400 mx-4 mt-4 flex items-center justify-center flex-col">
                        <strong>Produtos Baixo Estoque</strong>
                        <span>{lowStock.length}</span>
                    </Card>
                    <Card className="sm:w-52 w-72 h-20 bg-emerald-400 mx-4 mt-4 flex items-center justify-center flex-col">
                        <strong>Receitas</strong>
                        <span>R$ {financeOuts.toFixed(2)}</span>
                    </Card>
                    <Card className="sm:w-52 w-72 h-20 bg-emerald-400 mx-4 mt-4 flex items-center justify-center flex-col">
                        <strong>Investimentos</strong>
                        <span>R$ {invested.toFixed(2)}</span>
                    </Card>
                    <Card className="sm:w-52 w-72 h-20 bg-emerald-400 mx-4 mt-4 flex items-center justify-center flex-col">
                        <strong>Balanço</strong>
                        <span>R$ {(financeOuts - invested).toFixed(2)}</span>
                    </Card>
                </section>
                <section className="w-full h-[90%] flex flex-col justify-center items-center">
                   
                </section>
            </section>
        </main>
    );
}
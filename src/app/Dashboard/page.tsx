"use client"

import { Card } from "@/components/ui/card";
import Header from "../_components/header";
import useRequestData from "../_hooks/useRequestData";
import { BASE_URL } from "../_Constants/URL"; 
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function Dashboard () {

    const [products ] = useRequestData(`${BASE_URL}products/getallproducts`)
    const [entries ] = useRequestData(`${BASE_URL}entries/getallentries`)
    const [ stockOuts ] = useRequestData(`${BASE_URL}outputs/getalloutputs`)
    
    const lowStock = products.map((prod:any)=>{ return prod.qtd_stock})
    const invested = entries.map((entry:any)=>{return Number(entry.note_value) }).reduce((a:number, b:number)=> a + b,0)
    const financeOuts = stockOuts.map((out:any)=>{ return Number(out.qtd_purchase * out.products.price)}).reduce((a:number, b:number)=> a + b ,0)

    return (
        <main className="w-screen h-screen flex flex-col">
            <Header/>
                <section className="w-full h-94 sm:h-[10%] sm:flex sm:justify-center sm:items-center sm:flex-row flex flex-col items-center">
                    <Card className="sm:w-52 w-72 h-24 bg-sky-300 mx-4 mt-4 flex items-center justify-center flex-col">
                        <strong>Produtos Cadastrados</strong>
                        <span>{!products.length? "Carregando..." : products.length}</span>
                    </Card>
                    <Card className={`sm:w-52 w-72 h-24 bg-red-400 mx-4 mt-4 flex items-center justify-center flex-col `}>
                        <strong>Produtos Baixo Estoque</strong>
                        <span>{!lowStock.length? "Carregando..." : lowStock.length}</span>
                    </Card>
                    <Card className={`sm:w-52 w-72 h-24  mx-4 mt-4 flex items-center justify-center flex-col bg-sky-300 `}>
                        <strong>Investimentos</strong>
                        <span>R$ {invested.toFixed(2)}</span>
                    </Card>
                    <Card className={`sm:w-52 w-72 h-24 mx-4 mt-4 flex items-center justify-center flex-col bg-sky-300`}>
                        <strong>Receitas</strong>
                        <span>R$ {financeOuts.toFixed(2)}</span>
                    </Card>
                    <Card className={`sm:w-52 w-72 h-24 mx-4 mt-4 flex items-center justify-center bg-sky-300 gap-2`}>
                        <Link href="/Report">Relatorios</Link>
                        <ChevronDown width={20} height={20}/>
                    </Card>
                </section>
                <section className="w-full h-[80%] flex justify-center items-center">
                    <Image className="" src="https://utfs.io/f/b697daed-0db4-4fbf-9d77-d8f77353de81-5qcp4w.jpg" alt="" width={600} height={400}/>
                </section>
        </main>
    );
}
import { Card } from "@/components/ui/card";
import Header from "../_components/header";
import useRequestData from "../_hooks/useRequestData";
import { BASE_URL } from "../_Constants/URL"; 
import { db } from "../_lib/prisma";

export default async function Dashboard () {

    const getProducts = await db.products.findMany()
    const getEntries = await db.productEntries.findMany()
    const getStockOuts = await db.outputProducts.findMany()
    
    const lowStock = getProducts.map((prod:any)=>{ return prod.qtd_stock})
    const invested = getEntries.map((entry:any)=>{return Number(entry.note_value) }).reduce((a:number, b:number)=> a + b,0)
    const financeOuts = getStockOuts.map((out:any)=>{ return Number(out.qtd_purchase * out.products.price)}).reduce((a:number, b:number)=> a + b ,0)

    return (
        <main className="w-screen h-screen flex flex-col">
            <Header/>
            <section className="w-full h-[90%">
                <section className="w-full flex text-center sm:flex-row flex-col sm:flex-wrap justify-center items-center ">
                    <Card className="sm:w-52 w-72 h-20 bg-sky-300 mx-4 mt-4 flex items-center justify-center flex-col">
                        <strong>Produtos Cadastrados</strong>
                        <span>{!getProducts.length? "Carregando..." : getProducts.length}</span>
                    </Card>
                    <Card className={`sm:w-52 w-72 h-20 bg-red-400 mx-4 mt-4 flex items-center justify-center flex-col `}>
                        <strong>Produtos Baixo Estoque</strong>
                        <span>{!lowStock.length? "Carregando..." : lowStock.length}</span>
                    </Card>
                    <Card className={`sm:w-52 w-72 h-20  mx-4 mt-4 flex items-center justify-center flex-col bg-sky-300 `}>
                        <strong>Investimentos</strong>
                        <span>R$ {invested.toFixed(2)}</span>
                    </Card>
                    <Card className={`sm:w-52 w-72 h-20 mx-4 mt-4 flex items-center justify-center flex-col bg-sky-300`}>
                        <strong>Receitas</strong>
                        <span>R$ {financeOuts.toFixed(2)}</span>
                    </Card>
                    {/* <Card className={`sm:w-52 w-72 h-20 bg-emerald-400 mx-4 mt-4 flex items-center justify-center flex-col ${(financeOuts - invested) < 0 ? "bg-red-400" : "bg-emerald-400" }`}>
                        <strong>Balanço</strong>
                        <span>R$ {(financeOuts - invested).toFixed(2)}</span>
                    </Card> */}
                </section>
                <section className="w-full h-[90%] flex flex-col justify-center items-center">
                
                </section>
            </section>
        </main>
    );
}
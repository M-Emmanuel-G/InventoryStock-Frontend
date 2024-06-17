
import { BASE_URL } from "../_Constants/URL";
import SaveOutput from "../_components/StockOutput/addStockOutputs";
import CardOutputMobile from "../_components/StockOutput/cardSupplierMobile";
import Header from "../_components/header";
import useRequestData from "../_hooks/useRequestData";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { db } from "../_lib/prisma";

export default async function StockOut() {

   const getStockOuts = await db.outputProducts.findMany({
    include:{
        clients:true,
        products:true
    }
   })

    const showStockOutputs = getStockOuts.map((out:any, key:number)=>{
        return(
            <TableRow key={key}>
                <TableCell className="font-medium">{out.cod_output}</TableCell>
                <TableCell>{out.date_output}</TableCell>
                <TableCell>{out.products.product}</TableCell>
                <TableCell>{out.qtd_purchase}</TableCell>
                <TableCell>{out.clients.name}</TableCell>
            </TableRow>
        )
    })

    const showStockOutputsMobile = getStockOuts.map((out:any, key:number)=>{
        return(
            <CardOutputMobile
                key={key}
                out={out}
            />
        )
    })

    return (
        <main className="w-screen h-screen flex flex-col">
            <Header/>
            <section className="w-full h-[10%] flex justify-end items-center ">
                <SaveOutput/>
            </section>
            <section className="w-full h-[80%] sm:flex hidden">
                <Table>
                    <TableCaption>Notas de Saidas!</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Codigo</TableHead>
                            <TableHead>Data de saída</TableHead>
                            <TableHead>Produto</TableHead>
                            <TableHead>Quantidade</TableHead>
                            <TableHead>Cliente</TableHead>
                            </TableRow>
                        </TableHeader>
                    <TableBody>
                        {showStockOutputs}
                    </TableBody>
                </Table>
            </section>
            <section className="w-full h-[80%] flex sm:hidden flex-col items-center">
               {showStockOutputsMobile}
            </section>
        </main>
    );
}
import AddEntries from "../_components/Entries/addEntries";
import CardEntryMobile from "../_components/Entries/cardEntryMobile";
import Header from "../_components/header";
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

export default async function Entries() {

    const products = await db.products.findMany()

    const suppliers = await db.suppliers.findMany()
    
    const getEntries  = await db.productEntries.findMany({
        include:{
            product:true,
            supplier:true
        }
    })
    
    const showEntries = getEntries.map((entry:any, key:number)=>{
        
        return(
            <TableRow key={key}>
                <TableCell className="font-medium">{entry.cod_entries}</TableCell>
                <TableCell>{entry.date}</TableCell>
                <TableCell>{entry.product.product}</TableCell>
                <TableCell>R$ {Number(entry.price).toFixed(2)}</TableCell>
                <TableCell>{entry.qtd} unit.</TableCell>
                <TableCell>R$ {Number(entry.note_value).toFixed(2)}</TableCell>
                <TableCell>{entry.supplier.supplier}</TableCell>
            </TableRow>
        )
    })

    const showEntriesMobile = getEntries.filter((entry:any)=>{ return entry.date.includes("")}).map((entry:any, key:number)=>{
        return(
            <CardEntryMobile
                key={key}
                entry={entry}
            />
        )
    })
    

    return (
        <main className="w-screen h-screen flex flex-col">
            <Header/>
            <section className="w-full h-[10%] flex justify-end items-center">
                {/* <Input
                    type="number"
                    className="w-40 h-8 ml-12"
                    placeholder="Buscar..."
                    value={search}
                    onChange={(ev)=>{setSearch(ev.target.value)}}
                /> */}
                <AddEntries
                    
                />
            </section>
            <section className="w-full h-[80%] hidden sm:flex flex-col">
                <Table>
                    <TableCaption>Notas de Entrada</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Codigo</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Produto</TableHead>
                            <TableHead>Preço</TableHead>
                            <TableHead>Quantidade</TableHead>
                            <TableHead>Valor</TableHead>
                            <TableHead>Fornecedor</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {showEntries}
                    </TableBody>
                </Table>
            </section>
            <section className="w-full h-[80%] flex flex-col items-center overflow-y-auto sm:hidden">
               {showEntriesMobile}
            </section>
        </main>
    );
}
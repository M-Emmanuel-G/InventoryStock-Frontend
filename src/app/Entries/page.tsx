"use client"

import { useState } from "react";
import { BASE_URL } from "../_Constants/URL";
import AddEntries from "../_components/Entries/addEntries";
import CardEntryMobile from "../_components/Entries/cardEntryMobile";
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
import { Input } from "@/components/ui/input";

export default function Entries() {
    
    const [data] = useRequestData(`${BASE_URL}Entries/getallentries`)
    
    const [ search, setSearch ] = useState("")
    const showEntries = data.map((entry:any, key:number)=>{
        
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

    const showEntriesMobile = data.filter((entry:any)=>{ return entry.date.includes(search)}).map((entry:any, key:number)=>{
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
                <Input
                    type="number"
                    className="w-40 h-8 ml-12"
                    placeholder="Buscar..."
                    value={search}
                    onChange={(ev)=>{setSearch(ev.target.value)}}
                />
                <AddEntries/>
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
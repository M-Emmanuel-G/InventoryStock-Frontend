"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Header from "../_components/header";
import { BASE_URL } from "../_Constants/URL";
import useRequestData from "../_hooks/useRequestData";
import RemoveSupplier from "../_components/suppliers/deleteSupplier";
import AddSupplier from "../_components/suppliers/addSupplier";
import UpdateSupplier from "../_components/suppliers/updateSupplier";
import CardSupplierMobile from "../_components/suppliers/cardSupplierMobile";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function Suppliers() {

    const [data] = useRequestData(`${BASE_URL}Suppliers/getallsuppliers`)
    const [ search, setSearch ] = useState<string>("")
  
    
    const showSuppliers = data.filter((supp:any)=>{return supp.supplier.includes(search)}).map((supp:any, key:number)=>{
        
        return(
            <TableRow key={key}>
                <TableCell className="font-medium">{supp.cod_supplier}</TableCell>
                <TableCell>{supp.supplier}</TableCell>
                <TableCell>{supp.cnpj}</TableCell>
                <TableCell>{supp.Address}</TableCell>
                <TableCell>{supp.contact}</TableCell>
                <TableCell>{supp.email}</TableCell>
                <TableCell className="text-right">
                    <UpdateSupplier
                        id={supp.id}
                        supplier={supp}
                    />

                    <RemoveSupplier
                        id={supp.id}
                        supplier={supp.supplier}
                    />
                </TableCell>
            </TableRow>
        )
    })

    const showSuppliersMobile = data.filter((supp:any)=>{return supp.supplier.includes(search)}).map((supp:any, key:number)=>{
        
        return(
            <CardSupplierMobile
                supp={supp}
                supplierID={supp.id}
                key={key}
            />
        )
    })



    return (
        <main className="w-screen h-screen flex flex-col">
            <Header/>
            <section className="w-full h-[10%] flex justify-end items-center">
                <Input
                    className="w-40 h-8 ml-12"
                    placeholder="Buscar..."
                    value={search}
                    onChange={(ev)=>{setSearch(ev.target.value)}}
                />
                <AddSupplier/>
            </section>
            <section className="w-full h-[80%] hidden sm:flex">
                <Table>
                    <TableCaption>Lista de fornecedores!</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">Codigo</TableHead>
                        <TableHead>Fornecedor</TableHead>
                        <TableHead>CNPJ</TableHead>
                        <TableHead>Endereço</TableHead>
                        <TableHead>Contato</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-right">Açôes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {showSuppliers}
                    </TableBody>
                </Table>
            </section>
            <section className="w-full h-[80%] flex flex-col items-center sm:hidden overflow-y-auto">
                {showSuppliersMobile}
            </section>
        </main>
    );
}
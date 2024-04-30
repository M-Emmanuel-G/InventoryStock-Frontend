"use client"

import AddProducts from "../_components/Products/addProducts";
import DialogDelete from "../_components/Products/dialogDelete";
import EditProduct from "../_components/Products/drawerEdit";
import Header from "../_components/header";
import { BASE_URL } from "../_Constants/URL";
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
import CardProdMobile from "../_components/Products/CardProductMobile";
import { Input } from "@/components/ui/input";
import { useState } from "react";
  

export default function Products() {

    const [ Products ] = useRequestData(`${BASE_URL}Products/getallproducts`)
    const [ search, setSearch ] = useState<string>("")
    
    const showProducts = Products.filter((prod:any)=>{ return prod.product.includes(search)}).map((prod:any, key:number)=>{
        
        return(
            <TableRow key={key}>
                <TableCell className="font-medium">{prod.cod_product}</TableCell>
                <TableCell>{prod.entry_time}</TableCell>
                <TableCell>{prod.product}</TableCell>
                <TableCell>{prod.qtd_stock} unit.</TableCell>
                <TableCell>R$ {Number(prod.price).toFixed(2)}</TableCell>
                <TableCell>R$ {Number(prod.price * prod.sales_percentage).toFixed(2)}</TableCell>

                <TableCell className="text-right">
                    <EditProduct
                        id={prod.id}
                        
                    />
                    <DialogDelete
                        id={prod.id}
                    />
                </TableCell>
            </TableRow>
        )
    })

    const showProductsMobile = Products.filter((prod:any)=>{ return prod.product.includes(search)}).map((prod:any, key:number)=>{
        return(
            <CardProdMobile
                key={key}
                prod={prod}
                productID={prod.id}
            />
        )
    })

    return (
        <main className="w-screen h-screen flex-col justify-center items-center">
            <Header/>
            <section className="w-full h-[90%] flex-col">
                <section className="w-full h-[10%] flex items-center justify-end">
                    <Input
                        className="w-64 h-8 ml-12"
                        placeholder="Buscar..."
                        value={search}
                        onChange={(ev)=>{setSearch(ev.target.value)}}
                    />
                    <AddProducts/>
                </section>
                <section className="hidden sm:flex">

                    <Table>
                        <TableCaption>Lista de produtos!</TableCaption>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[100px]">Codigo</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Produto</TableHead>
                            <TableHead>Estoque</TableHead>
                            <TableHead>Valor de compra</TableHead>
                            <TableHead>Valor de venda</TableHead>
                            <TableHead className="text-right">Açôes</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {showProducts}
                        </TableBody>
                    </Table>
                </section>
                <section className="w-full h-[90%] flex flex-col items-center sm:hidden ">
                    {showProductsMobile}
            </section>
            </section>
        </main>
    );
}
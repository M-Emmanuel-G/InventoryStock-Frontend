"use client"

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../_Constants/URL";
import { useSession } from "next-auth/react";
import AddProductsDatabase from "@/app/Products/Actions/AddProducts";

export interface PageProps{
    page?: boolean
}
  

export default function AddProducts({page}:PageProps) {

    const session = useSession()

    const[product, setProduct] = useState<string>("")
    const[price, setPrice] = useState<number>(0)


    const sendAddProduct = async (ev:any)=>{
        ev.preventDefault()

        const body = {
            product,
            productPrice:price
        }

        await AddProductsDatabase({
            price,
            product
        })
            
        setProduct("")
        setPrice(0)
            
}


 return (
    <Dialog >
        <DialogTrigger asChild>
            <Button className="mx-12">Cadastrar</Button>
        </DialogTrigger>
        <DialogContent>
        <DialogHeader>
            <DialogTitle>Insira as informaçôes do produto!</DialogTitle>
            <DialogDescription>
                <form onSubmit={sendAddProduct}>
                    <div className="rounded-sm outline-none w-full h-[50px] flex justify-between items-center my-4">
                        <strong className="mx-4 text-[14px]">Produto: </strong>
                        <input
                            className="outline-none w-[300px] h-[30px] border-2 border-gray-200 rounded-xl text-center"
                            value={product}
                            onChange={(ev)=>{setProduct(ev.target.value)}}
                        />
                    </div>
                    <div className="rounded-sm outline-none w-full h-[50px] flex justify-between items-center my-4">
                        <strong className="mx-4 text-[14px]">Valor do produto: </strong>
                        <input
                            type="number"
                            className="outline-none w-[300px] h-[30px] border-2 border-gray-200 rounded-xl text-center"
                            value={price}
                            onChange={(ev)=>{setPrice(Number(ev.target.value))}}
                        />
                    </div>
                    <div className="w-full flex justify-center">
                        <Button className="text-xl my-4">Cadastrar Produto</Button>
                    </div>
                </form>
            </DialogDescription>
        </DialogHeader>
        </DialogContent>
    </Dialog>
  
 );
}
"use client"

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import UpdateProductDatabase from "@/app/Products/Actions/EditProduct";

interface EditProps{
    id:string
    product:string
    price:number
    percentage:number
    qtd:number
}
  
export default function EditProduct(params:EditProps) {

const router = useRouter()
const session = useSession()

const [price, setPrice] = useState<number>(params.price) 
const [qtd, setQtd] = useState<number>(params.qtd) 
const [product, setProduct] = useState<string>(params.product) 
const [percentage, setPercentage] = useState<number>(params.percentage)

    const editProduct = async()=>{

        try {

            if(!product || !price) throw new Error("Todas as informacoes precisam ser inseridas!");
            if(isNaN(price)) throw new Error("Preco precisa ser um numero!");

            await UpdateProductDatabase({
                product,
                price,
                id: params.id
            })

            alert("Produto alterado com sucesso!")
        } catch (error:any) {
            alert(error.message)
        }
    }

    const removeValues = ()=>{
        setPrice(0)
        setQtd(0)
        setProduct("")
        setPercentage(0)
    }

 return (
    <Drawer>
        <DrawerTrigger>
            <Pencil className="mx-2" width={20}/>
        </DrawerTrigger>
        <DrawerContent>
        <DrawerHeader className="flex flex-col items-center ">
            <div className="w-96 h-full flex items-center justify-between">
                <div className="w-full h-full flex flex-col">
                    <div className="flex justify-between my-4 px-4">
                        <strong className="">Produto:</strong>
                        <Input
                            type="text"
                            className="w-60 h-8"
                            value={product}
                            onChange={(ev)=>{setProduct(ev.target.value)}}
                        />
                    </div>
                    <div className="flex justify-between my-4 px-4">
                        <strong className="">Valor:</strong>
                        <Input
                            type="number"
                            className="w-60 h-8"
                            value={price}
                            onChange={(ev)=>{setPrice(Number(ev.target.value))}}
                        />
                    </div>
                    <div className="flex justify-between my-4 px-4">
                        <strong className="">Quantidade:</strong>
                        <span>{qtd}</span>
                    </div>
                    <div className="flex justify-between my-8 px-4">
                        <strong className="">Lucro/Porcentagem:</strong>
                        <span>{percentage}</span>
                    </div>
                </div>
            </div>
        </DrawerHeader>
        <DrawerFooter className="">
            <Button onClick={editProduct}>Atualizar</Button>
            <DrawerClose>
                <Button onClick={removeValues} variant="outline">Voltar</Button>
            </DrawerClose>
        </DrawerFooter>
        </DrawerContent>
    </Drawer>
  
 );
}
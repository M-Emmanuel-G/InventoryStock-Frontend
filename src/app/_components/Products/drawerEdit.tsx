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
import axios from "axios";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { BASE_URL } from "../../_Constants/URL";
import { useRouter } from "next/navigation";

interface EditProps{
    id:string
}
  
export default function EditProduct({id}:EditProps) {

const router = useRouter()

const [price, setPrice] = useState<number>(0) 
const [qtd, setQtd] = useState<number>(0) 
const [product, setProduct] = useState<string>("") 
const [percentage, setPercentage] = useState<number>(0) 

    const editProduct = async()=>{
    
    const body = {
        productPrice: price,
        product,
    }

    axios.patch(`${BASE_URL}products/update/${id}`, body)
        .then((res)=>{
            alert(res.data.message)
            router.push("/Products")
        })
        .catch((err)=>{
            alert(err.response.data);
        })

    setPrice(0)
    setQtd(0)
    setProduct("")
    setPercentage(0)
    }

    const removeValues = ()=>{
        setPrice(0)
        setQtd(0)
        setProduct("")
        setPercentage(0)
    }

    const getValues = async ()=>{
        

        axios.get(`${BASE_URL}Products/getProduct/${id}`)
            .then((res)=>{
                setPrice(Number(res.data.price))
                setQtd(Number(res.data.qtd_stock))
                setProduct(String(res.data.product))
                setPercentage(Number(res.data.sales_percentage))
            })
            .catch((err)=>{console.log(err.response.data);
            })
    }

 return (
    <Drawer>
        <DrawerTrigger>
            <Pencil className="mx-2" width={20} onClick={getValues}/>
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
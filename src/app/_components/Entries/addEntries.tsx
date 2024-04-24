"use client"

import { BASE_URL } from "@/app/_Constants/URL";
import useRequestData from "@/app/_hooks/useRequestData";
import { Button } from "@/components/ui/button";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
     
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
  

export default function AddEntries() {

    const [qtd,setQtd] = useState<number>(0)
    const [price,setPrice] = useState<number>(0)
    const sumNoteValue = qtd * price
    const [productID, setProductID] = useState<string>("")
    const [supplierID, setSupplierID] = useState<string>("")

    const [products] = useRequestData(`${BASE_URL}products/getallproducts`)
    const [supplier] = useRequestData(`${BASE_URL}suppliers/getallsuppliers`)

   const showSuppliers = supplier.map((supp:any, key:number)=>{
        return (
            <option key={key} onClick={()=>{setSupplierID(supp.id)}}>{supp.supplier}</option>
        )
   })

   const showProducts = products.map((prod:any, key:number)=>{
        return (
                <option key={key} onClick={()=>{setProductID(prod.id)}}>{prod.product}</option>
        )
   })

    const addEntry = async ()=>{

        const body = {
            qtd,
            price
        }

        axios
            .post(`${BASE_URL}Entries/makeEntry/productID/${productID}/supplierID/${supplierID}`, body)
            .then((res)=>{
                alert(res.data.message)
                console.log(res.data);
                
            })
            .catch((err)=>{alert(err.response.data)})
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="mx-16">Cadastrar Nota</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle className="text-center text-xl">Entrada de notas:</DialogTitle>
                <DialogDescription className="w-full flex justify-center items-center flex-col">
                <div className="flex my-4">
                        <strong className="text-sm mx-4">Quantidade:</strong>
                        <Input
                            type="number"
                            className=" w-20 h-8 text-center"
                            value={qtd}
                            onChange={(ev)=>{setQtd(Number(ev.target.value))}}
                        />
                    </div>
                    <div className="flex my-4">
                        <strong className="text-sm mx-4">Preço unit.</strong>
                        <Input
                            type="number"
                            className=" w-20 h-8 text-center"
                            value={price}
                            onChange={(ev)=>{setPrice(Number(ev.target.value))}}
                        />
                    </div>
                    <div className="flex my-4 flex-col">
                        <strong className="text-sm mx-4">Fornecedor</strong>
                        <select
                            className="w-60 h-8 my-4 text-center text-black"
                        >
                            {showSuppliers}
                        </select>
                    </div>
                    <div className="flex my-4 flex-col">
                    <strong className="text-sm mx-4">Produto</strong>
                        <select
                            className="w-60 h-8 my-4 text-center text-black"
                        >
                            {showProducts}
                        </select>
                    </div>
                    
                    <div className="flex my-4">
                        <strong className="text-sm">Valor da nota</strong>
                        <span className="text-sm mx-4">{sumNoteValue.toFixed(2)}</span>
                    </div>
                    <div>
                        <Button onClick={addEntry} className="w-[250px] h-8">Confirmar</Button>
                    </div>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
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
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../_Constants/URL";
import useRequestData from "@/app/_hooks/useRequestData";
import { useSession } from "next-auth/react";
import SaveOutputDatabase from "@/app/StockOut/Actions/SaveOutputs";
  
export default function SaveOutput() {

    const session = useSession()
  
    const [client, setClient ] = useState<number>(0)
    const [product, setProduct ] = useState<number>(0)
    const [quantity, setQuantity ] = useState<number>(0)

    const saveOutput = async (ev:any)=>{
        ev.preventDefault()

        const body = {
            qtdPurchase: quantity,
            codProduct:product,
            codClient: client
        }

        const response = await SaveOutputDatabase(body)
        alert(response)
    }

    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button className="mx-12">Saida de Produtos</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-2xl my-4">Saída de Produto</DialogTitle>
            <DialogDescription className="text-center my-4 text-xl"></DialogDescription>
            <DialogDescription>
                <form onSubmit={saveOutput}>
                    <div className="flex flex-col ">
                        <strong>Codigo do Cliente</strong>
                        <Input
                            value={client}
                            onChange={(ev)=>{setClient(Number(ev.target.value))}}            
                            className=" text-center text-black text-sm my-4"
                            type="number"
                            placeholder="Codigo do cliente"
                        />
                    </div>
                    <div className="flex flex-col ">
                        <strong>Codigo do Produto</strong>
                        <Input
                            value={product}
                            onChange={(ev)=>{setProduct(Number(ev.target.value))}}            
                            className=" text-center text-black text-sm my-4"
                            type="number"
                            placeholder="Codigo do produto"
                        />
                    </div>
                    <div className="flex flex-col ">
                        <strong>Quantidade:</strong>
                        <Input
                            value={quantity}
                            onChange={(ev)=>{setQuantity(Number(ev.target.value))}}            
                            className=" text-center text-black text-sm my-4"
                            type="number"
                        />
                    </div>
                  
                    <div className="w-full flex justify-center">
                        <Button className="w-64">Cadastrar</Button>
                    </div>
                </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
}
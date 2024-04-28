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
  
export default function SaveOutput() {

    const session = useSession()
  
    const [client, setClient ] = useState<string>("")
    const [product, setProduct ] = useState<string>("")
    const [quantity, setQuantity ] = useState<number>(0)

    const [products] = useRequestData(`${BASE_URL}products/getallproducts`)
    const [clients] = useRequestData(`${BASE_URL}clients/getallclients`)

    const showClients = clients.map((client:any, key: number) =>{
        return (
            <option onClick={()=>{setClient(client.id)}} key={key}>{client.name}</option>
        )
    })

    const showProducts = products.map((prod:any, key: number) =>{
        return (
            <option onClick={()=>{setProduct(prod.id)}} key={key}>{prod.product}</option>
        )
    })

    const saveOutput = async (ev:any)=>{
        ev.preventDefault()

        const body = {
            qtd: quantity
        }

        axios
            .post(`${BASE_URL}outputs/create/clientID/${client}/productID/${product}/userID/${session.data?.user.id}`, body)
            .then((res)=>{
                alert(res.data.message)
            })
            .catch((err)=>{
                alert(err.response.data)
                console.log(err.response.data)
            
            })
    }

    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button className="mx-12">Saida de Produtos</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-2xl my-4">Novo cliente</DialogTitle>
            <DialogDescription className="text-center my-4 text-xl">Insira os dados do novo cliente.</DialogDescription>
            <DialogDescription>
                <form onSubmit={saveOutput}>
                    <Input
                        value={quantity}
                        onChange={(ev)=>{setQuantity(Number(ev.target.value))}}
                        placeholder="Nome completo"
                        className=" text-center text-black text-sm my-4"
                        type="number"
                    />
                    <div className="w-full justify-center items-center flex flex-col">
                        <select
                            className="w-80 h-8 my-4 text-sm text-center bg-transparent">
                            {showClients}
                        </select>
                        <select
                            className="w-80 h-8 my-4 text-sm text-center bg-transparent">
                            {showProducts}
                        </select>
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
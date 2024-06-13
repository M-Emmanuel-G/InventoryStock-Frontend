"use client"

import { AddEntryDatabase } from "@/app/Entries/Actions/addEntry";
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
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function AddEntries() {

    const session = useSession()

    const [qtd,setQtd] = useState<number>(0)
    const [price,setPrice] = useState<number>(0)
    const sumNoteValue = qtd * price
    const [CNPJ, setCNPJ] = useState("")
    const [codProduct, setCodProduct] = useState("")

    const addEntry = async () => {
        try {

            if(!qtd) throw new Error("Quantidade nao informada!");
            if(!price) throw new Error("Valor nao informada!");
            if(!CNPJ) throw new Error("CNPJ nao informada!");
            if(!codProduct) throw new Error("Codigo do produto nao informada!");
            if(isNaN(qtd)) throw new Error("Formato de quantidade invalida");
            if(isNaN(price)) throw new Error("Formato do valor invalida");
            
            

            const body = {
                qtd,
                price,
                cnpj: CNPJ,
                codProduct
            }
            
            const result = await AddEntryDatabase(body)

           alert(result);
           

        } catch (error:any) {
            alert(error.message)
        }

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
                        <strong className="text-sm mx-4">CNPJ do Fornecedor</strong>
                        <Input
                            type="text"
                            className=" w-20 h-8 text-center"
                            value={CNPJ}
                            onChange={(ev)=>{setCNPJ(ev.target.value)}}
                        />
                    </div>
                    <div className="flex my-4 flex-col">
                    <strong className="text-sm mx-4">Codigo do Produto</strong>
                            <Input
                                type="text"
                                className=" w-20 h-8 text-center"
                                value={codProduct}
                                onChange={(ev)=>{setCodProduct(ev.target.value)}}
                            />
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
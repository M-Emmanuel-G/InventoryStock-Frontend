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
import { useState } from "react";
import { useSession } from "next-auth/react";
import AddSuppliersDatabase from "@/app/Suppliers/Actions/AddSuppliers";
  

export default function AddSupplier() {

    const session = useSession()

    const [supplierName, setSupplierName ] = useState<string>("")
    const [address, setAddress ] = useState<string>("")
    const [email, setEmail ] = useState<string>("")
    const [contact, setContact ] = useState<string>("")
    const [cnpj, setCnpj ] = useState<string>("")

    const addSupplier= async (ev:any)=>{
        ev.preventDefault()

        const result = await AddSuppliersDatabase({
            address,
            cnpj,
            contact,
            email,
            supplier:supplierName
        })
       alert(result)
    }

    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button className="mx-12">Cadastrar Fornecedor</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-2xl my-4">Novo fornecedor</DialogTitle>
            <DialogDescription className="text-center my-4 text-xl">Insira os dados do novo fornecedor.</DialogDescription>
            <DialogDescription>
                <form onSubmit={addSupplier}>
                    <Input
                        value={supplierName}
                        onChange={(ev)=>{setSupplierName(ev.target.value)}}
                        placeholder="Nome completo"
                        className=" text-center text-black text-sm my-4"
                    />
                    <Input
                        value={address}
                        onChange={(ev)=>{setAddress(ev.target.value)}}
                        placeholder="Endereço"
                        className=" text-center text-black text-sm my-4"
                    />
                    <Input
                        value={email}
                        onChange={(ev)=>{setEmail(ev.target.value)}}
                        placeholder="Email"
                        className=" text-center text-black text-sm my-4"
                    />
                    <Input
                        value={cnpj}
                        onChange={(ev)=>{setCnpj(ev.target.value)}}
                        placeholder="CNPJ"
                        className=" text-center text-black text-sm my-4"
                    />
                    <Input
                        value={contact}
                        onChange={(ev)=>{setContact(ev.target.value)}}
                        placeholder="Contato"
                        className=" text-center text-black text-sm my-4"
                    />
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
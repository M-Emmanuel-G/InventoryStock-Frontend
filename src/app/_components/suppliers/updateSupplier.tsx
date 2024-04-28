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

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../../_Constants/URL";
import { useSession } from "next-auth/react";

interface UpdateProps{
  id:string
  supplier:{
    supplier:string,
    cnpj:string,
    Address:string,
    email:string
    contact:string
  }
} 

export default function UpdateSupplier({id, supplier}:UpdateProps) {
  
    const session = useSession()

    const [supplierName, setSupplierName ] = useState<string>("")
    const [address, setAddress ] = useState<string>("")
    const [email, setEmail ] = useState<string>("")
    const [contact, setContact ] = useState<string>("")
    const [cnpj, setCnpj ] = useState<string>("")

    useEffect(()=>{
        setSupplierName(supplier.supplier)
        setAddress(supplier.Address)
        setEmail(supplier.email)
        setCnpj(supplier.cnpj)
        setContact(supplier.contact)
    },[])

    const update = async (ev:any)=>{
      ev.preventDefault()

      const body = {
        supplier:supplierName,
        cnpj,
        Address:address,
        email,
        contact,
      }

      axios
        .patch(`${BASE_URL}suppliers/update/supplierID/${id}/userID:${session.data?.user.id}`, body )
        .then((res)=>{
            alert(res.data.message)
        })
        .catch((err)=>{alert(err.response.data)})
       
    }

    return (
        <Dialog>
        <DialogTrigger>
          <Pencil width={20}/>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-2xl my-4">Atualizar autorização do cliente</DialogTitle>
            <DialogDescription className="text-center my-4 text-xl">Altere abaixo as informações do cliente</DialogDescription>
            <DialogDescription>
                <form onSubmit={update}>
                  <div className="w-full flex justify-evenly my-4 flex-col">
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
                          value={contact}
                          onChange={(ev)=>{setContact(ev.target.value)}}
                          placeholder="Contato"
                          className=" text-center text-black text-sm my-4"
                      />
                      <Input
                          value={cnpj}
                          onChange={(ev)=>{setCnpj(ev.target.value)}}
                          placeholder="Contato"
                          className=" text-center text-black text-sm my-4"
                      />
                  </div>
                  <div className="w-full flex justify-center">
                      <Button className="w-64">Confirmar</Button>
                  </div>
                </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
}
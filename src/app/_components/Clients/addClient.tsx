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
  

export default function AddClient() {

    const [fullName, setFullName ] = useState<string>("")
    const [address, setAddress ] = useState<string>("")
    const [email, setEmail ] = useState<string>("")
    const [contact, setContact ] = useState<string>("")

    const addClient = async (ev:any)=>{
        ev.preventDefault()

        const body = {
            name:fullName,
            address,
            email,
            contact
        }

        axios
            .post(`${BASE_URL}clients/create`, body)
            .then((res)=>{
                alert(res.data.message)
            })
            .catch((err)=>{alert(err.response.data)})
    }

    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button className="mx-12">Cadastrar cliente</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-2xl my-4">Novo cliente</DialogTitle>
            <DialogDescription className="text-center my-4 text-xl">Insira os dados do novo cliente.</DialogDescription>
            <DialogDescription>
                <form onSubmit={addClient}>
                    <Input
                        value={fullName}
                        onChange={(ev)=>{setFullName(ev.target.value)}}
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
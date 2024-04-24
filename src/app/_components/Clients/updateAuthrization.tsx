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

interface UpdateProps{
  id:string,
  client:{
    address:string,
    available:string,
    id:string,
    contact:string,
    email:string,
    name:string
  }
} 

export default function UpdateClient({id, client}:UpdateProps) {
    
    const [available, setAvailable ] = useState<string>("not-authorized")
    const [fullName, setFullName ] = useState<string>("")
    const [address, setAddress ] = useState<string>("")
    const [email, setEmail ] = useState<string>("")
    const [contact, setContact ] = useState<string>("")

    const verifyAuthorization = ()=>{
      if(available === "authorized") return true
      else if(available === "not-authorized") return false
      else return false
    } 

    useEffect(()=>{
      setFullName(client.name)
      setAddress(client.address)
      setEmail(client.email)
      setContact(client.contact)
        if(String(client.available) === "false" ) setAvailable(String("not-authorized"))
        else if(String(client.available) === "true" ) setAvailable(String("authorized"))
    },[])

    const update = async (ev:any)=>{
      ev.preventDefault()

      const body = {
        address,
        available : verifyAuthorization(),
        clientID: client.id,
        contact,
        email,
        name : fullName
      }

      axios
        .patch(`${BASE_URL}clients/update/clientID/${id}`, body )
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
                    <div className="w-full flex justify-evenly">
                      <div>
                        <input type="radio" id="authorized" name="authorization" value="authorized" onChange={(ev)=>{setAvailable(ev.target.value)}} checked={available === "authorized"} />
                        <label className="mx-4" htmlFor="authorized">Autorizado</label>
                      </div>
                      <div>
                        <input type="radio" id="not-authorized" name="authorization" value="not-authorized" onChange={(ev)=>{setAvailable(ev.target.value)}} checked={available === "not-authorized"} />
                        <label className="mx-4" htmlFor="not-authorized">Não Autorizado</label>
                      </div>
                    </div>
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
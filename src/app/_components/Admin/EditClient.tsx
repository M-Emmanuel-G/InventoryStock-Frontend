"use client"

import { BASE_URL } from "@/app/_Constants/URL"
import { Input } from "@/components/ui/input";
import useRequestData from "@/app/_hooks/useRequestData"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function AdminUpdateClient() {

    const session = useSession()
    const [available, setAvailable ] = useState<string>("not-authorized")
    const [idClient, setIdClient] = useState<string>("") 
    
    const verifyAuthorization = ()=>{
        if(available === "authorized") return true
        else if(available === "not-authorized") return false
        else return false
      } 

      const [clients] = useRequestData(`${BASE_URL}clients/getallClients`)

        useEffect(()=>{



            // if(String(client.available) === "false" ) setAvailable(String("not-authorized"))
            // else if(String(client.available) === "true" ) setAvailable(String("authorized"))
        },[])

    const getIDProd = (id:string)=>{
        setIdClient(id)

        axios.get(`${BASE_URL}Products/getProduct/${id}`)
        .then((res)=>{
            setAvailable(res.data.sales_percentage)
        })
        .catch((err)=>{console.log(err.response.data);
        })
        
    }

    const showClient = clients.map((client:any, key:number)=>{
        return(
            <option key={key} onClick={()=>{getIDProd(client.id)}} >{client.product}</option>
        )
    })

    const editProduct = async()=>{
    
     
        }

    return (
        <AlertDialog>
            <AlertDialogTrigger>Atualizar Cliente</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Porcentagem de venda do produto</AlertDialogTitle>
                <AlertDialogDescription className="flex flex-col">
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
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={editProduct}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>

    );
}





// FINALIZAR ADMIN UPDATE CLIENTS
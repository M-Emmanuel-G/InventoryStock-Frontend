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
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AdminUpdateProduct() {

    const router = useRouter()
    const session = useSession()

    const [percentage, setPercentage] = useState<number>(0) 
    const [price, setPrice] = useState<number>(0) 
    const [idProd, setIdProd] = useState<string>("") 

    const [products] = useRequestData(`${BASE_URL}products/getallproducts`)

    const getIDProd = (id:string)=>{
        setIdProd(id)

        axios.get(`${BASE_URL}Products/getProduct/${id}`)
        .then((res)=>{
            setPercentage(Number(res.data.sales_percentage))
            setPrice(Number(res.data.price))
        })
        .catch((err)=>{console.log(err.response.data);
        })
        
    }

    const showProducts = products.map((prod:any, key:number)=>{

        
        
        return(
            <option key={key} onClick={()=>{getIDProd(prod.id)}} >{prod.product}</option>
        )
    })

    const editProduct = async()=>{
    
        const body = {
            percentage
        }
    
        axios.patch(`${BASE_URL}products/update/Percentage/productID/${idProd}/userID/${session.data?.user.id}`, body)
            .then((res)=>{
                alert(res.data.message)
            })
            .catch((err)=>{
                console.log(err.response);
            })
        setPercentage(0)
        setPrice(0)
        }
    
        const removeValues = ()=>{
            setPercentage(0)
            setPrice(0)
        }

    return (
        <AlertDialog>
            <AlertDialogTrigger>Atualizar Produtos</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Porcentagem de venda do produto</AlertDialogTitle>
                <AlertDialogDescription className="flex flex-col">
                    <select className="bg-transparent text-center h-8 my-4">
                        {showProducts}
                    </select>
                    <div>
                        <strong>Porcentagem atual: </strong>
                        <span>{percentage}</span>
                    </div>
                    <Input
                        className="my-4"
                        type="number"
                        value={percentage}
                        onChange={(ev)=>{setPercentage(Number(ev.target.value))}}     
                    />
                    <div>
                        <strong>Preço atual: </strong>
                        <span>{price}</span>
                    </div>
                    <Input
                        className="my-4"
                        type="number"
                        value={price}
                        onChange={(ev)=>{setPrice(Number(ev.target.value))}}     
                    />
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel onClick={removeValues}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={editProduct}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>

    );
}
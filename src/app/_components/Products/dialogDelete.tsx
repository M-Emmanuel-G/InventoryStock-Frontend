"use client"

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
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import RemoveProductDatabase from "@/app/Products/Actions/RemoveProduct";

  interface DeleteProps{
    id:string
  }

  export default function DialogDelete({id}:DeleteProps) {

    const session = useSession()
   
    const delProduct = async ()=>{
        try {
            await RemoveProductDatabase({
                id
            })

            alert("Produto excluido com sucesso!")
        } catch (error:any) {
            alert(error.message);
        }
    }
   
    return (
    <AlertDialog>
        <AlertDialogTrigger> 
            <Trash2 width={20} className=""/>
        </AlertDialogTrigger>
        <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>Cuidado! Deseja realmente excluir este produto?</AlertDialogTitle>
            <AlertDialogDescription>
                Ao confirmar, esta açâo não poderá ser revertida!
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={delProduct} >
             Confirmar
            </AlertDialogAction>
        </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  
   );
  }
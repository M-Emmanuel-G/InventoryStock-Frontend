"use client"

import { Trash2 } from "lucide-react";
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
import { useSession } from "next-auth/react";
import RemoveSupplierDatabase from "@/app/Suppliers/Actions/RemoveSuppliers";
  

interface RemoveProps{
    id:string
    supplier:string
} 

export default function RemoveSupplier({id, supplier}:RemoveProps) {

    const session = useSession()

    const remove = async ()=>{

        try {
            const result = await RemoveSupplierDatabase({ supplierID:id })
            alert(result)
        } catch (error:any) {
            alert(error.message)
        }
        
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Trash2 width={20} className="mx-4"/>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle className="text-center text-2xl my-4">Cuidado!</AlertDialogTitle>
                <AlertDialogTitle className="text-center my-4">Deseja realmente excluir o fornecedor</AlertDialogTitle>
                <AlertDialogTitle className="text-center my-4">{supplier}</AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                    Esta operaçâo nâo podera ser revertida!
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction className=" bg-red-400 text-sm hover:bg-red-500" onClick={remove}>Confirmar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    );
}
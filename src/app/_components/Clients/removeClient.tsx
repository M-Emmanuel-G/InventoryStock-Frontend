"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BASE_URL } from "../../_Constants/URL";

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
  

interface RemoveProps{
    id:string
} 

export default function RemoveClientComp({id}:RemoveProps) {

    const session = useSession()

    const remove = async ()=>{

        axios
            .delete(`${BASE_URL}Clients/delete/clientID/${id}/userID:${session.data?.user.id}`)
            .then(res=> alert(res.data.message))
            .catch(err=>alert(err.response.data))

    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Trash2 width={20} className="mx-1"/>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle className="text-center text-2xl my-4">Cuidado!</AlertDialogTitle>
                <AlertDialogTitle className="text-center my-4">Deseja realmente excluir este cliente?</AlertDialogTitle>
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
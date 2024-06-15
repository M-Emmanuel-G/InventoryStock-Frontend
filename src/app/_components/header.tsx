"use client"

import { signOut, useSession } from "next-auth/react";
import { ChevronLeftCircle, LogOutIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { DateGenerator } from "../Services/getID";

export default function Header() {

    const router = useRouter()
    const session  = useSession()

    useEffect(()=>{
        if(session.status === "unauthenticated"){
            router.push("/")
        }
        else{
            router.refresh()
        }
    }, [])

    return (
        <header className="w-full h-[10%] flex justify-start items-center bg-sky-300">
           <div className="w-2/6 h-full flex items-center">
                <Link href="/Dashboard">
                    <ChevronLeftCircle className="w-12 h-12 mx-4"/>
                </Link>
                <div className="flex flex-col px-8">
                    <strong className="mx-2">{DateGenerator.dateNow()}</strong>
                    <strong className="mx-2">Bem vindo, {session.data?.user.name}</strong>
                </div>
           </div>
           <div className="w-4/6 h-full flex justify-end items-center">
            <LogOutIcon 
                className="w-12 h-12 mx-4"
                onClick={()=>{signOut(), router.push("/")}}    
            />
           </div>
        </header>
    );
}
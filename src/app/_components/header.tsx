"use client"

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
        <header className="w-full h-[10%] flex justify-between items-center bg-sky-300">
            <div className="flex flex-col px-8">
                <strong className="mx-2">{DateGenerator.dateNow()}</strong>
                <strong className="mx-2">Bem vindo, {session.data?.user.name}</strong>
            </div>
            <Sheet>
                <SheetTrigger>
                    <MenuIcon className="mx-12"/>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                    <SheetTitle>
                        <Image src="https://utfs.io/f/deff6651-7218-4dd3-ac04-cd1a36334d11-fcbkj8.jpg" alt="" width={200} height={200}/>
                    </SheetTitle>
                    <SheetDescription className="flex flex-col">
                        <Link className="my-4 text-xl" href="/Dashboard">
                            <strong>Dashboard</strong>
                        </Link>
                        <Link className="my-4 text-xl" href="/Products">
                            <strong>Produtos</strong>
                        </Link>
                       <Link className="my-4 text-xl" href="/Entries">
                            <strong>Entradas</strong>
                        </Link>
                        <Link className="my-4 text-xl" href="/StockOut">
                            <strong>Saidas</strong>
                        </Link>
                        <Link className="my-4 text-xl" href="/Clients">
                            <strong>Clientes</strong>
                        </Link>
                        <Link className="my-4 text-xl" href="/Suppliers">
                            <strong>Fornecedores</strong>
                        </Link>
                        <Link className="my-4 text-xl" href="/AuditLog">
                            <strong>Auditoria</strong>
                        </Link>
                    </SheetDescription>
                    <SheetDescription className=" w-full items-center flex flex-col">
                        <Button className="my-4 w-[200px] h-[30px] text-xl" onClick={()=>{signOut({ callbackUrl: '/' })}}>Sair</Button>
                    </SheetDescription>
                    </SheetHeader>
                </SheetContent>
                </Sheet>
        </header>
    );
}
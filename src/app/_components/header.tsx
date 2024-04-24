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

export default function Header() {

    const router = useRouter()
    const session = useSession()

    useEffect(()=>{
        if(session.status === "unauthenticated"){
            router.push("/")
        }else{
            router.refresh()
        }
    }, [])

    return (
        <header className="w-full h-[10%] flex justify-end items-center bg-slate-300">
            <div>
                <strong>Bem vindo, {session.data?.user?.name}</strong>
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
                        {/* <Link className="my-4 text-xl" href="/Profile">
                            <strong>Perfil</strong>
                        </Link> */}
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
                        {/* <Link className="my-4 text-xl" href="/Report">
                            <strong>Relatório</strong>
                        </Link> */}
                        <Link className="my-4 text-xl" href="/Suppliers">
                            <strong>Fornecedores</strong>
                        </Link>
                        {/* <Link className="my-4 text-xl" href="/Dashboard">
                            <strong>Histórico de movimentaçôes</strong>
                        </Link> */}
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
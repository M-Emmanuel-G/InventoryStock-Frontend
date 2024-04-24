"use client"

import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Home() {

  const session = useSession()
  const router = useRouter()

  if(session.status === "authenticated") router.push("/Dashboard")
  
  

  return(
    <main className="w-screen h-screen flex items-center justify-center flex-col">
      <section className=" w-80 h-96 flex  flex-col justify-center items-center">
        <Image src="https://utfs.io/f/deff6651-7218-4dd3-ac04-cd1a36334d11-fcbkj8.jpg" alt="" width={300} height={400}/>
        <h2>Bem vindo ao IControl</h2>
        <div className="flex flex-col gap-4 my-4">
        <Button onClick={()=>{signIn ()}}>Acessar conta</Button>
        <Button onClick={()=>{router.push("/Signup")}}>Crie sua conta</Button>
        </div>
      </section>
    </main>
  )
}

// criacao pagina entradas
// Página de registro usuario somente para ADMIN
// middlewares de rota somente para admin

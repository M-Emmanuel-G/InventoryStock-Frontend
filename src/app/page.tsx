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
    <main className="w-screen h-screen flex items-center justify-center flex-col bg-black">
      <section className=" w-94 h-1/2 flex  flex-col justify-center items-center">
        <Image 
          className="w-80 h-[90%] rounded-xl"
          src="https://utfs.io/f/2195d186-fe9a-435e-8f5e-517149bc03dc-xjyqk2.jpeg" 
          alt="Banner Login" 
          width={0} 
          height={0} 
          sizes="100vw" 
          quality={100}
        />
      </section>
      <section className="w-full h-1/2 flex flex-col items-center bg-sky-400 rounded-tr-[50px]">
        <h2 className="text-black pt-8 text-3xl">Login</h2>
        <span className="text-center text-sm text-black my-2">Logue usando seu email</span>
        <div className="flex items-center flex-col gap-4 my-4">
          <Button className="w-[271px] h-[63px] bg-black text-white text-xl hover:bg-black" onClick={()=>{signIn ()}}>Acessar conta</Button>
          <Button className="w-[271px] h-[63px] bg-black text-white text-xl hover:bg-black" onClick={()=>{router.push("/Signup")}}>Crie sua conta</Button>
        </div>
      </section>
    </main>
  )
}

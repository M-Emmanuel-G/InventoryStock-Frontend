"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AddUserDatabase from "./Actions/addUser";

export default function SignUp() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")

    const router = useRouter()

    const signup = async (ev:any)=>{
        ev.preventDefault()

        const body = {
            name,
            email,
            password,
            confirmPass
        }

        const result = await AddUserDatabase(body)
        
        if(result.status === "Success"){
            alert(result.message)
            router.push("/")

            setName("")
            setEmail("")
            setPassword("")
            setConfirmPass("")
        } else{
            alert(result.message)
        }

    }

    return (
        <main className="w-screen h-screen flex flex-col">
            <section className="w-full h-full flex flex-col items-center justify-center">
            <Image src="https://utfs.io/f/deff6651-7218-4dd3-ac04-cd1a36334d11-fcbkj8.jpg" alt="" width={300} height={400}/>
                <form onSubmit={signup}>
                    <h2 className="text-center text-xl">Registre-se</h2>
                    <Input
                        className="w-72 h-8 my-4"
                        placeholder="Nome completo"
                        value={name}
                        type="text"
                        onChange={(ev)=>{setName(ev.target.value)}}
                    />
                    <Input
                        className="w-72 h-8 my-4"
                        placeholder="Email"
                        value={email}
                        type="email"
                        onChange={(ev)=>{setEmail(ev.target.value)}}
                    />
                    <Input
                        className="w-72 h-8 my-4"
                        placeholder="Senha"
                        type="password"
                        value={password}
                        onChange={(ev)=>{setPassword(ev.target.value)}}
                    />
                    <Input
                        className="w-72 h-8 my-4"
                        placeholder="Confirme sua senha"
                        type="password"
                        value={confirmPass}
                        onChange={(ev)=>{setConfirmPass(ev.target.value)}}
                    />
                    <div className="flex flex-col">
                        <Button className="my-2">Confirmar</Button>
                        <Button className="my-2" type="button" onClick={()=>{router.push("/")}}>Voltar</Button>
                    </div>
                </form>
            </section>
        </main>
    );
}
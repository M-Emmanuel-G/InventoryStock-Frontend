"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BASE_URL } from "../_Constants/URL";

export default function SignUp() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter()

    const signup = (ev:any)=>{
        ev.preventDefault()

        const body = {
            name,
            email,
            password
        }

        axios
            .post(`${BASE_URL}users/create`, body)
            .then((res)=>{
                alert(res.data.message)
                router.push("/")
            })
            .catch((err)=>{console.log(err)})
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
                    <div className="flex flex-col">
                        <Button className="my-2">Confirmar</Button>
                        <Button className="my-2" type="button" onClick={()=>{router.push("/")}}>Voltar</Button>
                    </div>
                </form>
            </section>
        </main>
    );
}
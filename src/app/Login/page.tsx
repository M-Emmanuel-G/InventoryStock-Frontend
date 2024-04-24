"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";

export default function Login() {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const login = (ev:React.FormEvent<HTMLFormElement>)=>{
        ev.preventDefault()
        const data = {
            email:email,
            password:password
        }

        signIn("credentials", {
            ...data,
            callbackUrl: "/Dashboard",
        })
        
    }

    return (
        <main className="w-full h-screen flex flex-col items-center justify-center">
            <section className="w-[326px] h-[400px] flex flex-col items-center justify-center text-center">
                <form onSubmit={login}>
                    <Image src="https://utfs.io/f/deff6651-7218-4dd3-ac04-cd1a36334d11-fcbkj8.jpg" alt="" width={300} height={400}/>
                    <h2 className="text-xl mb-10">Acessar conta</h2>
                    <div className="flex flex-col my-4">
                        <legend className="text-start">
                            <strong>Email*</strong>
                        </legend>
                        <Input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(ev)=>{setEmail(ev.target.value)}}
                        />
                    </div>
                    <div className="flex flex-col my-4">
                        <legend className="text-start">
                            <strong>Senha*</strong>
                        </legend>
                        <Input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(ev)=>{setPassword(ev.target.value)}}
                        />
                    </div>
                    <Button className="w-56 h-10 my-8 text-sm">Logar</Button>
                </form>
            </section>
        </main>
    );
}
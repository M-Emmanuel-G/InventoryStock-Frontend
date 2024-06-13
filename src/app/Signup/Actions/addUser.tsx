"use server"

import { db } from "@/app/_lib/prisma"
import { redirect } from "next/navigation"

interface AddUserProps{
    name:string, 
    email:string,
    password:string,
    confirmPass: string
}

export default async function AddUserDatabase(params:AddUserProps) {
    try {

        const getUser = await db.users.findUnique({
            where:{
                email:params.email
            }
        })

        if(!params.name) return { message:"Digite seu nome!"}
        if(!params.email) return {message:"Digite seu email!"}
        if(!params.password) return {message:"Digite sua senha!"}
        if(params.password !== params.confirmPass) return {message:"As senhas precisam ser iguais!"}
        
        if(getUser) return {message:"Este email já esta sendo utilizado por outro usuário!"}

        await db.users.create({
            data:{
                name: params.name,
                email:params.email,
                password: params.password
            }
        })
        
        return  { 
            message:"Usuario cadastrado com sucesso!",
            status: "Success"
        }
        
    } catch (error:any) {
        return error.message
    }
}
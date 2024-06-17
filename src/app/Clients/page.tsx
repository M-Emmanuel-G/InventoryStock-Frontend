import AddClient from "../_components/Clients/addClient";
import Header from "../_components/header";
import RemoveClientComp from "../_components/Clients/removeClient";
import UpdateClient from "../_components/Clients/updateAuthrization";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import CardClientMobile from "../_components/Clients/CardClientMobile";
import { db } from "../_lib/prisma";

export default async function Clients() {
    
    const getClients = await db.clients.findMany({
        orderBy:{
             cod_client:"asc"
        }
    })

    const showClients = getClients.filter((client:any)=>{return client.name.includes("")}).map((client:any, key:number)=>{
        
        return(
            <TableRow key={key}>
                <TableCell className="font-medium">{client.cod_client}</TableCell>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.address}</TableCell>
                <TableCell>{client.contact}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell className="text-right">
                    <UpdateClient
                        id={client.id}
                        client={client}
                    />
                    <RemoveClientComp
                        id={client.id}
                    />
                </TableCell>
            </TableRow>
        )
    })

    const showClientsMobile = getClients.filter((client:any)=>{return client.name.includes("")}).map((client:any, key:number)=>{
        
        return(
           <CardClientMobile
            client={client}
            clientID={client.id}
            key={key}
           />
        )
    })


    return (
        <main className="w-screen h-screen flex flex-col"> 
            <Header/>
            <section className="w-full h-[10%] flex items-center justify-end">
                {/* <Input
                    className="w-40 h-8 ml-12"
                    placeholder="Buscar..."
                    value={search}
                     onChange={(ev)=>{setSearch(ev.target.value)}}
                /> */}
                <AddClient/>
            </section>
            <section className="w-full h-[80%] sm:flex hidden">
                <Table>
                    <TableCaption>Lista de Clientes!</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">Codigo</TableHead>
                        <TableHead>Nome Completo</TableHead>
                        <TableHead>Endereço</TableHead>
                        <TableHead>Contato</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-right">Açôes</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {showClients}
                    </TableBody>
                </Table>
            </section>
            <section className="w-full h-[80%] flex  sm:hidden flex-col items-center">
                {showClientsMobile}
            </section>
        </main>
    );
}
import Header from "../_components/header";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import useRequestData from "../_hooks/useRequestData";
import { BASE_URL } from "../_Constants/URL";
import CardAuditMobile from "../_components/Audit/CardAuditMobile";
import { db } from "../_lib/prisma";

export default async function AuditLog() {

    const getAudits = await db.auditLog.findMany()
    

    const showAudit = getAudits.map((audit:any, key:number)=>{

    
        return(
            <TableRow key={key}>
                <TableCell className="font-medium">{audit.cod_audit}</TableCell>
                <TableCell>{audit.date}</TableCell>
                <TableCell>{audit.changed}</TableCell>
                <TableCell>{audit.user}</TableCell>
            </TableRow>
        )
    })

    const showAuditMobile = getAudits.map((audit:any, key:number)=>{
        return(
            <CardAuditMobile
                audit={audit}
                key={key}
            />
        )
    })

    return (
        <main className="w-screen h-screen flex flex-col"> 
            <Header/>
            <section className="w-full h-[90%] sm:flex hidden">
                <Table>
                    <TableCaption>Lista de Registros!</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">Codigo</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Alteração</TableHead>
                        <TableHead>Alterado por:</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {showAudit}
                    </TableBody>
                </Table>
            </section>
            <section className="w-full h-[80%] flex  sm:hidden flex-col items-center overflow-y-auto">
                {showAuditMobile}
            </section>
        </main>
    );
}
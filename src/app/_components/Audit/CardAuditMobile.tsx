import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { AuditLog } from "@prisma/client";

interface CardMobile {
    audit:AuditLog
}

export default function CardAuditMobile({audit}:CardMobile ) {
    
    return (
        <div>
            <Card className="w-[370px] h-[150px] bg-slate-300 my-2">
                <CardTitle className="py-1 flex justify-between">
                    <span className=" px-4">{audit.user}</span>
                </CardTitle>
                <CardDescription className="text-black flex flex-col justify-center">
                    <div className="mt-1.5 px-4 flex justify-between">
                        <strong>Codigo: </strong>
                        <span>{audit.cod_audit}</span>
                    </div>
                    <div className="mt-1.5 px-4 flex justify-between">
                        <strong>Data:</strong>
                        <span>{audit.date}</span>
                    </div>
                    <div className="mt-1.5 px-4 flex justify-between flex-col">
                        <strong>Alteração: </strong>
                        <span>{audit.changed}</span>
                    </div>
            </CardDescription>
            </Card>
        </div>
    );
}
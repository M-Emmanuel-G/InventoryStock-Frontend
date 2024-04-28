import { Card, CardDescription, CardTitle } from "@/components/ui/card";

interface CardMobile {
    audit:{
        cod_audit:number,
        date:string
        user:string
        changed:string
    }
}

export default function CardAuditMobile({audit}:CardMobile ) {
    
    return (
        <div>
            <Card className="w-[370px] h-[250px] bg-slate-300 my-2">
                <CardTitle className="py-1 flex justify-between">
                    {/* <span className="text-xl px-4">{supp.supplier}</span> */}
                </CardTitle>
                <CardDescription className="text-black flex flex-col justify-center">
                    {/* <div className="mt-1.5 px-4 flex justify-between">
                        <strong>Codigo: </strong>
                        <span>{supp.cod_supplier}</span>
                    </div>
                    <div className="mt-1.5 px-4 flex justify-between">
                        <strong>CNPJ: </strong>
                        <span>{supp.cnpj}</span>
                    </div>
                    <div className="mt-1.5 px-4 flex justify-between flex-col">
                        <strong>Endereço: </strong>
                        <span>{supp.Address}</span>
                    </div>
                    <div className="mt-1.5 px-4 flex justify-between">
                        <strong>Contato: </strong>
                        <span>{supp.contact}</span>
                    </div>
                    <div className="mt-1.5 px-4 flex justify-between">
                        <strong>Email: </strong>
                        <span>{supp.email}</span>
                    </div> */}


                </CardDescription>
            </Card>
        </div>
    );
}
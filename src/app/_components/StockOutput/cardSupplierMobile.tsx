import { Card, CardDescription, CardTitle } from "@/components/ui/card";

interface CardMobile {
    out:{
        cod_output:number,
        date_output:string
        qtd_purchase:number
        clients:{
            name:string
        }
        products:{
            product:string
        }
    },
}

export default function CardOutputMobile({out}:CardMobile ) {
    return (
        <div>
            <Card className="w-[370px] h-[140px] bg-slate-300 my-2">
                <CardTitle className="py-1 flex justify-between">
                    <span className="text-xl px-4">{out.clients.name}</span>
                </CardTitle>
                <CardDescription className="text-black flex flex-col justify-center">
                    <div className="px-4 flex justify-between">
                        <strong>Codigo:</strong>
                        <span>{out.cod_output}</span>
                    </div>
                    <div className="px-4 flex justify-between">
                        <strong>Data:</strong>
                        <span>{out.date_output}</span>
                    </div>
                    <div className="px-4 flex justify-between">
                        <strong>Produto:</strong>
                        <span>{out.products.product}</span>
                    </div>
                    <div className="px-4 flex justify-between">
                        <strong>Quantidade:</strong>
                        <span>{out.qtd_purchase} unit.</span>
                    </div>

                </CardDescription>
            </Card>
        </div>
    );
}
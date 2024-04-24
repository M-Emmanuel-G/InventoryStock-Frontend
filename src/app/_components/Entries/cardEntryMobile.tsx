import { Card, CardDescription, CardTitle } from "@/components/ui/card";

interface CardMobile {
    entry:{
        cod_entries:number,
        date:string,
        qtd:number,
        price:number,
        note_value:number,
        product:{
            product:String,
            cod_product:string,
            entry_time:string,
            qtd_stock:number,
            price:number,
        },
        supplier:{
            supplier:string
            cnpj:string
        }
    }
}

export default function CardEntryMobile({entry}:CardMobile ) {
    
    return (
        <div>
            <Card className="w-[370px] h-[250px] bg-slate-300 my-2">
                <CardTitle className="py-1">
                    <span className="text-xl px-4">{entry.product.product}</span>
                </CardTitle>
                <CardDescription className="text-black flex flex-col justify-center">
                    <div className="mt-1.5 px-4 flex justify-between">
                        <strong>Codigo: </strong>
                        <span>{entry.cod_entries}</span>
                    </div>
                    <div className="mt-1.5 px-4 flex justify-between">
                        <strong>Data:</strong>
                        <span>{entry.date}</span>
                    </div>
                    <div className="mt-1.5 px-4 flex justify-between">
                        <strong>Quantidade: </strong>
                        <span>{entry.qtd} unit.</span>
                    </div>
                    <div className="mt-1.5 px-4 flex justify-between">
                        <strong>Valor da nota: </strong>
                        <span>R$ {Number(entry.note_value).toFixed(2)} </span>
                    </div>
                    <div className="mt-1.5 px-4 flex justify-between">
                        <strong>Preco: </strong>
                        <span>R$ {Number(entry.price).toFixed(2)} </span>
                    </div>
                    <div className="mt-1.5 px-4 flex justify-between">
                        <strong>Fornecedor: </strong>
                        <span>{entry.supplier.supplier}</span>
                    </div>
                    <div className="mt-1.5 px-4 flex justify-between">
                        <strong>CNPJ </strong>
                        <span>{entry.supplier.cnpj}</span>
                    </div>
                </CardDescription>
            </Card>
        </div>
    );
}
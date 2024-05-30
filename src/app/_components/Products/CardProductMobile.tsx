import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import EditProduct from "./drawerEdit";
import DialogDelete from "./dialogDelete";

interface CardMobile {
    
        product:string,
        cod_product:number,
        entry_time:string,
        qtd_stock:number,
        productID:string,
        price:number
        percentage:number
}

export default function CardProdMobile(params:CardMobile ) {
    
    return (
        <div>
            <Card className="w-[370px] h-[150px] bg-slate-300 my-2">
                <CardTitle className="text-center text-xl mt-2 flex justify-between">
                    
                    <span className="px-4">{params.product}</span>

                    <div className="px-4">
                        <EditProduct
                            id={params.productID}
                            product={params.product}
                            percentage={Number(params.percentage)}
                            qtd={params.qtd_stock}
                            price={Number(params.price)}
                        />
                        <DialogDelete
                            id={params.productID}
                        />
                    </div>
                </CardTitle>
                <CardDescription className="text-black flex flex-col justify-center">
                    <div className="mt-1.5 px-4 flex justify-between">
                        <strong>Codigo: </strong>
                        <span>{params.cod_product}</span>
                    </div>
                    <div className="mt-1.5 px-4 flex justify-between">
                        <strong>Data: </strong>
                        <span>{params.entry_time}</span>
                    </div>
                    <div className="mt-1.5 px-4 flex justify-between">
                        <strong>Estoque: </strong>
                        <span>{params.qtd_stock} unit.</span>
                    </div>
                    <div className="mt-1.5 px-4 flex justify-between">
                        <strong>Valor: </strong>
                        <span>R$ {Number(params.price).toFixed(2)}</span>
                    </div>
                </CardDescription>
            </Card>
        </div>
    );
}
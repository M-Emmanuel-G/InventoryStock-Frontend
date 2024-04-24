import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import EditProduct from "./drawerEdit";
import DialogDelete from "./dialogDelete";

interface CardMobile {
    prod:{
        product:String,
        cod_product:number,
        entry_time:string,
        qtd_stock:number,
        price:number,
    },
    productID:string,
}

export default function CardProdMobile({prod, productID}:CardMobile ) {
    
    return (
        <div>
            <Card className="w-[370px] h-[150px] bg-slate-300 my-2">
                <CardTitle className="text-center text-xl mt-2 flex justify-between">
                    
                    <span className="px-4">{prod.product}</span>

                    <div className="px-4">
                        <EditProduct
                            id={productID}
                        />
                        <DialogDelete
                            id={productID}
                        />
                    </div>
                </CardTitle>
                <CardDescription className="text-black flex flex-col justify-center">
                    <div className="mt-1.5 px-4 flex justify-between">
                        <strong>Codigo: </strong>
                        <span>{prod.cod_product}</span>
                    </div>
                    <div className="mt-1.5 px-4 flex justify-between">
                        <strong>Data: </strong>
                        <span>{prod.entry_time}</span>
                    </div>
                    <div className="mt-1.5 px-4 flex justify-between">
                        <strong>Estoque: </strong>
                        <span>{prod.qtd_stock} unit.</span>
                    </div>
                    <div className="mt-1.5 px-4 flex justify-between">
                        <strong>Valor: </strong>
                        <span>R$ {Number(prod.price).toFixed(2)}</span>
                    </div>
                </CardDescription>
            </Card>
        </div>
    );
}
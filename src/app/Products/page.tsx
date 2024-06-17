import AddProducts from "../_components/Products/addProducts";
import DialogDelete from "../_components/Products/dialogDelete";
import EditProduct from "../_components/Products/drawerEdit";
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
import CardProdMobile from "../_components/Products/CardProductMobile";
import { db } from "../_lib/prisma";
import { Products } from "@prisma/client";
  

export default async function Products() {

    const getProducts = await db.products.findMany({
        orderBy:{
            cod_product:"desc"
        }
    })
    
    
    const showProducts = getProducts.filter((prod:any)=>{ return prod.product.includes("")}).map((prod:Products, key:number)=>{
        
        return(
            <TableRow key={key}>
                <TableCell className="font-medium">{prod.cod_product}</TableCell>
                <TableCell>{prod.entry_time}</TableCell>
                <TableCell>{prod.product}</TableCell>
                <TableCell>{prod.qtd_stock} unit.</TableCell>
                <TableCell>R$ {Number(prod.price).toFixed(2)}</TableCell>
                <TableCell>R$ {Number(prod.price) * Number(prod.sales_percentage)}</TableCell>

                <TableCell className="text-right">
                    <EditProduct
                        id={prod.id}
                        product={prod.product}
                        percentage={Number(prod.sales_percentage)}
                        qtd={prod.qtd_stock}
                        price={Number(prod.price)}
                        
                    />
                    <DialogDelete
                        id={prod.id}
                    />
                </TableCell>
            </TableRow>
        )
    })

    const showProductsMobile = getProducts.filter((prod:any)=>{ return prod.product.includes("")}).map((prod:Products, key:number)=>{
        return(
            <CardProdMobile
                key={key}
                cod_product={prod.cod_product}
                percentage={Number(prod.sales_percentage)}
                product={prod.product}
                price={Number(prod.price)}
                qtd_stock={Number(prod.qtd_stock)}
                productID={prod.id}
                entry_time={prod.entry_time}
            />
        )
    })

    return (
        <main className="w-screen h-screen flex-col justify-center items-center">
            <Header/>
            <section className="w-full h-[90%] flex-col">
                <section className="w-full h-[10%] flex items-center justify-end">
                    {/* <Input
                        className="w-64 h-8 ml-12"
                        placeholder="Buscar..."
                        value={search}
                        onChange={(ev)=>{setSearch(ev.target.value)}}
                    /> */}
                    <AddProducts/>
                </section>
                <section className="hidden sm:flex">

                    <Table>
                        <TableCaption>Lista de produtos!</TableCaption>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[100px]">Codigo</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Produto</TableHead>
                            <TableHead>Estoque</TableHead>
                            <TableHead>Valor de compra</TableHead>
                            <TableHead>Valor de venda</TableHead>
                            <TableHead className="text-right">Açôes</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {showProducts}
                        </TableBody>
                    </Table>
                </section>
                <section className="w-full h-[90%] flex flex-col items-center sm:hidden ">
                    {showProductsMobile}
            </section>
            </section>
        </main>
    );
}
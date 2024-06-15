import { Card } from "@/components/ui/card";
import Header from "../_components/header";
import Image from "next/image";
import Link from "next/link";

export default async function Dashboard () {


    

    return (
        <main className="w-screen h-screen flex flex-col">
            <Header/>
            <section className="w-full h-[90%] flex flex-col items-center">
              <Card className="w-80 h-24 bg-red-400 my-2 flex items-center">
                <Link className="mx-4 flex  items-center" href="/Products">
                    <Image 
                        src="https://utfs.io/f/25e05281-b8c6-455c-a7db-d85fcfd0061c-23ez.png" 
                        alt="" 
                        width={0} 
                        height={0} 
                        quality={100} 
                        sizes="100vw"
                        className="w-20 h-20 rounded-3xl mx-2"
                     />
                     <span className="mx-4">Produtos</span>
                </Link>
              </Card>
              <Card className="w-80 h-24 bg-red-400 my-2 flex items-center">
                <Link className="mx-4 flex  items-center" href="/Entries">
                    <Image 
                        src="https://utfs.io/f/42864a78-392f-4277-88a1-9d406049bbc0-qbl3u1.png" 
                        alt="" 
                        width={0} 
                        height={0} 
                        quality={100} 
                        sizes="100vw"
                        className="w-20 h-20 rounded-3xl mx-2"
                    />
                    <span className="mx-4">Entrada de produtos</span>
                </Link>
              </Card>
              <Card className="w-80 h-24 bg-red-400 my-2 flex items-center">
                <Link className="mx-4 flex  items-center" href="/StockOut">
                    <Image 
                        src="https://utfs.io/f/27a9fd0d-1dd3-46fb-9580-c0d0dcf28f16-1bf3aw.png" 
                        alt="" 
                        width={0} 
                        height={0} 
                        quality={100} 
                        sizes="100vw"
                        className="w-20 h-20 rounded-3xl mx-2"
                    />
                    <span className="mx-4"> Saida de Produtos</span>
                </Link>
              </Card>
              <Card className="w-80 h-24 bg-red-400 my-2 flex items-center">
                <Link className="mx-4 flex  items-center" href="/Suppliers">
                    <Image 
                        src="https://utfs.io/f/0a2e0e21-242b-4dfe-ae6c-4cde29882690-tvzlkh.png" 
                        alt="" 
                        width={0} 
                        height={0} 
                        quality={100} 
                        sizes="100vw"
                         className="w-20 h-20 rounded-3xl mx-2"
                    />
                    <span className="mx-4">Fornecedores</span>
                </Link>
              </Card>
              <Card className="w-80 h-24 bg-red-400 my-2 flex items-center">
                <Link className="mx-4 flex  items-center" href="/Clients">
                    <Image 
                        src="https://utfs.io/f/161f0407-9f67-4992-a145-37667e82e2d0-e8ddl4.png" 
                        alt="" 
                        width={0} 
                        height={0} 
                        quality={100} 
                        sizes="100vw"
                        className="w-20 h-20 rounded-3xl mx-2" 
                    />
                    <span className="mx-4">Clientes</span>
                </Link>
              </Card>
            </section>
        </main>
    );
}
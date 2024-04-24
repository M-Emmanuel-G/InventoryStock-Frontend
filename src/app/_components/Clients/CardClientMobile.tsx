import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import UpdateClient from "./updateAuthrization";
import RemoveClientComp from "./removeClient";

interface CardMobile {
    client:{
        address:string,
        available:string,
        id:string,
        contact:string,
        email:string,
        name:string
        cod_client:number
      }
    clientID:string,
}

export default function CardClientMobile({client, clientID}:CardMobile ) {
    
    return (
        <div>
            <Card className="w-[370px] h-[200px] bg-slate-300 my-2">
                <CardTitle className="text-center text-xl mt-2 flex justify-between">
                    
                    <span className="px-4">{client.name}</span>

                    <div className="px-4">
                        <UpdateClient
                            id={clientID}
                            client={client}
                        />
                        <RemoveClientComp
                            id={clientID}
                        />
                    </div>
                </CardTitle>
                <CardDescription className="text-black flex flex-col justify-center">
                    <div className="mt-1.5 px-4 flex justify-between">
                        <strong>Codigo: </strong>
                        <span>{client.cod_client}</span>
                    </div>
                    <div className="mt-1.5 px-4 flex justify-between flex-col">
                        <strong>Endereço: </strong>
                        <span>{client.address}</span>
                    </div>
                    <div className="mt-1.5 px-4 flex justify-between">
                        <strong>Email: </strong>
                        <span>{client.email}</span>
                    </div>
                    <div className="mt-1.5 px-4 flex justify-between">
                        <strong>Contato: </strong>
                        <span>{client.contact}</span>
                    </div>
                  
                </CardDescription>
            </Card>
        </div>
    );
}
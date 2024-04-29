import { Card, CardTitle } from "@/components/ui/card";
import Header from "../_components/header";
import EditProduct from "../_components/Products/drawerEdit";
import AdminUpdateProduct from "../_components/Admin/EditProduct";
import AdminUpdateClient from "../_components/Admin/EditClient";

export default function Admin() {
    return (
        <main className="w-screen h-screen flex flex-col">
        <Header/>
        <section className="w-full h-[10%] flex justify-center items-center">
            <AdminUpdateProduct/>
            <AdminUpdateClient/>
        </section>
        <section className="w-full h-[80%] hidden sm:flex flex-col">
          
        </section>
        <section className="w-full h-[80%] flex flex-col items-center overflow-y-auto sm:hidden">
            
        </section>
    </main>
    );
}
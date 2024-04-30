import Header from "../_components/header";

export default function Report() {
    
    

    return (
        <main className="w-screen h-screen flex flex-col"> 
        <Header/>
        <section className="w-full h-[10%] flex justify-center items-center" >
            <h1>Relatorios</h1>
        </section>
        <section className="w-full h-[80%] sm:flex hidden">
            
        </section>
        <section className="w-full h-[80%] flex  sm:hidden flex-col items-center">

        </section>
    </main>
    );
}
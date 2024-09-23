"use client"
import Banner from "../Components/Home/Banner";
import Login from "../Components/Users/Login.jsx";
import Novedades from "../Components/Home/Novedades.jsx";
import Promotion from "../Components/Home/Promotion.jsx";
import Learning from "@/Components/Learning";

export default function ProductID() {
    return (
        <section style={{ display: "flex", flexDirection: "column", gap: "20px"}}>
            <h2>ESTA ES LA PÁGINA PRINCIPAL, ANTES DE LOGUEARSE.</h2>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: " 0 20px" }}>
                < Banner />
                < Login />
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
                < Novedades/>
            </div>

            <div style={{ display: "flex", padding: " 0 20px" }}>
                < Promotion/>
            </div>

                <Learning />
        </section>
    );
}
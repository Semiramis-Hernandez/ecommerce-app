"use client";
import { GeistSans } from 'geist/font/sans';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Banner from "../../Components/Home/Banner";
import Publicidad from "../../Components/Publicidad";
import "../globals.css";

const UserLayout = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        const userLogin = localStorage.getItem("user_login");
        const role = localStorage.getItem("role");

        if (!userLogin || role !== "User") {
            const currentPath = window.location.pathname;

            if (currentPath !== "/users/create-user" && currentPath !== "/login") {
                router.push("/admin/dashboard");
            }
        }
    }, [router]);

    return (
            <section className={GeistSans.className}>
                <h2>ESTA ES LA PÁGINA DEL USUARIO LOGUEADO! EL LAYOUT, CON BANNER INCLUIDO.</h2>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: " 0 20px"}}>
                    < Banner />
                    <Publicidad />
                </div>
                <main>{children}</main>
            </section>
    );
}

export default UserLayout;
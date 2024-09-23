"use client";
import { GeistSans } from 'geist/font/sans';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import "../globals.css";

const AdminLayout = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        const adminLogin = localStorage.getItem("admin_login");
        const role = localStorage.getItem("role");

        if (!adminLogin || role !== "Admin") {
            router.push("/products");
        }
    }, [router]);


    return (
        <section className={GeistSans.className}>
            <h2>ESTA ES LA PÁGINA DEL ADMINISTRADOR LOGUEADO!</h2>
            <main>{children}</main>
        </section>
    );
}

export default AdminLayout;
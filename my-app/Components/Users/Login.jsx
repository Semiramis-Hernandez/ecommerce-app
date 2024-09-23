"use client"
import "../../Styles/Users/Login.css";
// import Icons from "../../../Media/Icons.jsx";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

const LoginPage = () => {
    const Router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onLogin = async (event) => {
        event.preventDefault();
        if (!email.trim() || !password.trim()) {
            toast.error("Por favor, rellena todos los campos.");
            return;
        }

        const json_body = {
            email: email,
            password: password
        };

        const requestLogin = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(json_body),
        });

        const responseLogin = await requestLogin.json();
        
        if (responseLogin.statusCode === 400) {
            toast.error(responseLogin.message);
            return;
        }
        
        if (responseLogin.statusCode === 200) {
            toast.success(responseLogin.message);
        
            if (responseLogin.data.role === "User") {
                localStorage.setItem("user_login", JSON.stringify(responseLogin.data));
                localStorage.removeItem("admin_login");
                localStorage.setItem("role", responseLogin.data.role);
                Router.push("/users/dashboard");
            } else if (responseLogin.data.role === "Admin") {
                localStorage.setItem("admin_login", JSON.stringify(responseLogin.data));
                localStorage.removeItem("user_login");
                localStorage.setItem("role", responseLogin.data.role);
                Router.push("/admin/dashboard");
            }
        }
    };

    return (
        <section id="containerPrincipal">
            <div id="containerFormLogin">
                <h2 className="titleFormLogin">Iniciar sesión</h2>
                <form id="formLogin" onSubmit={onLogin} method="POST" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "30px", width: "80%" }}>
                    <div id="containerInputEmail" style={{ display: "flex", flexDirection: "column", gap: "5px", width: "100%" }}>
                        <label htmlFor="emailLogin" id="labelEmailLogin" className="labelFormsLogin" >Email:</label>
                        <input
                            type="mail"
                            id="emailLogin"
                            className="inputFormsInicio"
                            name="emailLogin"
                            placeholder="Email..."
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div id="containerInputContrasena" style={{ display: "flex", flexDirection: "column", gap: "5px", width: "100%" }}>
                        <label htmlFor="contraseñaLogin" id="labelContraseñaLogin" className="labelFormsLogin" >Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            className="inputFormsInicio"
                            name="password"
                            placeholder="Digita tu contraseña..."
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <button id="btnLogin" className="btnFormLogin" type="submit">Enviar</button>
                    <div className="containerTextFlip">
                        <Link href="/create-user" className="link">
                            <span className="pFormsLogin">¿Aún no tienes cuenta? Regístrate ya!</span>
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default LoginPage;
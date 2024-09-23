"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import "../../Styles/Products/Register_Form.css"

const UserRegister = () => {
    const Router = useRouter();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [document, setDocument] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const UserData = {
            firstName,
            lastName,
            document,
            address,
            phone,
            email,
            password,
            avatar
        };

        console.log("User Data: ", UserData);

        try {
            const response = await fetch("http://localhost:8000/create-user", {
                method: "POST",
                body: JSON.stringify(UserData),
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(JSON.stringify(errorData));
            }

            console.log("Usuario registrado correctamente");
            toast.success("Te has registrado exitosamente.");
            Router.push("/login");
        } catch (error) {
            console.error("Error al crear el Usuario:", error.message);
        }
    };
    return (
        <section>
            <div id="formContainer">
                <h2 className="titleFormLogin">REGISTRO DE USUARIO</h2>
                <form action="" onSubmit={handleSubmit} method="POST" className="form">
                    <div className="containerInputlLabel">
                        <label className="labelFormsLogin" htmlFor="firstName">Nombre</label>
                        <input className="inputFormsInicio" type="text" name="firstName" id="firstName" placeholder="Escriba su nombre" onChange={(event) => setFirstName(event.target.value)} required />
                    </div>
                    <div className="containerInputlLabel">
                        <label className="labelFormsLogin" htmlFor="lastName">Apellido</label>
                        <input className="inputFormsInicio" type="text" name="lastName" id="lastName" placeholder="Escriba su apellido" onChange={(event) => setLastName(event.target.value)} required />
                    </div>
                    <div className="containerInputlLabel">
                        <label className="labelFormsLogin" htmlFor="document">Documento de identidad</label>
                        <input className="inputFormsInicio" type="text" name="document" id="document" placeholder="Escriba su número de teléfono" onChange={(event) => setDocument(event.target.value)} required />
                    </div>
                    <div className="containerInputlLabel">
                        <label className="labelFormsLogin" htmlFor="address">Dirección</label>
                        <input className="inputFormsInicio" type="text" name="address" id="address" placeholder="Escriba su número de teléfono" onChange={(event) => setAddress(event.target.value)} required />
                    </div>
                    <div className="containerInputlLabel">
                        <label className="labelFormsLogin" htmlFor="phone">Número de teléfono</label>
                        <input className="inputFormsInicio" type="text" name="phone" id="phone" placeholder="Escriba su número de teléfono" onChange={(event) => setPhone(event.target.value)} required />
                    </div>
                    <div className="containerInputlLabel">
                        <label className="labelFormsLogin" htmlFor="email">Correo electrónico</label>
                        <input className="inputFormsInicio" type="mail" name="email" id="email" placeholder="Escriba su correo electrónico" onChange={(event) => setEmail(event.target.value)} required />
                    </div>
                    <div className="containerInputlLabel">
                        <label className="labelFormsLogin" htmlFor="password">Contraseña</label>
                        <input className="inputFormsInicio" type="text" name="password" id="password" placeholder="Escriba su contraseña" onChange={(event) => setPassword(event.target.value)} required />
                    </div>
                    <div className="containerInputlLabel">
                        <label className="labelFormsLogin" htmlFor="avatar">Foto de perfil</label>
                        <input
                            className="inputFormsInicio"
                            type="text"
                            placeholder="Escribe el url de tu foto de perfil"
                            onChange={(event) => setAvatar(event.target.value)}
                            required
                        />
                    </div>
                        <button className="btnFormRegister" type="submit">Registrarme</button>
                </form>
            </div>
        </section>
    );
}

export default UserRegister;
import { useState, useEffect } from "react";
import "../../Styles/Products/Register_Form.css";

const UpdateUser = () => {
    const [user, setUser] = useState({});
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        // Solo ejecuta en el cliente
        const savedUser = localStorage.getItem("user_login");
        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
            setFirstName(parsedUser.firstName || "");
            setLastName(parsedUser.lastName || "");
            setAddress(parsedUser.address || "");
            setPhone(parsedUser.phone || "");
            setPassword(parsedUser.password || "");
            setAvatar(parsedUser.avatar || "");
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedUserData = {
            firstName,
            lastName,
            address,
            phone,
            password,
            avatar,
            email: user.email,
            document: user.document,
        };

        try {
            const response = await fetch(`http://localhost:8000/user/${user.id}`, {
                method: "PUT",
                body: JSON.stringify(updatedUserData),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(JSON.stringify(errorData));
            }

            // Actualizar el usuario en localStorage
            localStorage.setItem("user_login", JSON.stringify({ ...user, ...updatedUserData }));
            alert("Se ha actualizado el usuario exitosamente!");
        } catch (error) {
            console.error("Error al actualizar el usuario:", error.message);
        }
    };

    return (
        <section>
            <div id="formContainer">
                <h2 className="titleFormLogin">ACTUALIZACIÓN DE DATOS</h2>
                <form onSubmit={handleSubmit} className="form">
                    <div className="containerInputlLabel">
                        <label className="labelFormsLogin" htmlFor="firstName">Nombre</label>
                        <input
                            className="inputFormsInicio"
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="Escriba su nombre"
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                            required
                        />
                    </div>
                    <div className="containerInputlLabel">
                        <label className="labelFormsLogin" htmlFor="lastName">Apellido</label>
                        <input
                            className="inputFormsInicio"
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Escriba su apellido"
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                            required
                        />
                    </div>
                    <div className="containerInputlLabel">
                        <label className="labelFormsLogin" htmlFor="address">Dirección</label>
                        <input
                            className="inputFormsInicio"
                            type="text"
                            name="address"
                            id="address"
                            placeholder="Escriba su dirección"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            required
                        />
                    </div>
                    <div className="containerInputlLabel">
                        <label className="labelFormsLogin" htmlFor="phone">Número de teléfono</label>
                        <input
                            className="inputFormsInicio"
                            type="text"
                            name="phone"
                            id="phone"
                            placeholder="Escriba su número de teléfono"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            required
                        />
                    </div>
                    <div className="containerInputlLabel">
                        <label className="labelFormsLogin" htmlFor="password">Contraseña</label>
                        <input
                            className="inputFormsInicio"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Escriba su nueva contraseña"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <div className="containerInputlLabel">
                        <label className="labelFormsLogin" htmlFor="avatar">Avatar URL</label>
                        <input
                            className="inputFormsInicio"
                            type="text"
                            name="avatar"
                            id="avatar"
                            placeholder="Escriba la URL de su avatar"
                            value={avatar}
                            onChange={(event) => setAvatar(event.target.value)}
                            required
                        />
                    </div>
                    <div className="containerInputlLabel">
                        <label className="labelFormsLogin" htmlFor="email">Correo Electrónico</label>
                        <input
                            className="inputFormsInicio"
                            type="email"
                            name="email"
                            id="email"
                            value={user.email || ""}
                            disabled
                        />
                    </div>
                    <div className="containerInputlLabel">
                        <label className="labelFormsLogin" htmlFor="document">Documento</label>
                        <input
                            className="inputFormsInicio"
                            type="text"
                            name="document"
                            id="document"
                            value={user.document || ""}
                            disabled
                        />
                    </div>
                    <button className="btnFormRegister" type="submit">Actualizar Datos</button>
                </form>
            </div>
        </section>
    );
};

export default UpdateUser;
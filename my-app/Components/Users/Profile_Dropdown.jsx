"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import "../../Styles/Users/Profile_Dropdown.css";

const Profile_Dropdown = ( { productId } ) => {
    console.log("Product ID in Profile Dropdown:", productId);

    const router = useRouter();

    const [role, setRole] = useState(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    useEffect(() => {
        // Sincronizar con localStorage cuando el componente se monta
        const storedRole = localStorage.getItem("role");
        if (storedRole) {
            setRole(storedRole);
            setIsDropdownVisible(true);  // Mostrar dropdown si hay sesión activa
        }
    }, []);

    const onLogout = () => {
        localStorage.removeItem("user_login");
        localStorage.removeItem("admin_login");
        localStorage.removeItem("role");

        toast.success("Has cerrado sesión exitosamente, vuelve pronto!");

        setIsDropdownVisible(false);
    };

    // Mostrar el dropdown sólo si isDropdownVisible es true
    if (!isDropdownVisible) return null;

    return (
        <section id="profileDropdownContainer">
            <div id="profileDropdown">
                <Link href="/user/profile" className="linkk" >
                    <span className="link">Mi perfil</span>
                </Link>
                {role === "User" && (
                    <>
                        <Link href="/user/orders" className="linkk">
                            <span className="link">Mis compras</span>
                        </Link>
                        <Link href="/user/favorites" className="linkk">
                            <span className="link">Mis favoritos</span>
                        </Link>
                        <Link href="/users/update-user" className="linkk">
                            <span className="link">Actualizar mis datos</span>
                        </Link>
                    </>
                )}
                {role === "Admin" && (
                    <>
                        <Link href="/admin/sales" className="linkk">
                            <span className="link">Ver ventas</span>
                        </Link>
                        <Link href="/admin/users" className="linkk">
                            <span className="link">Ver usuarios</span>
                        </Link>
                        <Link href="/products" className="linkk">
                            <span className="link">Ver productos</span>
                        </Link>
                        <Link href="/products/create-product" className="linkk">
                            <span className="link">Registrar producto</span>
                        </Link>
                        <Link href={`/products/update-product/${productId}`} className="linkk">
                            <span className="link">Actualizar producto</span>
                        </Link>
                        <Link href={`/products/delete-product/${productId}`} className="linkk">
                            <span className="link">Eliminar producto</span>
                        </Link>
                    </>
                )}
                <Link href="/" className="linkk">
                    <span className="link" onClick={onLogout}>Cerrar sesión</span>
                </Link>
            </div>
        </section>
    )
}

export default Profile_Dropdown
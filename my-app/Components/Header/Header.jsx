"use client"
import { useState } from "react";
import Link from "next/link";
import "../../Styles/Header/Header.css";
import Image from "next/image";
import Logo_Skye_2 from "../../../Media/Logo_Skye_2.png";
import Icons from "../../../Media/Icons.jsx";
import Profile_Dropdown from "../../Components/Users/Profile_Dropdown";

const Header = ({ productId }) => {
    console.log("Product ID in Profile_Dropdown del Header:", productId);
    
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <header>
            <div id="header">
                <div className="links">
                    <Link href="/">
                        <Image src={Logo_Skye_2} alt="Logo" className="logo" priority={true} />
                    </Link>
                    <Link href="" className="link">
                        <span href="" >Crea con Skye</span>
                    </Link>
                    <Link href="/products" className="link">
                        <span href="" >Mis productos</span>
                    </Link>
                </div>

                <h2 className="novedades">¡NOVEDADES PARA TI!</h2>
                <div className="icons">
                    < Icons.Contact />
                    < Icons.BagShopping />
                    < Icons.Favorite />
                    < Icons.Cart />
                    < Icons.User onClick={() => setShowDropdown(!showDropdown)}  />
                </div>
            </div>
                <div>
                {showDropdown && (
                    <Profile_Dropdown productId={productId} />
                )}
                </div>
        </header>
    );
};

export default Header
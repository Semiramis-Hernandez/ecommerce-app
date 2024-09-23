import "../../Styles/Footer/Footer.css";
import Icons from "../../../Media/Icons.jsx";
import Image from "next/image";
import Link from "next/link";
import Logo_Skye_2 from "../../../Media/Logo_Skye_2.png";

const Footer = () => {
    const slowScrollToTop = () => {
        const scrollDuration = 1000;
        const scrollStep = -window.scrollY / (scrollDuration / 15);

        const scroll = () => {
            if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep);
                requestAnimationFrame(scroll);
            }
        };

        requestAnimationFrame(scroll);
    };

    return (
        <footer>
            <div id="footerContainer">
                <button className="footerButton" onClick={slowScrollToTop}>INICIO</button>
                <div className="rowElements">
                    <Link href="/">
                        <Image src={Logo_Skye_2} alt="Logo" className="logo" priority={true} />
                    </Link>
                    <div className="footerCol">
                        <h4>SERVICIOS</h4>
                        <ul>
                            <li><a href="#">Crea con Skye</a></li>
                            <li><a href="/products/">Mis productos</a></li>
                        </ul>
                    </div>
                    <div className="footerCol">
                        <h4>INFORMACIÓN</h4>
                        <ul>
                            <li><a href="#">Contáctame</a></li>
                        </ul>
                    </div>
                </div>
                <div className="socialMediaIcons">
                    <h4>SÍGUEME</h4>
                    <div className="IconsContainer">
                        <a href="https://www.facebook.com/tuperfil" target="_blank" aria-label="Facebook">
                            < Icons.Facebook />
                        </a>
                        <a href="https://www.instagram.com/tuperfil" target="_blank" aria-label="Twitter">
                            < Icons.Instagram />
                        </a>
                        <a href="https://www.whatsapp.com/tuperfil" target="_blank" aria-label="Instagram">
                            < Icons.Whatsappp />
                        </a>
                    </div>
                </div>
                <p>© 2024 Skye. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
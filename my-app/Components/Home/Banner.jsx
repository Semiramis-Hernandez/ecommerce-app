import "../../Styles/Home/Banner.css";
import Image from "next/image";
import Compra_Hazlo from "../../../Media/Compra_Hazlo.jpg";
const Banner = () => {
    return (
        <section id="bannerContainer">
            <div className="bannerInfoContainer">
                <div className="bannerInfo">
                    <h2>Sólo COMPRA lo que más te gusta o</h2>
                    <h2>¡HAZLO TU MISMO!</h2>
                    <p>¡No te quedes sin tu ropa favorita!</p>
                </div>
                <div className="bannerButtons">
                    <button>Comprar</button>
                    <button>¡Quiero hacerlo!</button>
                </div>
            </div>
            <div className="bannerImageContainer">
                <Image src={Compra_Hazlo} alt="Logo" className="maskedImage"/>
            </div>
        </section>
    );
};

export default Banner;
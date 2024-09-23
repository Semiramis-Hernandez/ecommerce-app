import "../../Styles/Home/Promotion.css";
import Image from "next/image";
import Yo from "../../../Media/Yo.jpg";
const Banner = () => {
    return (
        <section id="bannerTwoContainer">
            <div className="bannerInfoContainer">
                <div className="bannerInfo">
                    <h2>APRENDER PARA EMPRENDER</h2>
                    <h2>¡Crea prendas de vestir de manera fácil y rápida!</h2>
                    <p>Clases pregrabadas, asesorias personalizadas:</p>
                    <p>Aprenderás: toma de medidas, patronaje y confección.</p>
                    <div className="bannerButtons">
                        <button>¡QUIERO!</button>
                    </div>
                </div>
            </div>
            <div className="bannerImageContainer">
                <Image src={Yo} alt="Imagen de Semiramis" className="Imgme"/>
            </div>
        </section>
    );
};

export default Banner;
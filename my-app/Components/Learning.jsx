// "use client"
import Image from "next/image";
import Patronaje from "../../Media/Patronaje.png";
import Confección from "../../Media/Confección.png";
import Patronaje_Confección from "../../Media/Patronaje_Confección.png";
import Falda from "../../Media/Falda.png";
import Set_Lenceria from "../../Media/Set_Lenceria.png";
import "../Styles/Home/Learning.css";

const PorQueLesMotors = () => {
    return (
        <section id="containerPpal">
                <div className="learnContainer">
                    <div className="divH2">
                        <h2>LO QUE TENGO PARA ENSEÑARTE</h2>
                    </div>
                    <div className="ImgPContainer">
                        <div className="divsImg">
                            <Image className="stylesImg" src={Patronaje} alt="Escuadra y patrones" />
                            <p className="stylesP">Patronaje</p>
                        </div>
                        <div className="divsImg">
                            <Image className="stylesImg" src={Confección} alt="Máquina de coser" />
                            <p className="stylesP">Confección</p>
                            
                        </div>
                        <div className="divsImg">
                        <Image className="stylesImg" src={Patronaje_Confección} alt="Patrón y costura" />
                            <p className="stylesP">Patronaje y confección</p>
                        </div>
                        <div className="divsImg">
                        <Image className="stylesImg" src={Falda} alt="Patrón y costura" />
                            <p className="stylesP">Patronaje y confección de falda tipo cargo</p>
                        </div>
                        <div className="divsImg">
                        <Image className="stylesImg" src={Set_Lenceria} alt="Patrón y costura" />
                            <p className="stylesP">Patronaje y confección de lencería</p>
                        </div>
                    </div>
                </div>
        </section>
    );
}

export default PorQueLesMotors;
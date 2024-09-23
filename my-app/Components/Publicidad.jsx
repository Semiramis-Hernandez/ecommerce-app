import "../Styles/Publicity.css";
import Icons from "../../Media/Icons.jsx";

const Publicity = () => {

    return (
        <section id="container">
            <div id="publicityContainer">
                <div className="publicityContent">
                    <div className="publicityTitles">
                        <div className="titles">
                            <h4>¿Tienes un negocio?</h4>
                            <p>¿Necesitas expandirte?</p>
                            <p>Podemos ayudarte a desarrollar la página web de tu negocio.</p>
                        </div>
                        <div className="titles">
                            <p className="titleSkye">Skye_dev</p>
                            < Icons.DevMode />
                        </div>
                    </div>

                    <div className="publicityTitles">
                        <p>¿Qué te ofrecemos?</p>
                        <div className="titles">
                            < Icons.Security />
                            <p>¡Datos seguros!</p>
                        </div>
                        <div className="titles">
                            < Icons.Creativity />
                            <p>¡Creatividad!</p>
                        </div>
                        <button>¡Contáctanos!</button>
                    </div>
                </div>

                <div>
                    <small>Esta página fue desarrollada por Skye_dev.</small>
                </div>
            </div>
        </section>
    );
}

export default Publicity;
import "../../Styles/Home/Novedades.css";
import { useState, useEffect } from 'react';
import Link from "next/link";
import Icons from "../../../Media/Icons.jsx";

const Novedades = () => {
    const [images, setImages] = useState([]);

    const getImages = async () => {
        try {
            const request = await fetch('http://localhost:8000/image');
            const data = await request.json();
            setImages(data.data);
            console.log(data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getImages();
    }, []);

    const [posicionActualCarrusel, setPosicionActualCarrusel] = useState(0);
    const moverCarrusel = (direccion) => {
        const maxPosicion = Math.max(0, Math.ceil(images.length / cantidadImages) - 1);
        const nuevaPosicion = Math.min(maxPosicion, Math.max(0, posicionActualCarrusel + direccion));
        setPosicionActualCarrusel(nuevaPosicion);
    };

    const anchoContenedor = 1170;
    const cantidadImages = 7;
    const gap = 20;

    const anchoImage = (anchoContenedor - (cantidadImages - 1) * gap) / cantidadImages;

    const anchoTotalCarrusel = anchoImage * images.length + (images.length - 1) * gap;

    const carruselStyles = {
        transform: `translateX(-${posicionActualCarrusel * (anchoContenedor + gap)}px)`, // Mueve todo el contenedor de 7 imágenes
        width: `${anchoTotalCarrusel}px`, // Ancho total del track
        display: 'flex',
        gap: `${gap}px`,
        transition: 'transform 2.5s ease',
    };

    return (
        <section id="novedadesContainer">
            <div className="containerH1YParrafo">
                <h2 className="novedadesH1">¡Mira las referencias que SKYE tiene para ti!</h2>
            </div>
            <div className="botonesContainer">
                <button className="botones" onClick={() => moverCarrusel(-1)}>
                    < Icons.ArrowLeft />
                </button>

                <div className="containerPpal">
                    <div className="carouselContainer" style={carruselStyles}>
                        {images.map((image, index) => (
                            <Link key={index} href={`/product/${image.id}/${image.name.toLowerCase().replaceAll(" ", "-")}`}>
                                <div key={index} className="imageContainer" >
                                    <img className="image" src={image.first_image} alt={`Product ${image.id}`} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <button className="botones" onClick={() => moverCarrusel(1)}>
                    < Icons.ArrowRight />
                </button>
            </div>
        </section>
    );
}

export default Novedades;
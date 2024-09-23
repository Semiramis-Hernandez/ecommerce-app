"use client"
import { useEffect, useState } from "react";
import "/Styles/Views/Product.css";


export default function ProductPage({ params }) {
    const [product, setProduct] = useState(null);
    const [renderImgPpal, setRenderImgPpal] = useState("");
    const [gallery, setGallery] = useState([]);

    const getProduct = async () => {
        const request = await fetch(`http://localhost:8000/product-by-id/${params.id}`);
        const data = await request.json();
        console.log(data);
        const productData = data.data[0];

        setProduct(productData);
        if (productData.images && productData.images.length > 0) {
            setRenderImgPpal(productData.images[0]);
            setGallery(productData.images);
        }
    };

    useEffect(() => {
        getProduct();
    }, [params.id]);

    if (!product) return <p>Loading...</p>;

    return (
        <section id="containerProduct">
            <div className="product" key={product.id}>
                <div className="productImgs">
                    <img className="productImgOne" src={renderImgPpal} alt={product.name} />
                    <div className="productImgInteractive">
                        {gallery.map((image, index) => (
                            <img
                                className={`productImgsSmall ${renderImgPpal === image ? 'active' : 'clickable'}`}
                                src={image}
                                key={index}
                                alt={product.name}
                                onClick={() => {
                                    if (renderImgPpal === image) return;
                                    setRenderImgPpal(image);
                                }}
                            />
                        ))}
                    </div>
                </div>
                <div className="productInfo">
                    <h3>{product.description}</h3>
                    <strong>Precio: ${product.price}</strong>
                    <div className="productColors">
                        <p className="sizeP">Colores disponibles</p>
                        <div className="productImgColors">
                            {gallery.map((image, index) => (
                                <div className="containerImgColors" key={index}>
                                    <img
                                    className="imgColors"
                                    src={image}
                                    alt={`Color ${index + 1}`}
                                    onClick={() => {
                                        if (renderImgPpal === image) return;
                                        setRenderImgPpal(image);
                                    }}
                                    />
                                    <small>Color {index + 1}</small>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="productSizes">
                        <p className="sizeP">Tallas disponibles</p>
                        <div className="containerProductButton">
                            <button className="sizesButtons">XS</button>
                            <button className="sizesButtons">S</button>
                            <button className="sizesButtons">M</button>
                            <button className="sizesButtons">L</button>
                            <button className="sizesButtons">XL</button>
                        </div>
                    </div>
                    <div className="lastSectionContainer">
                        <div className="containerProductQuantity">
                            <div>
                                <label htmlFor=""><span style={{ "color": "rgb(210,114,230)" }}>Cantidad </span></label>
                                <select className="selectQuantity" name="" id="">
                                    <option value="">1</option>
                                    <option value="">2</option>
                                    <option value="">3</option>
                                    <option value="">4</option>
                                    <option value="">5</option>
                                </select>
                            </div>
                            <button className="buttonCart">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="22.5" viewBox="0 0 576 512">
                                    <path fill="#d272e6" d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                                </svg>
                            </button>
                        </div>
                        <button className="buyButton">Comprar Ahora</button>
                    </div>
                </div>
            </div>
        </section >
    )
}
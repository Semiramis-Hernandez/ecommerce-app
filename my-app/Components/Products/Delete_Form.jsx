"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Delete_Form from "../../Styles/Products/Delete_Form.css";
import ProductIdInput from "../../Components/Reusable/Product_Id_Input";
import Icons from "../../../Media/Icons.jsx";
import "../../Styles/Views/Product.css";

const ProductDelete = ({ params }) => {
    const router = useRouter();
    const [productId, setProductId] = useState('');

    const [product, setProduct] = useState({});
    const [renderImgPpal, setRenderImgPpal] = useState("");
    const [gallery, setGallery] = useState([]);

    const getProduct = async () => {
        const request = await fetch(`http://localhost:8000/product-by-id/${params.slug}`);
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
        if (params && params.slug) {
            getProduct(params.slug);
        }
    }, [params?.slug]);

    if (!product) return <p>Loading...</p>;

    console.log(product);

    const handleSearch = async () => {
        if (!productId) return;

        await getProduct(productId);
        router.push(`/products/delete-product/${productId}`);
    };
    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/delete-product/${params.slug}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error((errorData));
            }
            alert("Se ha eliminado el producto exitosamente!")

            setTimeout(() => {
                router.push(`/products`)
            }, 2000)

            console.log("Producto eliminado correctamente");
        } catch (error) {
            console.error("Error al eliminar el producto:", error.message);
        }
    };

    return (
        <section id="containerPpal">
            <div className="formContainer">
                <form action="" method="PUT" className="form">
                    < ProductIdInput
                        id={productId}
                        setId={setProductId}
                        placeholder="ID del producto a eliminar..."
                        label="Digite el ID del producto que desea eliminar:"
                        onSearch={handleSearch}
                    />

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
                        </div>
                    </div>
                    <button className="buttonDelete" type="submit" onClick={handleDelete}>
                        < Icons.Delete />
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ProductDelete;
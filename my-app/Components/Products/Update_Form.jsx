"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductIdInput from "../../Components/Reusable/Product_Id_Input";
import "../../Styles/Products/Register_Form.css"

const ProductUpdate = ( { productId }) => {
    const router = useRouter();
    const [productById, setProductById] = useState(productId || "");
    const [product, setProduct] = useState({});
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [id_categories, setIdCategories] = useState("");
    const [id_subcategories, setIdSubcategories] = useState("");
    const [id_administrator, setIdAdministrator] = useState("");
    const [inputImage1, setInputImage1] = useState("");
    const [inputImage2, setInputImage2] = useState("");
    const [inputImage3, setInputImage3] = useState("");
    const [inputImage4, setInputImage4] = useState("");
    const [isProductLoaded, setIsProductLoaded] = useState(false);

    useEffect(() => {
        if (productById && isProductLoaded) {
            const getProduct = async () => {
                try {
                    const request = await fetch(`http://localhost:8000/product-by-id/${productById}`);
                    const response = await request.json();
                    if (response.data && response.data.length > 0) {
                        const productData = response.data[0];
                        setProduct(productData);
                        setName(productData.name || "");
                        setDescription(productData.description || "");
                        setPrice(productData.price || "");
                        setStock(productData.stock || "");
                        setIdCategories(productData.id_categories || "");
                        setIdSubcategories(productData.id_subcategories || "");
                        setIdAdministrator(productData.id_administrator || "");
                        setInputImage1(productData.images && productData.images[0] ? productData.images[0] : "");
                        setInputImage2(productData.images && productData.images[1] ? productData.images[1] : "");
                        setInputImage3(productData.images && productData.images[2] ? productData.images[2] : "");
                        setInputImage4(productData.images && productData.images[3] ? productData.images[3] : "");
                    } else {
                        console.error("No se encontró el producto.");
                    }
                } catch (error) {
                    console.error(error);
                }
            };
            getProduct();
            setIsProductLoaded(false);
        }
    }, [productById, isProductLoaded]);

    const handleSearchId = async () => {
        if (!productById) return;
        setIsProductLoaded(true);
        router.push(`/products/update-product/${productById}`);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const images = [
            event.target.inputImage1.value,
            event.target.inputImage2.value,
            event.target.inputImage3.value,
            event.target.inputImage4.value,
        ];
        const productData = {
            name: event.target.name.value,
            description: event.target.description.value,
            price: parseFloat(event.target.price.value),
            stock: parseInt(event.target.stock.value),
            id_categories: parseInt(event.target.id_categories.value),
            id_subcategories: parseInt(event.target.id_subcategories.value),
            id_administrator: parseInt(event.target.id_administrator.value),
            images: images
        };

        console.log("Product Data: ", productData);

        try {
            const response = await fetch(`http://localhost:8000/update-product/${productById}`, {
                method: "PUT",
                body: JSON.stringify(productData),
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(JSON.stringify(errorData));
            }
            alert("Se ha actualizado el producto exitosamente!")

            setTimeout(() => {
                router.push(`/product/${productById}/${product.name.toLowerCase().replaceAll(" ","-")}`)
            }, 2000)

            console.log("Producto actualizado correctamente");
        } catch (error) {
            console.error("Error al actualizar el producto:", error.message);
        }
    };

    return (
        <section>
            <div id="formContainer">
                <h2 className="titleFormLogin">ACTUALIZAR PRODUCTO</h2>
                <form
                    onSubmit={handleSubmit}
                    method="PUT"
                    className="form">

                    < ProductIdInput
                        id={productById}
                        setId={setProductById}
                        placeholder="ID del producto a actualizar..."
                        label="Digite el ID del producto que desea actualizar:"
                        onSearch={handleSearchId}
                    />

                    <div className="containerInputlLabel">
                        <label className="labelFormsLogin" htmlFor="name">Nombre</label>
                        <input
                            className="inputFormsInicio"
                            type="text"
                            name="name"
                            placeholder="Nombre"
                            value={name}
                            onChange={(event) => setName(event.target.value)} required
                        />
                    </div>
                    <div className="containerInputlLabel">
                        <label className="labelFormsLogin" htmlFor="description">Descripción</label>
                        <input
                            className="inputFormsInicio"
                            type="text"
                            name="description"
                            placeholder="Descripción"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)} required
                        />
                    </div>
                    <div className="containerInputlLabel">
                        <label className="labelFormsLogin" htmlFor="price">Precio</label>
                        <input
                            className="inputFormsInicio"
                            type="number"
                            name="price"
                            placeholder="Precio"
                            value={price}
                            onChange={(event) => setPrice(event.target.value)} required
                        />
                    </div>
                    <div className="containerInputlLabel">
                        <label className="labelFormsLogin" htmlFor="stock">Stock</label>
                        <input
                            className="inputFormsInicio"
                            type="number"
                            name="stock"
                            placeholder="Stock"
                            value={stock}
                            onChange={(event) => setStock(event.target.value)} required
                        />
                    </div>

                    <div className="containerInputlLabel">
                        <label className="labelFormsLogin" htmlFor="id_categories">Categoría</label>
                        <select
                            className="inputFormsInicio"
                            name="id_categories"
                            value={id_categories}
                            onChange={(event) => setIdCategories(event.target.value)}
                            required
                        >
                            <option value="" disabled hidden>Seleccione una categoría</option>
                            <option value="1">Tipo de tejido</option>
                            <option value="2">Género</option>
                            <option value="3">Tipo de prenda</option>
                        </select>
                    </div>

                    <div className="containerInputlLabel">
                        <label className="labelFormsLogin" htmlFor="id_subcategories">Subcategoría</label>
                        <select
                            className="inputFormsInicio"
                            name="id_subcategories"
                            value={id_subcategories}
                            onChange={(event) => setIdSubcategories(event.target.value)}
                            required
                        >
                            <option value="" disabled hidden>Seleccione una subcategoría</option>
                            <option value="1">Damas</option>
                            <option value="2">Niñas</option>
                            <option value="3">Niños</option>
                            <option value="4">Caballeros</option>
                            <option value="5">Algodón</option>
                            <option value="6">Seda</option>
                            <option value="7">Cuerina</option>
                        </select>
                    </div>

                    <div className="containerInputlLabel">
                        <label className="labelFormsLogin" htmlFor="id_administrator">Administrador</label>
                        <input
                            className="inputFormsInicio"
                            type="text"
                            name="id_administrator"
                            value={id_administrator}
                            disabled
                            onChange={(event) => setIdAdministrator(event.target.value)}
                        />
                    </div>

                    <div className="inputsImgSizesContainer">
                        <p className="labelFormsLogin">Imágenes</p>
                        <div key="{index}" className="inputsImgSizes">
                            <input
                                className="inputFormsInicio"
                                type="text"
                                name="inputImage1"
                                placeholder="Escribe el url de la imagen #1"
                                value={inputImage1}
                                onChange={(event) => setInputImage1(event.target.value)}
                                required
                            />
                            <input
                                className="inputFormsInicio"
                                type="text"
                                name="inputImage2"
                                placeholder="Escribe el url de la imagen #2"
                                value={inputImage2}
                                onChange={(event) => setInputImage2(event.target.value)}
                                required
                            />
                            <input
                                className="inputFormsInicio"
                                type="text"
                                name="inputImage3"
                                placeholder="Escribe el url de la imagen #3"
                                value={inputImage3}
                                onChange={(event) => setInputImage3(event.target.value)}
                                required
                            />
                            <input
                                className="inputFormsInicio"
                                type="text"
                                name="inputImage4"
                                placeholder="Escribe el url de la imagen #4"
                                value={inputImage4}
                                onChange={(event) => setInputImage4(event.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button className="btnFormRegister" type="submit">Actualizar producto</button>
                </form>
            </div>
        </section>
    );
};

export default ProductUpdate;
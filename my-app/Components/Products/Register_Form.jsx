"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../../Styles/Products/Register_Form.css"

const ProductRegister = () => {
    const Router = useRouter();
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const images = [inputImage1, inputImage2, inputImage3, inputImage4];

        const productData = {
            name,
            description,
            price: parseFloat(price),
            stock: parseInt(stock),
            id_categories: parseInt(id_categories),
            id_subcategories: parseInt(id_subcategories),
            id_administrator: parseInt(id_administrator),
            images
        };

        console.log("Product Data: ", productData);

        try {
            const response = await fetch("http://localhost:8000/create-product", {
                method: "POST",
                body: JSON.stringify(productData),
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(JSON.stringify(errorData));
            }

            console.log("Producto registrado correctamente");
        } catch (error) {
            console.error("Error al crear el producto:", error.message);
        }
    };

    return (
        <section>
            <div id="formContainer">
                <h2 className="titleFormLogin">REGISTRO DE PRODUCTO</h2>
                <form action="" onSubmit={handleSubmit} method="POST" className="form">
                    <div className="containerInputlLabel">
                        <label className="labelFormsLogin" htmlFor="name">Nombre</label>
                        <input className="inputFormsInicio" type="text" name="name" id="name" placeholder="Nombre" onChange={(event) => setName(event.target.value)} required />
                    </div>
                    <div className="containerInputlLabel">
                        <label className="labelFormsLogin" htmlFor="description">Descripción</label>
                        {/* <textarea className="inputFormsInicio" name="description" placeholder="Descripción" /> */}
                        <input className="inputFormsInicio" type="text" name="description" id="description" placeholder="Descripción" onChange={(event) => setDescription(event.target.value)} required />
                    </div>
                    <div className="containerInputlLabel">
                        <label className="labelFormsLogin" htmlFor="price">Precio</label>
                        <input className="inputFormsInicio" type="number" name="price" id="price" placeholder="Precio" onChange={(event) => setPrice(event.target.value)} required />
                    </div>
                    <div className="containerInputlLabel">
                        <label className="labelFormsLogin" htmlFor="stock">Stock</label>
                        <input className="inputFormsInicio" type="number" name="stock" id="stock" placeholder="Stock" onChange={(event) => setStock(event.target.value)} required />
                    </div>

                    <div className="containerInputlLabel">
                        <label className="labelFormsLogin" htmlFor="id_categories">Categoría</label>
                        <select
                            className="inputFormsInicio"
                            name="id_categories"
                            id="id_categories"
                            onChange={(event) => setIdCategories(event.target.value)}
                            required
                        >
                            <option value="">Seleccione una categoría</option>
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
                            id="id_subcategories"
                            onChange={(event) => setIdSubcategories(event.target.value)}
                            required
                        >
                            <option value="">Seleccione una subcategoría</option>
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
                        <input className="inputFormsInicio" type="number" name="id_administrator" id="id_administrator" placeholder="Id del administrador" min={1} max={1} onChange={(event) => setIdAdministrator(event.target.value)} />
                    </div>

                    <div className="inputsImgSizesContainer">
                        <p className="labelFormsLogin">Imágenes</p>
                        <div key="{index}" className="inputsImgSizes">
                            <input
                                className="inputFormsInicio"
                                type="text"
                                placeholder="Escribe el url de la imagen #1"
                                onChange={(event) => setInputImage1(event.target.value)}
                                required
                            />
                            <input
                                className="inputFormsInicio"
                                type="text"
                                placeholder="Escribe el url de la imagen #2"
                                onChange={(event) => setInputImage2(event.target.value)}
                                required
                            />
                            <input
                                className="inputFormsInicio"
                                type="text"
                                placeholder="Escribe el url de la imagen #3"
                                onChange={(event) => setInputImage3(event.target.value)}
                                required
                            />
                            <input
                                className="inputFormsInicio"
                                type="text"
                                placeholder="Escribe el url de la imagen #4"
                                onChange={(event) => setInputImage4(event.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button className="btnFormRegister" type="submit">Registrar producto</button>
                </form>
            </div>
        </section>
    );
}

export default ProductRegister;



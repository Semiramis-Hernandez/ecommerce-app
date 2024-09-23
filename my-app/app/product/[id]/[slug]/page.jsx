"use client"
import Product from "../../../../Components/Views/Product";

export default function ProductID({ params }) {
    return (
        <section>
            <Product params={params}/>
        </section>
    );
}
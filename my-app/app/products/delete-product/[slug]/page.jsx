"use client"
import Delete_Form from "../../../../Components/Products/Delete_Form";

export default function ProductID( { params } ) {
    return (
        <section>
            <Delete_Form params={params} />
        </section>
    );
}
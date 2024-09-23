import Update_Form from "../../../../Components/Products/Update_Form";

export default function ProductID({ params }) {
    const { slug } = params;

    return (
        <section>
            <Update_Form productId={slug} />
        </section>
    );
}
import Icons from "../../../Media/Icons.jsx";
import "../../Styles/Reusable/Product_Id_Input.css";

const ProductIdInput = ( { id, setId, placeholder, label, onSearch } ) => {
    return (
        <div id="containerInputlLabel">
            <label className="labelFormsLogin" htmlFor="Id">{label}</label>
            <div className="search">
                <input
                    className="searchInput"
                    type="number"
                    value={id}
                    placeholder={placeholder}
                    onChange={(e) => setId(e.target.value)}
                    required
                />
                <button type="button" onClick={onSearch} className="searchButton">
                    <Icons.Search />
                </button>
            </div>
        </div>
    );
}

export default ProductIdInput;
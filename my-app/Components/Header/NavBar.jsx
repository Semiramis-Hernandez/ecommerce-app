import { useState } from "react";
import "../../Styles/Header/NavBar.css";
import Icons from "../../../Media/Icons.jsx";

const NavBar = ( {onSearch} ) => {
    const [filterText, setFilterText] = useState("");

    const handleSearch = () => {
        onSearch(filterText);
    }

    return (
        <header>
            <div id="navBar">
                <div className="search">
                    <input type="text" name="" id="" placeholder="Buscar" className="searchInput" value={filterText} onChange={(event) => setFilterText(event.target.value)} />
                    <button type="button" className="searchButton" onClick={handleSearch}>
                        <Icons.Search />
                    </button>
                </div>
                <div className="buttonsContainer">
                        <button>Ropa Íntima</button>
                        <button>Conjuntos</button>
                        <button>Camisas</button>
                        <button>Blusas</button>
                        <button>Vestidos</button>
                        <button>Faldas</button>
                        <button>Shorts</button>
                        <button>Pantalones</button>
                </div>
                <div className="iconsSocialMedia">
                    <a href="https://www.facebook.com/tuperfil" target="_blank" aria-label="Facebook">
                        < Icons.Facebook />
                    </a>
                    <a href="https://www.instagram.com/tuperfil" target="_blank" aria-label="Instagram">
                        < Icons.Instagram />
                    </a>
                    <a href="https://www.whatsapp.com/tuperfil" target="_blank" aria-label="Twitter">
                        < Icons.Whatsappp />
                    </a>
                </div>
            </div>
        </header>
    );
};

export default NavBar
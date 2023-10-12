import React, {useState} from "react";
import { Link } from "react-router-dom";

/* Icons */
import { FaBars } from "react-icons/fa";

/* Styles */
import './Navbar.css';

const Navbar = () => {
    const [addClass, useAddClass] = useState(true);
    const showNavbar = () => useAddClass(prev => !prev);

    const resp_nav = addClass ? 'responsive-nav' : '';

    return (
        <header className="d-flex flex-column">
            <div className="responsive-button pb-2">
                <button className="nav__btn" onClick={showNavbar}>
                    <FaBars />
                </button>
            </div>
            <nav className={'container nav ' + resp_nav}>
                <ul className="list-unstyled d-flex mx-auto mx-md-0 justify-content-center align-items-center mt-2">
                    <li>
                        <Link to={"/"} className="nav__link">
                            Strona Główna
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;

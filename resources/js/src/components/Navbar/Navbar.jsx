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
        <header>
            <div className="responsive-button">
                <button className="nav__btn" onClick={showNavbar}>
                    <FaBars />
                </button>
            </div>
            <nav className={'nav ' + resp_nav}>
                <ul>
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

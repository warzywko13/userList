import React from "react";
import {Routes, Route} from "react-router-dom";

import {Home, NoPage} from '../pages';

import {Navbar} from "../components";

export const Router = () => {
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path={"/"} element={<Home/>} />
                <Route path={"*"} element={<NoPage/>} />
            </Routes>
        </div>
    );
}

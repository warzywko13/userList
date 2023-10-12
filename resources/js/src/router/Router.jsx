import React, { StrictMode } from "react";
import {Routes, Route} from "react-router-dom";

import {Home, Edit, NoPage} from '../pages';

import {Navbar} from "../components";

export const Router = () => {
    return (
        <StrictMode>
            <div>
                <Navbar/>
                <Routes>
                    <Route path={"/"} element={<Home/>} />
                    <Route path={"/add"} element={<Edit/>} />
                    <Route path={"/edit/:id"} element={<Edit/>} />
                    <Route path={"/*"} element={<NoPage/>} />
                </Routes>
            </div>
        </StrictMode>
    );
}

import React from 'react';
import { Link } from "react-router-dom";

const NoPage = () => (
    <div className="notfound">
        <h1>Page Not Found</h1>
        <Link className="notfound__link" to={"/"}>
        Return to Home Page
        </Link>
    </div>
);

export default NoPage;

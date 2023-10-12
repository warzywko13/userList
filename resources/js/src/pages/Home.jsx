import React from "react";
import { useNavigate } from "react-router-dom";
import {List} from '../components';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className={"container mt-2"}>
            <button
                className="btn btn-add mt-4 py-2 px-4"
                onClick={() => navigate("/add")}
            >
                Add New
            </button>

            <List />
        </div>
    );
}

export default Home;

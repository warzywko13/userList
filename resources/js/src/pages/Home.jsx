import React from "react";
import {List} from '../components';

const Home = () => {
    return (
        <div className={"container mt-2"}>
            <button
                className="weather-list__btn btn-add"
            >
                Add New
            </button>

            <List />
        </div>
    );
}

export default Home;

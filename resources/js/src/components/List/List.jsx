import React from 'react';

/* import style */
import './List.css';
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";

const List = () => {
    return (
        <div className={"table-responsive mt-5"}>
            <table className={"weather-list__table w-100"}>
                <thead>
                <tr>
                    <th>Imie</th>
                    <th>Nazwisko</th>
                    <th>Miasto</th>
                    <th>Ulica</th>
                    <th>Kod pocztowy</th>
                    <th>Kraj</th>
                    <th>Edytuj</th>
                    <th>Usuń</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Adam</td>
                    <td>Wawrzyniak</td>
                    <td>Rawicz</td>
                    <td>Grunwaldzka 44</td>
                    <td>63-900</td>
                    <td>Polska</td>
                    <td className={"weather-list__table-btn btn-edit"}>
                        <AiOutlineEdit />
                    </td>
                    <td className={"weather-list__table-btn btn-remove"}>
                        <AiOutlineDelete />
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

    );
}

export default List;

import React from 'react';
import { Link } from 'react-router-dom';
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";

const Item = ({user, deleteData}) => {
    const {id, login, name, surname, city, street, street_number, post_code, country} = user;

  return (
    <tr>
        <td>{login}</td>
        <td>{name}</td>
        <td>{surname}</td>
        <td>{city}</td>
        <td>{street}</td>
        <td>{street_number}</td>
        <td>{post_code}</td>
        <td>{country}</td>
        <td className={"weather-list__table-btn btn-edit"}>
            <Link to={`/edit/${id}`} className='d-block mx-auto'>
                <AiOutlineEdit />
            </Link>
        </td>
        <td className={"weather-list__table-btn btn-remove"}>
            <a onClick={() => deleteData(id)} className='d-block mx-auto'>
                <AiOutlineDelete />
            </a>
        </td>
    </tr>
  );
}

export default Item;
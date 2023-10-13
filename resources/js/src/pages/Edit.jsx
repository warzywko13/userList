import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

import "../../../css/Edit.css";

const Edit = () => {
    const nav = useNavigate();
    const {id} = useParams();

    let h1Text = 'Dodaj użytkownika';
    let submitText = 'Dodaj';

    if(id) {
        h1Text = 'Edytuj użytkownika';
        submitText = 'Edytuj';
    }

    const [login, setLogin] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [streetNumber, setStreetNumber] = useState(0);
    const [localNumber, setLocalNumber] = useState(0);
    const [postCode, setPostCode] = useState('');
    const [country, setCountry] = useState('');

    useEffect(() => {
        if(id) {
            axios({
                method: "GET",
                url: `/api/user`,
                params: {
                    id: id,
                }
            }).then(({data, status}) => {
                if(status == 200) {
                    const {login, name, surname, city, street, street_number, post_code, country} = data;
                    setLogin(login);
                    setName(name);
                    setSurname(surname);
                    setCity(city);
                    setStreet(street);
                    setStreetNumber(street_number);
                    setPostCode(post_code);
                    setCountry(country);
                }
            }).catch(({resp}) => {
    
            });
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios({
            method: "POST",
            url: `/api/add_edit`,
            params: {
                id: id,
                login,
                name,
                surname,
                city,
                street,
                streetNumber,
                localNumber,
                postCode,
                country
            }
        }).then(({resp}) => {
            nav("/");
        }).catch(({resp}) => {

        });
    }

  return (
    <form className='container d-flex flex-column mt-5' onSubmit={handleSubmit}>
        <h1 className='h1 text-center mb-3'>{h1Text}</h1>

        <label>
            Login<span className="add-edit-weather__required">*</span>
            <input
                required
                type="text"
                className="form-control"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
            />
        </label>

        <label className='mt-3'>
            Imie<span className="add-edit-weather__required">*</span>
            <input
                required
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </label>

        <label className='mt-3'>
            Nazwisko<span className="add-edit-weather__required">*</span>
            <input
                required
                type="text"
                className="form-control"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
            />
        </label>

        <label className='mt-3'>
            Miasto<span className="add-edit-weather__required">*</span>
            <input
                required
                type="text"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
        </label>

        <label className='mt-3'>
            Ulica<span className="add-edit-weather__required">*</span>
            <input
                required
                type="text"
                className="form-control"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
            />
        </label>

        <label className='mt-3'>
            Numer domu<span className="add-edit-weather__required">*</span>
            <input
                required
                type="number"
                className="form-control"
                value={streetNumber}
                onChange={(e) => setStreetNumber(e.target.value)}
            />
        </label>

        {/* <label className='mt-3'>
            Numer lokalu
            <input
                type="number"
                className="form-control"
                value={localNumber}
                onChange={(e) => setLocalNumber(e.target.value)}
            />
        </label> */}

        <label className='mt-3'>
            Kod pocztowy<span className="add-edit-weather__required">*</span>
            <input
                required
                type="text"
                className="form-control"
                value={postCode}
                onChange={(e) => setPostCode(e.target.value)}
            />
        </label>

        
        <label className='mt-3'>
            Kraj<span className="add-edit-weather__required">*</span>
            <input
                required
                type="text"
                className="form-control"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
            />
        </label>

        <input
            className="add-edit-weather__submit btn mx-auto my-3 py-2 px-5"
            type="submit"
            value={submitText}
        />
    </form>
  );
}

export default Edit;
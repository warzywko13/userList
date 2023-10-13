import React, { useEffect, useState } from 'react';
import axios from "axios";

import Item from './Item/Item';
import {Loading, Pagination} from '../index';

/* import style */
import './List.css';

const List = () => {
    const [isloading, setIsLoading] = useState(true);
    const [users, getUsers] = useState({
        data: [],
        links: [],
        current_page: 1,
        last_page: 1
    });
    
    const getData = async (url = '/api/list') => {
        setIsLoading(true);

        await axios({
            method: "GET",
            url,
            params: {
                pagination: true
            }
        }).then(({data, status}) => {
            if(status == 200) {
                const {links, current_page, last_page} = data;
                const datas = data.data;
    
                setIsLoading(false);
                getUsers({
                    data: datas,
                    links,
                    current_page,
                    last_page
                });
            }
        }).catch(({resp}) => {

        });
    }

    const deleteData = async (id) => {
        await axios({
            method: "POST",
            url: '/api/delete',
            params: {
                id
            }
        }).then(({status}) => {
            if(status == 200) {
                getData('/api/list?page=' + users.current_page);
            }
        }).catch(({resp}) => {

        });
    }

    useEffect(() => {
       getData();
    }, []);


    const items = users.data.map(user => {
        return <Item user={user} deleteData={deleteData} key={user.id} />
    });

    return (
        isloading ? <Loading/> : 
        (
            <>
                <div className={"table-responsive mt-5"}>
                    <table className={"weather-list__table w-100"}>
                        <thead>
                        <tr>
                            <th>Login</th>
                            <th>Imie</th>
                            <th>Nazwisko</th>
                            <th>Miasto</th>
                            <th>Ulica</th>
                            <th>Numer domu</th>
                            <th>Kod pocztowy</th>
                            <th>Kraj</th>
                            <th>Edytuj</th>
                            <th>Usuń</th>
                        </tr>
                        </thead>
                        <tbody>
                            {items}
                        </tbody>
                    </table>
                </div>
                <Pagination getData={getData} users={users}  />
            </>
        )
    );
}

export default List;

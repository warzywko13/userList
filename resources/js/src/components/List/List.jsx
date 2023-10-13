import React, { useEffect, useState } from 'react';
import axios from "axios";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Item from './Item/Item';
import {Loading, Pagination, Searchbar} from '../index';

/* import style */
import './List.css';

const List = () => {
    const MySwal = withReactContent(Swal);

    const [isloading, setIsLoading] = useState(true);
    const [users, getUsers] = useState({
        data: [],
        links: [],
        current_page: 1,
        last_page: 1
    });
    
    const getData = async (url = '/api/list', like = '') => {
        if(isloading == false) {
            setIsLoading(true);    
        }

        await axios({
            method: "GET",
            url,
            params: {
                pagination: true,
                like: like
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
            Swal.fire('Błąd', '', 'error');
            setIsLoading(false);
        });
    }

    const deleteData = async (id) => {        
        MySwal.fire({
            title: 'Czy napewno chcesz to zrobić?',
            showDenyButton: true,
            confirmButtonText: 'Usuń',
            denyButtonText: `Anuluj`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                setIsLoading(true);
                axios({
                    method: "POST",
                    url: '/api/delete',
                    params: {
                        id
                    }
                }).then(({status}) => {
                    if(status == 200) {
                        getData('/api/list?page=' + users.current_page);
                    } else {
                        Swal.fire('Błąd', '', 'error');
                    }
                    setIsLoading(false);
                }).catch(({resp}) => {
                    Swal.fire('Błąd', '', 'error');
                    setIsLoading(false);
                });
            }
        });          
    }

    useEffect(() => {
       getData();
    }, []);


    const items = users.data.map(user => {
        return <Item user={user} deleteData={deleteData} key={user.id} />
    });

    return (
        <>
            <Searchbar getData={getData} />
            {isloading ? <Loading/> : 
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
            )}
        </>
    );
}

export default List;

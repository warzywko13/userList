import React, {useState} from 'react';

const Searchbar = ({getData}) => {
    const [search, setSearch] = useState('');

    const handleSearch = async (e) => {
        setSearch(e.target.value);

        if(e.target.value.length > 2) {
            getData('/api/list', e.target.value);
        } else if(e.target.value.length == 0) {
            getData();
        }
    }

  return (
    <div className="form-outline mt-5">
        <input type="search" onChange={handleSearch} value={search} className="form-control" placeholder="Szukany użytkownik" aria-label="Search" />
    </div>
  );
}

export default Searchbar;
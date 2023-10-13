import React from 'react';

const Pagination = ({getData, users}) => {

    const {links, current_page, last_page} = users;

    const navLinks = links.map((el, index) => {
        
        const {url, label, active} = el;

        if(label == '&laquo; Previous') {
            if(current_page != 1) {
                return (
                    <li className="page-item" key={index}>
                        <a className="page-link" onClick={() => getData(url)} aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li> 
                );
            }
        } else if(label == 'Next &raquo;') {
            if(current_page != last_page) {
                return (
                    <li className="page-item" key={index}>
                        <a className="page-link" onClick={() => getData(url)} aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                );
            }
        } else {
            return (
                <li className={"page-item " + (active ? 'active' : '')} key={index}>
                    <a className="page-link" onClick={() => getData(url)}>{label}</a>
                </li>
            );
        }
    });

  return (
    <div aria-label="Page navigation example" className='mt-3 float-end'>
        <ul className="pagination">
            {navLinks}
        </ul>
    </div>
  );
}

export default Pagination;
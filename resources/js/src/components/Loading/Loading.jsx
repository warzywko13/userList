import React from 'react';

const Loading = () => {
  return (
    <div className='w-100 d-flex justify-content-center mt-5'>
        <div className="spinner-border mt-5" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
  );
}

export default Loading;
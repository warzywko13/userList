import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import {Router} from './router/Router';

/* Import css */
import '../../css/bootstrap.css';
import '../../css/app.css';

/* Import js */
import '../bootstrap';

export default function App() {
    return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    );
}

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render(<App/>);

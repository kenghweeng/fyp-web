import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';

import "./styles/index.css"

const RouteredApplication = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

ReactDOM.render(RouteredApplication, document.getElementById('root'));


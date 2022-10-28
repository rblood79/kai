/*
* @date         : 2022-11-01
* @description  : App context & router
* @parameter    : none
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import  UserProvider  from './context';
import { BrowserRouter } from "react-router-dom";

import './global.css';
import './index.scss';
import 'remixicon/fonts/remixicon.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter basename={'kai/build/'}>
        <App />
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import Store from './Redux/Store';
import { checkAuthentication } from './Redux/AuthSlice';



const root = ReactDOM.createRoot(document.getElementById('root'));
const jwtToken = localStorage.getItem('jwt');

if (jwtToken) {
  Store.dispatch(checkAuthentication());
}

root.render(
  <React.StrictMode>
    <Provider store={Store}>
    <App />
    </Provider>
  </React.StrictMode>
);



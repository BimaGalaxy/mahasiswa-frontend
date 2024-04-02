import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.baseURL = process.env.REACT_APP_API_URL

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

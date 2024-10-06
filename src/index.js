// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/App.css';
import App from './App';
import { initializeFirebase } from './firebase';

initializeFirebase(); // Initialize Firebase before rendering the app

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

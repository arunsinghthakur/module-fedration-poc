import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './src/Header';
import Footer from './src/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <h1>Body</h1>
    <Footer/>
  </React.StrictMode>
);


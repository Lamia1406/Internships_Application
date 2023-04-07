import './App.css';
import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Product from './Pages/product';
import Home from './Pages/home'
import {Router, Routes, Route } from 'react-router-dom';


function App() {
 
  return(
    <Product/>
  );
}

export default App;

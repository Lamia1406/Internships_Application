import './App.css';
import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './Pages/home';
import Product from './Pages/product';
import Login from './Pages/login';
import Internships from './Pages/internships';
import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './partials/navbar';
import YourApplication from './Pages/yourApp';
import ApplyForInternship from './Pages/applyForInternship';
import Footer from './partials/footer';
import Students from './Pages/students';

function App() {
  const location = useLocation(); // Get the current location

  const isLoginPage = location.pathname === '/login';

  return (
    <>
     
      {!isLoginPage && <NavBar />}
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='product' element={<Product />} />
        <Route path='internships' element={<Internships />} />
        <Route path='yourApp' element={<YourApplication />} />
        <Route path='applyForInternship' element={<ApplyForInternship />} />
        <Route path='students' element={<Students />} />
      </Routes>
      {!isLoginPage && <Footer />}
    </>
  );
}

export default App;

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
import Departments from './Pages/departments';
import {useState} from 'react'
import Signup from 'Pages/sign_up';
import Supervisors from 'Pages/internshipSupervisors';
import Notifications from 'Pages/notifications';

function App() {
  const location = useLocation(); // Get the current location
  const [user,changeUser] = useState("webmaster") 
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';

  return (
    <>
     
      {(!isLoginPage && !isSignupPage) && <NavBar />}
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Home />} />
        <Route path='/product' element={<Product />} />
        <Route path='/internships' element={<Internships />} />
        <Route path='/yourApp' element={<YourApplication />} />
        <Route path='/applyForInternship' element={<ApplyForInternship />} />
        <Route path='/students' element={<Students />} />
        <Route path='/departments' element={<Departments />} />
        <Route path='/supervisors' element={<Supervisors />} />
        <Route path='/notifications' element={<Notifications />} />
      </Routes>
      {(!isLoginPage && !isSignupPage) && user=="student" && <Footer />}
    </>
  );
}

export default App;

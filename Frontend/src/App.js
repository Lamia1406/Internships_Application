import './App.css';
import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './Pages/home';
import Product from './Pages/product';
import Login from './Pages/login';
import Internships from './Pages/internships';
import { Routes, Route, useLocation,Navigate } from 'react-router-dom';
import NavBar from './partials/navbar';
import YourApplication from './Pages/yourApp';
import ApplyForInternship from './Pages/applyForInternship';
import Footer from './partials/footer';
import Students from './Pages/students';
import Departments from './Pages/departments';
import {useState} from 'react'
import Signup from './Pages/sign_up';
import Supervisors from './Pages/internshipSupervisors';
import Notifications from './Pages/notifications';
import { ToastContainer} from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.min.css';
import UserProfil from './Pages/userProfil';
function App() {
  const location = useLocation(); // Get the current location
  const [user,changeUser] = useState("webmaster") 
  const isLoginPage = location.pathname === '/login';
  const isSignupPage = location.pathname === '/signup';
  axios.defaults.withCredentials = true
  const auth = localStorage.getItem("token")

  return (
    <>
     <ToastContainer/>
      {(!isLoginPage && !isSignupPage) && <NavBar />}
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
       {
        auth ?
           <>
            <Route path='/' element={<Home/>}/> 
            <Route path='/product' element={<Product/>}/>
            <Route path='/departments' element={<Departments/>}/> 
            <Route path='/supervisors' element={<Supervisors/>}/> 
            <Route path='/students' element={<Students/>}/> 
            <Route path='/applyForInternship' element={<ApplyForInternship/>}/> 
            <Route path='/yourApp' element={<YourApplication/>}/> 
            <Route path='/internships' element={<Internships/>}/> 
             <Route path="*" element={<Navigate to="/login" />}/>
            <Route path='/notifications' element={<Notifications/>}/>  
        <Route path='/userProfil' element={<UserProfil />} />
           </>
       :
             <Route path="*" element={<Navigate to="/login" />}/>     
       }
      </Routes>
      {(!isLoginPage && !isSignupPage) && <Footer />}
    </>
  );
}

export default App;

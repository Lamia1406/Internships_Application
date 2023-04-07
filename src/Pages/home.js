import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavBar from '../partials/navbar';
import Footer from '../partials/footer';
import ProgressBar from '../partials/progress';
import Button from '../partials/button';


import '../Styles/home.css';

function Home()
{
    const [notif,clearNotif]=useState(true);
    const clearNotifications=()=>
    {
        clearNotif(false);
    }
  return ( 
    <div>
        <NavBar/>
      <div className='container-fluid p-0'>
        <div id='welcome'>
            Welcome, Lamia
        </div>
        {notif && (
            <div id='notifications' >
            <h3 className='h3'> Recent notifications</h3>
            <p className='notif'> Your marks are available</p>
            <p className='notif'> Great news! Your application for the internship has been accepted</p>
            <Button content="Clear" className="dark" onClick={clearNotifications}/>
    </div>
        )}
         <div id='status'>
            <h3 className='h3'> Application status</h3>
            <ProgressBar/>
            <Button content="View Application" className="dark"/>
    </div>
    <Footer/>
    

      </div>

    </div>
  );
}
export default Home; 

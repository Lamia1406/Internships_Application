import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ProgressBar from '../partials/progress';
import Button from '../partials/button';


import HomeClass from '../Styles/home.module.css'
function Home()
{
    const [notif,clearNotif]=useState(true);
    const clearNotifications=()=>
    {
        clearNotif(false);
    }
  return ( 
    <div className={`${HomeClass.page} container-fluid`}>
        <div className= {HomeClass.section}>
        <h2 id={HomeClass.welcome}>
            Welcome, Lamia
        </h2>
        </div>
        {notif && (
            <div className={HomeClass.section} >
           <div id={HomeClass.notifications}>
           <h3 className={HomeClass.h3}> Recent notifications</h3>
            <p className={HomeClass.notif}> Your marks are available</p>
            <p className={HomeClass.notif}> Great news! Your application for the internship has been accepted</p>
            <div className={HomeClass.btn1}>
            <Button content="Clear" color="dark" onClick={clearNotifications} iconClassName="icon"/>

              </div>
            </div>
    </div>
        )}
         <div className={HomeClass.section}>
            <h3 className={HomeClass.h3}> Application status</h3>
            <div className={HomeClass.progressDiv}>
            <ProgressBar/>
            </div>
            <div className={HomeClass.btn2}>
            <Button content="View Application" color={"dark"}/>
            </div>
    </div>
    


    </div>
  );
}
export default Home; 

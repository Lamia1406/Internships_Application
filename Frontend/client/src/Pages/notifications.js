import React from 'react';
import notificationsClass from '../Styles/notifications.module.css'
import { Helmet } from 'react-helmet';
import OneDayNotification from 'partials/oneDayNotification';
import OneNotification from 'partials/oneNotification';
import Sort from '../Images/downArrow.svg'
function Notifications()
{
   
  return ( 
  <>
    <Helmet>
    <title>ConnectU | Notifications</title>
    <meta name='description' content='Notifications'/>
   </Helmet>
    <div className={`${notificationsClass.page} container-fluid`}>
        <div className={` ${notificationsClass.section} `}>
        <h2 className={notificationsClass.h2}>Notifications</h2>
        </div>
        <div className={notificationsClass.section}>
        <div className={`dropdown ${notificationsClass.sortBy}`}>
  <button className={`dropdown-toggle ${notificationsClass.sortBtn}`} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
   last 30 Days <img className={notificationsClass.icon} src={Sort} alt='sort icon'/>
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li className={notificationsClass.category}><button classname={`dropdown-item `} >last 24 Hours</button></li>
    <li className={notificationsClass.category}><button classname={`dropdown-item `} >last 7 Days</button></li>
    <li className={notificationsClass.category}><button classname={`dropdown-item `} >last 30 Days</button></li>
  </ul>
</div>
            <OneDayNotification date = "today" notifications ={
                        <>
                <OneNotification notif= "this is notification 1" time = "11: 24 AM"/>
                <OneNotification notif= "this is notification 2" time = "12:01 PM"/>
                <OneNotification notif= "this is notification 2" time = "12:01 PM"/>
                </>
            }/>
            <OneDayNotification date = "22/04/2023" notifications ={
                        <>
                <OneNotification notif= "this is notification 1" time = "11: 24 AM"/>
                <OneNotification notif= "this is notification 2" time = "12:01 PM"/>
                </>
            } />
            <OneDayNotification date = "19/04/2023" notifications ={
                        <>
                <OneNotification notif= "this is notification 1" time = "11: 24 AM"/>
                <OneNotification notif= "this is notification 2" time = "12:01 PM"/>
                </>
            }
               
            
            />

        </div>

    </div></>
  );
}
export default Notifications;
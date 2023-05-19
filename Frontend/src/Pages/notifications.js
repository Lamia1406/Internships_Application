import React, { useState,useEffect } from 'react';
import notificationsClass from '../Styles/notifications.module.css'
import { Helmet } from 'react-helmet';
import OneDayNotification from '../partials/oneDayNotification';
import OneNotification from '../partials/oneNotification';
import Sort from '../Images/downArrow.svg';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import moment from 'moment';
function Notifications()
{
  const token=jwtDecode(localStorage.getItem("token"))
  const [notifications,setNotifications] = useState([])
  let allNotificationsURL=""
  if(token.userType == "student"){
    allNotificationsURL = `http://localhost:4000/notification//allNotifications/student/${token._id}`;
  }
  if(token.userType == "department responsible"){
     allNotificationsURL = `http://localhost:4000/notification/allNotifications/responsible/${token._id}`
  } 
  if(token.userType == "supervisor"){
     allNotificationsURL = `http://localhost:4000/notification/allNotifications/supervisor/${token._id}`
  } 
  const fetchNotifications = async () => {
    const res = await axios.get(`${allNotificationsURL}`);
    if(res.data.status){
      setNotifications(res.data.notifications)
    }
  }
  useEffect(()=>{
    fetchNotifications();
  },[]);
  const uniqueDates = [...new Set(notifications.map(obj =>obj.date.substr(0, 10)))];
  const notificationsByDate = uniqueDates.map(date =>
    notifications.filter(obj => obj.date.substr(0, 10) === date).map(obj => ({ ...obj }))
  );
  const changDateFormat = (d) => {
    let date = new Date(Date.UTC(
      parseInt(d.substring(0, 4)),  
      parseInt(d.substring(5, 7)) - 1,  
      parseInt(d.substring(8, 10)),  
      parseInt(d.substring(11, 13)), 
      parseInt(d.substring(14, 16)), 
      parseInt(d.substring(17, 19)), 
      parseInt(d.substring(20, 23))  
    ));
  
    date = date.toUTCString();
    console.log(date);
  
    const today = new Date();
    const year = date.substring(12, 16);
    const month = date.substring(8, 11);
    const day = date.substring(5, 7);
  
    if (
      today.getFullYear() == year &&
      today.getMonth() + 1 == new Date(Date.parse(month + " 1, 2000")).getMonth() + 1 &&
      today.getDate() == day
    ) {
      return "today";
    }
    
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (
      yesterday.getFullYear() == year &&
      yesterday.getMonth() + 1 == new Date(Date.parse(month + " 1, 2000")).getMonth() + 1 &&
      yesterday.getDate() == day
    ) {
      return "yesterday";
    }
  
    return `${year}/${month}/${day}`;
  };
  
  const changeTimeFormat = (d)=>{
        const date = new Date(d);
        let hours =  date.getUTCHours()
        let Minutes;
        if(hours >12){
          hours=String(hours-12).padStart(2,"0")
          Minutes = String(date.getUTCMinutes()).padStart(2,'0');
          return `${hours} : ${Minutes} PM`
        }
        else {
          hours=String(hours).padStart(2,"0")
          Minutes = String(date.getUTCMinutes()).padStart(2,'0');
          return `${hours} : ${Minutes} AM`
        }
        
  }
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
{
  Object.values(notificationsByDate).map(specialDate => (
    <OneDayNotification date = {changDateFormat(specialDate[0].date)} notifications ={
    Object.values(specialDate).map(notification =>{
      return <OneNotification notif ={notification.message} time = {changeTimeFormat(notification.date)}/>
    }
      )
    }
    />
  ))
}
          
               
            
          

        </div>

    </div></>
  );
}
export default Notifications;
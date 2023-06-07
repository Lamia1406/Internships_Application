import { useState,useEffect } from 'react';
import notificationsClass from '../Styles/main/notifications.module.css'
import OneDayNotification from '../partials/DatabasePartials/oneDayNotification';
import OneNotification from '../partials/DatabasePartials/oneNotification';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Layout from '../features/Layout';
import changeDateFormat from '../features/changeDateFormat';
import NotAvailable from '../partials/not_available';
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
  
  <Layout pageTitle = "Notifications" header = "Notifications" content ={
    
      notificationsByDate && notificationsByDate.length != 0 ? (
        <div className={notificationsClass.section}>
{
Object.values(notificationsByDate).map(specialDate => (
<OneDayNotification date = {changeDateFormat(specialDate[0].date)} notifications ={
Object.values(specialDate).map(notification =>{
  return <OneNotification notif ={notification.message} time = {changeTimeFormat(notification.date)}/>
}
  )
}
/>
))
}
      
           
        
      

    </div>
      ) :
      <NotAvailable message= "No notifications available in the moment"/>
    
  }/>
   
       

    
  );
}
export default Notifications;
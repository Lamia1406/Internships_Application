import React, {useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ProgressBar from '../partials/progress';
import Button from '../partials/button';
import { Chart as ChartJS, ArcElement,Tooltip,Legend } from 'chart.js';
import HomeClass from '../Styles/home.module.css'
import {Pie} from 'react-chartjs-2';
import {Helmet} from 'react-helmet';
import CreateDepartmentResponsibleAccount from '../partials/createDepartmentResponsibleAccount';
import CreateSupervisorAccount from '../partials/createSupervisorAccount';
import CreateStudentAccount from '../partials/createStudentAccount';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { NavLink } from 'react-router-dom';

ChartJS.register(
  ArcElement
)
function Home()
{
  let allNotificationsURL;
  const user = jwtDecode(localStorage.getItem("token")) 
  if(user.userType == "department responsible"){
    allNotificationsURL = `http://localhost:4000/notification/allNotifications/responsible/${user._id}`
 } 
  if(user.userType == "student"){
    allNotificationsURL = `http://localhost:4000/notification/allNotifications/student/${user._id}`
 } 
 const [notifications,setNotifications]=useState([])
 const fetchNotifications = async () => {
   const res = await axios.get(`${allNotificationsURL}`);
   if(res.data.status){
     setNotifications(res.data.notifications.filter((n)=>{
      const notificationDate = new Date(n.date);
      const today = new Date();
      return (
        notificationDate.getFullYear() === today.getFullYear() &&
        notificationDate.getMonth() === today.getMonth() &&
        notificationDate.getDate() === today.getDate()
      );
    }))
   
   }
 }
 useEffect(()=>{
   fetchNotifications();
 },[]);
    const [notif,clearNotif]=useState(true);
    const clearNotifications=()=>
    {
        clearNotif(false);
    }
    const data ={
      labels: ["unactive","active"],
      datasets:[
        {
          data : [60,100],
          backgroundColor : ['#D9D9D9','#0F3FEB']
        }
      ]
    };
    const data2 ={
      labels: ["enrolled",'not enrolled'],
      datasets:[
        {
          data : [55,235],
          backgroundColor : ['#7F00FF','#D9D9D9']
        }
      ]
    };
  return ( 
   <>
   <Helmet>
    <title>ConnectU | HomePage</title>
    <meta name='description' content='HomePage'/>
   </Helmet>
    <div className={`${HomeClass.page} container-fluid`}>
        <div className= {HomeClass.section}>
        <h2 id={HomeClass.welcome}>
            Welcome, {user.full_name}
        </h2>
        </div>
        {notif && (
            <div className={HomeClass.section} >
           <div id={HomeClass.notifications}>
           <h3 className={HomeClass.h3}> Recent notifications</h3>
            {
              notifications.length == 0  && (
                <p className={HomeClass.notif}> No recent notifications</p>
              )
            }
            {
              notifications.length != 0 && (
                notifications.map( n =>{
                 return <p className={HomeClass.notif}>{n.message}</p>
                }

                )
              )
            }
            <div className={HomeClass.btn1}>
            <Button content="Clear" color="dark" onClick={clearNotifications} iconClassName="icon"/>

              </div>
            </div>
    </div>
        )}
        {user.userType == 'student' && 
        (
          <div className={HomeClass.section}>
          <h3 className={HomeClass.h3}> Application status</h3>
         {user.enrolled == "yes" && (
           <>
           You're enrolled in an internship
           <div className={HomeClass.btn2}>
           <NavLink to="/yourApp">
           <Button content="View Application" color={"dark"}/>
           </NavLink>
           </div></>
         )}
         {user.enrolled == "no" && (
          <>
          <h3 className={HomeClass.notif}>You're not enrolled to any application</h3>
                       <NavLink to='/internships'>
                       <div className={HomeClass.btn1}>
                        <Button content="Apply" color="black"/>

                              </div>
                       </NavLink>
          </>
                        
         )}
         {user.enrolled == "pending" && (
          <>
          <h3 className={HomeClass.notif}>Your sent applications are being reviewed in the moment</h3>
                       
          </>
                        
         )}
          
  </div>
        )}
         {(user.userType == 'webmaster' || user.userType == 'department responsible') &&
( <React.Fragment>
  <div className={`row ${HomeClass.section}`}>
    <div  className='col-lg-6'>
      <div className={HomeClass.pieChartTitle}>
        Active Internships
</div>
    <div className={HomeClass.pieChart}>
    <Pie
    data={data}
    >
    </Pie>
  </div>
  <div className={HomeClass.pieChartPercentage}>
    {(60 * 100 / 160).toFixed(2)}%
  </div>
    </div>
    <div  className='col-lg-6'>
      <div className={HomeClass.pieChartTitle}>
        Current Interns
</div>
    <div className={HomeClass.pieChart}>
    <Pie
    data={data2}
    >
    </Pie>
  </div>
  <div className={HomeClass.pieChartPercentage2}>
    {(55 * 100 / (235 + 55)).toFixed(2)}%
  </div>
    </div>
  </div>

  </React.Fragment>

)}
{user.userType =="webmaster" && (
  <>
   <div className={` row ${HomeClass.accountsBtns} gx-5`}>
    <div className='col-lg-4'>
      <Button content="Create Internship Supervisor Account" color="dark" dataBsToggle="modal" dataBsTarget="#supervisor"/>
    </div>
    <div className='col-lg-4'>
      <Button content= "Create Student Account" color="dark" dataBsToggle="modal" dataBsTarget="#student"/>
    </div>
    <div className='col-lg-4'>
<Button content="Create Department Responsible Account" color="dark" dataBsToggle="modal" dataBsTarget="#depResponsible"/>
   
    </div>

  </div>
  <CreateDepartmentResponsibleAccount modalId="depResponsible"/>
  <CreateSupervisorAccount modalId="supervisor"/>
  <CreateStudentAccount modalId="student"/>
</>
)}
    


    </div>
   </>
  );
}
export default Home; 

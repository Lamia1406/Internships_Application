import React, {useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '../partials/button';
import { Chart as ChartJS, ArcElement,Tooltip,Legend } from 'chart.js';
import HomeClass from '../Styles/main/home.module.css'
import {Pie} from 'react-chartjs-2';
import CreateOneDataRecord from '../partials/Database/createOneDataRecord';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { NavLink } from 'react-router-dom';
import Layout from '../features/Layout';
import NotAvailable from '../partials/not_available'
import OneNotification from '../partials/DatabasePartials/oneNotification';
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
  if(user.userType == "supervisor"){
    allNotificationsURL = `http://localhost:4000/notification/allNotifications/supervisor/${user._id}`
 }
const activeOffersUrl= 'http://localhost:4000/internship/activeOffers'
 const currentInternsUrl= 'http://localhost:4000/internship/currentInterns'
 const [activeInternships,setActiveInternships] = useState([])
 const [currentInterns,setCurrentInterns] = useState([])
 const [notifications,setNotifications]=useState([])
 const fetchData = async () => {
  if(user.userType != "webmaster"){

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
  if(user.userType == "department responsible" || user.userType == "webmaster"){
    const res2 = await axios.get(`${activeOffersUrl}`)
    const res3 = await axios.get(`${currentInternsUrl}`)
    if(res2.data.status && res3.data.status ){
      setActiveInternships(res2.data)
      setCurrentInterns(res3.data)
    }
  }
 }


 useEffect(()=>{
   fetchData();
 },[]);
    const [notif,clearNotif]=useState(true);
    const clearNotifications=()=>
    {
        clearNotif(false);
    }
    const data = {
      datasets: []
    };
    if (activeInternships.length != 0) {
      data.datasets.push({
        data: [
          activeInternships.count,
          activeInternships.postCount - activeInternships.count
        ],
        backgroundColor: ['#D5A6BD', '#D9D9D9']
      });
    } else {
      data.datasets.push({
        data: [0, 10],
        backgroundColor: ['#FFC857', '#C0C0C0']
      });
    }
    
    const data2 = {
      datasets: []
    };
    
    if (currentInterns.length != 0) {
      data2.datasets.push({
        
            data : [ currentInterns.interns,(currentInterns.allInternships-currentInterns.interns)],
            backgroundColor : [ '#A620F9', '#D9D9D9']
         
      });
    }
    else {
      data2.datasets.push({
        data: [0, 10],
        backgroundColor: ['#FFC857', '#C0C0C0']
      });
    }
  return ( 
   <>
   <Layout pageTitle = "HomePage" header = {
     ` Welcome, ${user.full_name}`
   }
   content = { 
    <>
    {notif && user.userType != "webmaster" && (
            <div className={HomeClass.section} >
           <div id={HomeClass.notifications}>
           <h3 className={HomeClass.h3}> Recent notifications</h3>
            {
              notifications.length == 0  && (
                <div className={HomeClass.notif}>
                  <OneNotification notif = " No recent notifications" />
                </div>
              )
            }
            {
              notifications.length != 0 && (
                notifications.map( n =>{
                return <div className={HomeClass.notif}> <OneNotification notif ={n.message}/></div> 
                }

                )
              )
            }
            <div className={HomeClass.btn1}>
            <Button content="Clear" color="grey" onClick={clearNotifications} iconClassName="icon"/>

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
           <NotAvailable message= "You're enrolled in an internship" warning = {false}/>
           <div className={HomeClass.btn1}>
           <NavLink to="/yourApp">
           <Button content="View Application" color="dark"/>
           </NavLink>
           </div></>
         )}
         {user.enrolled == "no" && (
          <>
          <NotAvailable message = "You're not enrolled to any application"/>
                       <NavLink to='/internships'>
                       <div className={HomeClass.btn1}>
                        <Button content="Apply" color="black"/>

                              </div>
                       </NavLink>
          </>
                        
         )}
         {user.enrolled == "pending" && (
          <>
          <NotAvailable message = "Your sent applications are being reviewed in the moment" warning = {false} />          
          </>
                        
         )}
          
  </div>
        )}
           {(user.userType == 'webmaster' || user.userType == 'department responsible') &&
( <React.Fragment>
  <div className={`row ${HomeClass.section}`}>
    <div  className='col-lg-6'>
      <div className={HomeClass.pieChartTitle}>
        Active Offers
</div>
    <div className={HomeClass.pieChart}>
    <Pie
    data={data}
    >
    </Pie>
  </div>
  <div className={HomeClass.pieChartPercentage}>
  {activeInternships && activeInternships.count != 0 ? (
    (activeInternships.count * 100 / activeInternships.postCount).toFixed(2)  
  ): "0"
}
  %
  
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
    {currentInterns && currentInterns.allInternships != 0 ? (
      (currentInterns.interns * 100 / currentInterns.allInternships).toFixed(2) 
    ): "0"
  }
   
  %
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
  <CreateOneDataRecord table="Responsibles" id="depResponsible"  />
  <CreateOneDataRecord table="Supervisors" id="supervisor"/>
  <CreateOneDataRecord table="Students" id="student"/>

</>
)}
    </>


   }/>
        
    


    
   </>
  );
}
export default Home; 

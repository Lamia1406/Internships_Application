import React, {useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '../partials/button';
import { Chart as ChartJS, ArcElement,Tooltip,Legend } from 'chart.js';
import HomeClass from '../Styles/home.module.css'
import {Pie} from 'react-chartjs-2';
import {Helmet} from 'react-helmet';
import CreateOneDataRecord from '../partials/Database/createOneDataRecord';
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
  if(user.userType == "supervisor"){
    allNotificationsURL = `http://localhost:4000/notification/allNotifications/supervisor/${user._id}`
 }
const activeOffersUrl= 'http://localhost:4000/internship/activeOffers'
 const currentInternsUrl= 'http://localhost:4000/internship/currentInterns'
 const [activeInternships,setActiveInternships] = useState([])
 const [currentInterns,setCurrentInterns] = useState([])
 const [notifications,setNotifications]=useState([])
 const [loading,setIsLoading]=useState(false)
 const fetchData = async () => {
  if(user.userType != "webmaster"){
    setIsLoading(true)
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
     setIsLoading(false)
    }
  }
  if(user.userType == "department responsible" || user.userType == "webmaster"){
    setIsLoading(true)
    const res2 = await axios.get(`${activeOffersUrl}`)
    const res3 = await axios.get(`${currentInternsUrl}`)
    if(res2.data.status && res3.data.status ){
      setActiveInternships(res2.data)
      setCurrentInterns(res3.data)
      setIsLoading(false)
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
    if (activeInternships) {
      data.datasets.push({
        data: [
         activeInternships.count,
          activeInternships.postCount - activeInternships.count
        ],
        backgroundColor: ['#D9D9D9', '#20A6F9']
      });
    }
    const data2 = {
      datasets: []
    };
    
    if (currentInterns) {
      data2.datasets.push({
        
            data : [ currentInterns.interns,(currentInterns.allInternships-currentInterns.interns)],
            backgroundColor : ['#A620F9','#D9D9D9']
         
      });
    }
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
        {notif && user.userType != "webmaster" && (
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
        Active Offers
</div>
    <div className={HomeClass.pieChart}>
    <Pie
    data={data}
    >
    </Pie>
  </div>
  <div className={HomeClass.pieChartPercentage}>
  {activeInternships.count && (
    (activeInternships.count * 100 / activeInternships.postCount).toFixed(2) + '%'
  )}
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
    {currentInterns && (
      (currentInterns.interns * 100 / currentInterns.allInternships).toFixed(2) +`%`
    )}
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
    


    </div> 
   </>
  );
}
export default Home; 

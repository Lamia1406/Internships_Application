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
import { NavLink } from 'react-router-dom';

ChartJS.register(
  ArcElement
)
function Home()
{
  const [user,setUser]=useState("")
  useEffect(() => {
    axios.get('http://localhost:4000/v1/user/profil')
      .then(response => {
        setUser(response.data.user);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
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
            <p className={HomeClass.notif}> Your marks are available</p>
            <p className={HomeClass.notif}> Great news! Your application for the internship has been accepted</p>
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
           <div className={HomeClass.progressDiv}>
           <ProgressBar/>
           </div>
           <div className={HomeClass.btn2}>
           <Button content="View Application" color={"dark"}/>
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

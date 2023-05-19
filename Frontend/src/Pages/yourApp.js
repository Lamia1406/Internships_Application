import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from '../Styles/yourApp.module.css';
import  Button  from '../partials/button';
import ProgressBar from '../partials/progress';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
function YourApplication()
{

const studentId = jwtDecode(localStorage.getItem("token"))._id
const getApplication = `http://localhost:4000/internship/allInternships/student/${studentId}`;
const [application, setApplication] = useState([])
const [application2, setApplication2] = useState([])
const [responsible, setResponsible] = useState()
const fetchApp = async () => {
  const res = await axios.get(`${getApplication}`);
  if(res.data.status == true){
    setApplication(res.data.internships)
    setApplication2(res.data.newEstablishments)
    setResponsible(res.data.responsible)
  }
}
useEffect(()=>{
  fetchApp();
},[]);   

          
          
          const changDateFormat = (d) =>{
            const date = new Date(d);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
           return `${year}/${month}/${day}`;
          }
      
      return ( 
            <>
      <Helmet>
      <title>ConnectU | Your Application</title>
      <meta name='description' content='Your Application'/>
     </Helmet>
    <div className={`${App.page} container-fluid`}>
    <div className={`${App.section}`}>
    <p className={App.mainTitle}> Your Application</p> 
            </div>
        {
            application.length != 0 || application2.length != 0 ?  <>
            <div className={`${App.section}`}>
            {
                 application &&  application.map(
                        app => {
                              const accepted = application.filter(a => a.approvedBySupervisor === "accepted").length
                              console.log(accepted)
                             return <div className={App.form}>
                              {
                                    app.approvedByResponsible == "rejected" && (
                                   <>
                                    <div className={`alert alert-danger ${App.alert}`} role="alert">
                                   Rejected By Department Responsible
                                   {
                                    app.rejectionMessage != "" && (
                                          <div className={App.reason}>Reason : {app.rejectionMessage}</div>
                                    )
                                  }
                                  </div>
                                 
                                   </>
                                  ) 
                              }
                              {
                                    app.approvedByResponsible == "accepted" && app.approvedBySupervisor== "pending" && (<div className={`alert alert-warning ${App.alert}`} role="alert">
                                    Accepted By Department Responsible
                                   </div>) 
                              }
                              {
                                    app.approvedBySupervisor == "rejected" && (<div className={`alert alert-danger ${App.alert}`} role="alert">
                                   Rejected By Internship Supervisor
                                  </div>) 
                              }
                              {
                                    app.approvedBySupervisor == "accepted" && (<div className={`alert alert-success ${App.alert}`} role="alert">
                                    Accepted By Internship Supervisor
                                   </div>) 
                              }
              <div className={App.formTitle}> 
              <p>Personal Information</p>
              </div>
              <div className={App.formContent}>
                <div className={`row row-cols-lg-2 ${App.details} gx-5`}>
                <div className={`col ${App.field}`}>
                          <p className={App.label}>
                              Full Name :
                          </p>
                          <p className={App.content}>
                          {app.student.full_name}
                          </p>
                    </div>
                    <div className={`col ${App.field}`}>
                          <p className={App.label}>
                              Student Card :
                          </p>
                          <p className={App.content}>
                               {app.student.student_card_number}
                          </p>
                    </div>
                    <div className={`col ${App.field}`}>
                          <p className={App.label}>
                              Social Security Number:
                          </p>
                          <p className={App.content}>
                          {app.student.social_security_number}

                          </p>
                    </div>
                    <div className={`col ${App.field}`}>
                          <p className={App.label}>
                              Preparing Diploma of:
                          </p>
                          <p className={App.content}>
                          {app.student.level_of_study}
                          </p>
                    </div>
                  
                </div>
             </div>
             <div className={App.formTitle}>
                           <p>Internship Details</p>
                           </div>
                           <div className={App.formContent}>
                <div className={`row row-cols-lg-2 ${App.details} gx-5`}>
                <div className={`col ${App.field}`}>
                                        <p className={App.label}>
                                           Theme :
                                        </p>
                                        <p className={App.content}>
                                        {app.post.title}
              
                                        </p>
                                  </div>
                                  <div className={`col ${App.field}`}>
                                        <p className={App.label}>
                                            Company :
                                        </p>
                                        <p className={App.content}>
                                        {app.post.company.company_name}
              
                                        </p>
                                  </div>  
                                  <div className={`col ${App.field}`}>
                                        <p className={App.label}>
                                           Starting Date :
                                        </p>
                                        <p className={App.content}>
                                              {changDateFormat(app.startingDate)}
                                             
                                        </p>
                                  </div>
                                  <div className={`col ${App.field}`}>
                                        <p className={App.label}>
                                            Ending Date :
                                        </p>
                                        <p className={App.content}>
                                        {changDateFormat(app.endingDate)}
                                        </p>
                                  </div>
                                  <div className={`col ${App.field}`}>
                                        <p className={App.label}>
                                           Duration :
                                        </p>
                                        <p className={App.content}>
                                             {(new Date(app.endingDate) - new Date(app.startingDate)) / (1000 * 60 * 60 * 24) } Days
                                        </p>
                                  </div>
                </div>
             </div>
             <div className={App.formTitle}> 
                        <p>Supervised by</p>
                        </div>

                        <div className={App.formContent}>
                              <div className={`row row-cols-lg-2 ${App.details} gx-5`}>
                              <div className={`col ${App.field}`}>
                                        <p className={App.label}>
                                          Department Responsible
                                        </p>
                                        <p className={App.content}>
                                            {responsible.full_name}
                                        </p>
                                  </div>
                                  <div className={`col ${App.field}`}>
                                        <p className={App.label}>
                                          Email :
                                        </p>
                                        <p className={App.content}>
                                        {responsible.email}
                                        </p>
                                  </div>
                                  <div className={`col ${App.field}`}>
                                        <p className={App.label}>
                                            Fax
                                        </p>
                                        <p className={App.content}>
                                       (+213) 0{responsible.fax}
                                        </p>
                                  </div>
                                  <div className={`col ${App.field}`}>
                                        <p className={App.label}>
                                            Phone Number :
                                        </p>
                                        <p className={App.content}>
                                       (+213) 0{responsible.phone}
                                        </p>
                                  </div>
                                 <div className={`col ${App.field}`}>
                                        <p className={App.label}>
                                          Internship Supervisor :
                                        </p>
                                        <p className={App.content}>
                                              {app.supervisor.full_name}
                                        </p>
                                  </div>
                                  <div className={`col ${App.field}`}>
                                        <p className={App.label}>
                                            Email :
                                        </p>
                                        <p className={App.content}>
                                        {app.supervisor.email}
              
                                        </p>
                                  </div>
                                    
                        
                                   

                                    </div>
                                    </div>
                                    {
                                          app.approvedBySupervisor == "accepted" && accepted > 1 &&(
                                                <div className={App.choose}>
                                                <div className={App.letter}> You've been accepted in more than one internship, you must choose one in order to start your internship </div>
                                                    <div>
                                                    <Button content="Choose Internship" color="black"/>
                                                    </div>
                                                </div>
                                          )
                                    }
                                   {app.approvedByResponsible == "pending" && (
                                     <div className={App.modificationBtns}>
                                     <div>
                                           <Button content="Delete" color="clear"/>
                                         </div>
                                         <div>
                                         <Button content="Modify" color="black"/>
                                         </div>
                                     </div>
                                   )}
            </div>
                        }
                  )
            }
            {
                 application2 &&  application2.map(
                  app => {
                       return <div className={App.form}>
                        {
                                    app.approvedByResponsible == "rejected" && (
                                   <>
                                    <div className={`alert alert-danger ${App.alert}`} role="alert">
                                   Rejected By Department Responsible
                                  </div>
                                  
                                    
                                          
                                    
                                  
                                   </>
                                  ) 
                              }
                              {
                                    app.acceptedByResponsible == "accepted" && (<div className={`alert alert-warning ${App.alert}`} role="alert">
                                    Accepted By Department Responsible
                                   </div>) 
                              }
                              {
                                    app.approvedBySupervisor == "rejected" && (<div className={`alert alert-danger ${App.alert}`} role="alert">
                                   Rejected By Internship Supervisor
                                  </div>) 
                              }
                              {
                                    app.approvedBySupervisor == "accepted" && (<div className={`alert alert-success ${App.alert}`} role="alert">
                                    Accepted By Internship Supervisor
                                   </div>) 
                              }
        <div className={App.formTitle}> 
        <p>Personal Information</p>
        </div>
        <div className={App.formContent}>
          <div className={`row row-cols-lg-2 ${App.details} gx-5`}>
          <div className={`col ${App.field}`}>
                    <p className={App.label}>
                        Full Name :
                    </p>
                    <p className={App.content}>
                    {app.student.full_name}
                    </p>
              </div>
              <div className={`col ${App.field}`}>
                    <p className={App.label}>
                        Student Card
                    </p>
                    <p className={App.content}>
                         {app.student.student_card_number}
                    </p>
              </div>
              <div className={`col ${App.field}`}>
                    <p className={App.label}>
                        Social Security Number:
                    </p>
                    <p className={App.content}>
                    {app.student.social_security_number}

                    </p>
              </div>
              <div className={`col ${App.field}`}>
                    <p className={App.label}>
                        Preparing Diploma of:
                    </p>
                    <p className={App.content}>
                    {app.student.level_of_study}
                    </p>
              </div>
            
          </div>
       </div>
       <div className={App.formTitle}>
                     <p>Internship Details</p>
                     </div>
                     <div className={App.formContent}>
          <div className={`row row-cols-lg-2 ${App.details} gx-5`}>
          <div className={`col ${App.field}`}>
                                  <p className={App.label}>
                                     Theme :
                                  </p>
                                  <p className={App.content}>
                                  {app.theme}
        
                                  </p>
                            </div>
                            <div className={`col ${App.field}`}>
                                  <p className={App.label}>
                                      Company :
                                  </p>
                                  <p className={App.content}>
                                  {app.company}
                                  </p>
                            </div>  
                            <div className={`col ${App.field}`}>
                                  <p className={App.label}>
                                     Starting Date :
                                  </p>
                                  <p className={App.content}>
                                        {changDateFormat(app.startingDate)}
                                       
                                  </p>
                            </div>
                            <div className={`col ${App.field}`}>
                                  <p className={App.label}>
                                      Ending Date :
                                  </p>
                                  <p className={App.content}>
                                  {changDateFormat(app.endingDate)}
                                  </p>
                            </div>
                            <div className={`col ${App.field}`}>
                                  <p className={App.label}>
                                     Duration :
                                  </p>
                                  <p className={App.content}>
                                       {(new Date(app.endingDate) - new Date(app.startingDate)) / (1000 * 60 * 60 * 24) } Days
                                  </p>
                            </div>
          </div>
       </div>
       <div className={App.formTitle}> 
                  <p>Supervised by</p>
                  </div>

                  <div className={App.formContent}>
                        <div className={`row row-cols-lg-2 ${App.details} gx-5`}>
                        <div className={`col ${App.field}`}>
                                  <p className={App.label}>
                                    Department Responsible
                                  </p>
                                  <p className={App.content}>
                                      {responsible.full_name}
                                  </p>
                            </div>
                            <div className={`col ${App.field}`}>
                                  <p className={App.label}>
                                    Email :
                                  </p>
                                  <p className={App.content}>
                                  {responsible.email}
                                  </p>
                            </div>
                            <div className={`col ${App.field}`}>
                                  <p className={App.label}>
                                      Fax
                                  </p>
                                  <p className={App.content}>
                                 (+213) 0{responsible.fax}
                                  </p>
                            </div>
                            <div className={`col ${App.field}`}>
                                  <p className={App.label}>
                                      Phone Number :
                                  </p>
                                  <p className={App.content}>
                                 (+213) 0{responsible.phone}
                                  </p>
                            </div>
                           <div className={`col ${App.field}`}>
                                  <p className={App.label}>
                                    Internship Supervisor :
                                  </p>
                                  <p className={App.content}>
                                        {app.supervisor_name}
                                  </p>
                            </div>
                            <div className={`col ${App.field}`}>
                                  <p className={App.label}>
                                      Email :
                                  </p>
                                  <p className={App.content}>
                                  {app.supervisor_email}
        
                                  </p>
                            </div>
                              
                  
                             

                              </div>
                              </div>
                              <div className={App.modificationBtns}>
                        <div>
                              <Button content="Delete" color="clear"/>
                            </div>
                            <div>
                            <Button content="Modify" color="black"/>
                            </div>
                        </div>
      </div>
                  }
            )
            }
         
  </div>
   
      </>  
            :
           
            application.length == 0 && application2.length == 0 && (
                         <>
                  <div className={`${App.section}`}>
                        <h3 className={App.h3}>You're not enrolled to any application</h3>
                        <NavLink to='/internships'>
                        <div className={App.btn1}>
                        <Button content="Apply" color="black"/>

                              </div>
                        </NavLink>
                  </div>
            </>
            )
           
        }
    

     
  
    
   

    </div>
    </>
  );
}
export default YourApplication;
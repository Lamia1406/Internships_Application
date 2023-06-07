import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '../button';
import axios from 'axios';
import { toast } from 'react-toastify';
import requestClass from '../../Styles/partials/Forms/applyForInternship.module.css'
import { NavLink,useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function DisplayForm(props) {
  const user = jwtDecode(localStorage.getItem("token"))
  const completeInternshipURL=`http://localhost:4000/internship/completeInternship/supervisor/${props.internship}`
  const completeInternship = async () => {
    try{
      const res = await axios.put(`${completeInternshipURL}`);
    if(res.data.status){
      toast.success("Operation Successful")
      window.location.replace("/studentProgress")
    }
    else {
      toast.warn("Operation Failed")
    }
    }
    catch(err){
      toast.error(err.response.data.error)
      console.log(err.response.data.error)
    }
  }
    
  return (
          <div className={requestClass.form}>
            <div className={requestClass.formHeader}>
            {
             user.userType == "supervisor" && props.approvedByResponsible == "ongoing" && props.approvedBySupervisor == "ongoing" && (
             <div className={requestClass.completedInternship}> 
               
                 <div>Do you want  mark the internship as completed? Once approved, you won't be able to modify the presences and the marks</div>
             <div className={requestClass.completedInternshipBtn}> <Button content="Yes" color="black" onClick={completeInternship}/></div>
            
              </div>
              )
            }
          
              <div >
              <NavLink to={props.destination}> <button className={requestClass.cancelBtn}> Cancel</button></NavLink>
                    </div>
                  </div>
                  <div className={requestClass.formContent}>
                        <>
                            <div className={`row ${requestClass.inputDiv} gx-5 `}>
                      <div className={`col-lg-7 ${requestClass.title} `}>General discipline and interpersonal relationships </div>
                     <div className={`${requestClass.coheff} col-lg-5 row gx-5`}>
                     <div className={`col-lg-6 ${requestClass.field}`}>
                      {props.discipline.toFixed(2)}
                      </div>
                      <div className={`col-lg-6  `}> /4
                      </div>
                     </div>
                        </div>
                    <div className={`row ${requestClass.inputDiv}  gx-5`}>
                      <div className={`col-lg-7 ${requestClass.title} `}>Work skills and handling abilities</div>
                      <div className={`col-lg-5 ${requestClass.coheff} row gx-5 `}>
                      <div className={`col-lg-6 ${requestClass.field}`}>
                        {props.skills.toFixed(2)}
                      </div>
                      <div className={`col-lg-6 `}> /4
                      </div>
                      </div>
                    </div>
                          <div className={`row ${requestClass.inputDiv} gx-5`}>
                    <div className={`col-lg-7 ${requestClass.title} `}>Initiative/entrepreneurship</div>
                    <div  className={`col-lg-5 ${requestClass.coheff} row gx-5`}>
                    <div className={`col-lg-6 ${requestClass.field}`}>
                    {props.initiative.toFixed(2)}
                    </div>
                    <div  className={`col-lg-6 `}> /4
                      </div>
                    </div>
                  </div>
                  <div className={`row ${requestClass.inputDiv} gx-5`}>
                    <div className={`col-lg-7 ${requestClass.title}`}>Imagination and innovation capabilities</div>
                    <div className={`col-lg-5 ${requestClass.coheff} row gx-5 `}>
                    <div className={`col-lg-6 ${requestClass.field}`}>
                    {props.innovation.toFixed(2)}
                    </div>
                    <div className={`col-lg-6`}> /4
                      </div>
                    </div>
                  </div>
                  <div className={`row ${requestClass.inputDiv} gx-5`}>
                    <div className={`col-lg-7 ${requestClass.title}`}>Knowledge acquired in the internship field</div>
                    <div className={`col-lg-5 ${requestClass.coheff} row gx-5 `}>
                    <div className={`col-lg-6 ${requestClass.field}`}>
                    {props.knowledge.toFixed(2)}
                    </div>
                    <div className={`col-lg-6`}> /4
                      </div>
                    </div>
                  </div>
                 <div className={requestClass.fullEvaluation}>
                 <div className={`row ${requestClass.inputDiv} gx-5`}>
                    <div className={`col-lg-7 ${requestClass.title}`}>Feedback</div>
                    <div className={`col-lg-5 ${requestClass.field}`}>
                    {props.feedback}
                    </div>
                  </div>
                  <div className={`row ${requestClass.inputDiv}  gx-5`}>
                    <div className={`col-lg-7 ${requestClass.title}`}>Full Mark</div>
                   <div className={`col-lg-5 ${requestClass.coheff} row gx-5 `}>
                   <div className={`col-lg-6 ${requestClass.field}`}> 
                    {props.full_mark} 
                    </div>
                    <div className={`col-lg-6 `}> /20</div>
                  </div>
                   </div>
                 </div>
                    
                       
               
                        </>
                        {
                      props.approvedBySupervisor == "ongoing" && props.approvedByResponsible == "ongoing" &&(
                  <div className={requestClass.inputDiv}>
                
                    <div className={requestClass.navigationBtn}>
                     
                        <Button color="white" content="Modify"  />
                        
                    </div>
                  </div>
                      )
                     }

                </div>
          </div>
                
              

           
          
      


    

  );
}
export default DisplayForm; 
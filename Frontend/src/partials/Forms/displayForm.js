import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '../button';

import requestClass from '../../Styles/partials/Forms/applyForInternship.module.css'
import { NavLink,useLocation } from 'react-router-dom';

function DisplayForm(props) {
    
    
  return (
          <div className={requestClass.form}>
            <div className={requestClass.formHeader}>
             <div className={requestClass.completedInternship}> 
             <div>Do you want  mark the internship as completed? Once approved, you won't be able to modify the presences and the marks</div>
             <div className={requestClass.completedInternshipBtn}> <Button content="Yes" color="black"/></div>
              </div>
          
              <div >
              <NavLink to={props.destination}> <button className={requestClass.cancelBtn}> Cancel</button></NavLink>
                    </div>
                  </div>
                  <div className={requestClass.formContent}>
                        <>
                            <div className={`row ${requestClass.inputDiv} gx-5 `}>
                      <div className={`col-lg-7 ${requestClass.title} `}>General discipline and interpersonal relationships </div>
                      <div className={`col-lg-2 ${requestClass.field}`}>
                      {props.discipline.toFixed(2)}
                      </div>
                      <div className={`col-lg-2 `}> /4
                      </div>
                        </div>
                    <div className={`row ${requestClass.inputDiv} gx-5`}>
                      <div className={`col-lg-7 ${requestClass.title} `}>Work skills and handling abilities</div>
                      <div className={`col-lg-2 ${requestClass.field}`}>
                        {props.skills.toFixed(2)}
                      </div>
                      <div className={`col-lg-2 `}> /4
                      </div>
                    </div>
                          <div className={`row ${requestClass.inputDiv} gx-5`}>
                    <div className={`col-lg-7 ${requestClass.title} `}>Initiative/entrepreneurship</div>
                    <div className={`col-lg-2 ${requestClass.field}`}>
                    {props.initiative.toFixed(2)}
                    </div>
                    <div className={`col-lg-2 `}> /4
                      </div>
                  </div>
                  <div className={`row ${requestClass.inputDiv} gx-5`}>
                    <div className={`col-lg-7 ${requestClass.title}`}>Imagination and innovation capabilities</div>
                    <div className={`col-lg-2 ${requestClass.field}`}>
                    {props.innovation.toFixed(2)}
                    </div>
                    <div className={`col-lg-2 `}> /4
                      </div>
                  </div>
                  <div className={`row ${requestClass.inputDiv} gx-5`}>
                    <div className={`col-lg-7 ${requestClass.title}`}>Knowledge acquired in the internship field</div>
                    <div className={`col-lg-2 ${requestClass.field}`}>
                    {props.knowledge.toFixed(2)}
                    </div>
                    <div className={`col-lg-2 `}> /4
                      </div>
                  </div>
                  <div className={`row ${requestClass.inputDiv} gx-5`}>
                    <div className={`col-lg-7 ${requestClass.title}`}>Feedback</div>
                    <div className={`col-lg-5 ${requestClass.field}`}>
                    {props.feedback}
                    </div>
                  </div>
                  <div className={`row ${requestClass.inputDiv} gx-5`}>
                    <div className={`col-lg-7 ${requestClass.title}`}>Full Mark</div>
                    <div className={`col-lg-5 ${requestClass.field}`}>
                    {props.full_mark}
                    </div>
                  </div>
                    
                       
               
                        </>
                    
                  <div className={requestClass.inputDiv}>
                
                    <div className={requestClass.navigationBtn}>
                      <Button color="dark" content="Modify"  />
                    </div>
                  </div>

                </div>
          </div>
                
              

           
          
      


    

  );
}
export default DisplayForm; 
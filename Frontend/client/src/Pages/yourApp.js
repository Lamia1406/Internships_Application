import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from '../Styles/yourApp.module.css';
import  Button  from '../partials/button';
import ProgressBar from '../partials/progress';
import { Helmet } from 'react-helmet';
function YourApplication()
{
   
  return ( 
    <>
      <Helmet>
      <title>ConnectU | Your Application</title>
      <meta name='description' content='Your Application'/>
     </Helmet>
    <div className={`${App.page} container-fluid`}>
        <div className={`${App.section}`}>
          <p className={App.mainTitle}> Your Application</p>
          <div className={App.progressDiv}> <ProgressBar/> </div>
        </div>
        <div className={`${App.section}`}>
                  <div className={App.form}>
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
                                      Lamia Hamdi
                                </p>
                          </div>
                          <div className={`col ${App.field}`}>
                                <p className={App.label}>
                                    Student Card :
                                </p>
                                <p className={App.content}>
                                     181832456
                                </p>
                          </div>
                          <div className={`col ${App.field}`}>
                                <p className={App.label}>
                                    Social Security Number:
                                </p>
                                <p className={App.content}>
                                      123456789
                                </p>
                          </div>
                          <div className={`col ${App.field}`}>
                                <p className={App.label}>
                                    Preparing Diploma of:
                                </p>
                                <p className={App.content}>
                                     Master
                                </p>
                          </div>
                        
                      </div>
                   </div>
                  </div>
                <div className={App.form}>
                <div className={App.formTitle}>
                   <p>Internship Details</p>
                   </div>
                   <div className={App.formContent}>
                      <div className={`row  row-cols-lg-2 row-cols-1 ${App.details} gx-5`}>
                          <div className={`col ${App.field}`}>
                                <p className={App.label}>
                                   Theme :
                                </p>
                                <p className={App.content}>
                                      Graphic Design
                                </p>
                          </div>
                          <div className={`col ${App.field}`}>
                                <p className={App.label}>
                                    Company :
                                </p>
                                <p className={App.content}>
                                     Google
                                </p>
                          </div>
                          <div className={`col ${App.field}`}>
                                <p className={App.label}>
                                   Starting Date :
                                </p>
                                <p className={App.content}>
                                      22-04-2023
                                </p>
                          </div>
                          <div className={`col ${App.field}`}>
                                <p className={App.label}>
                                    Ending Date :
                                </p>
                                <p className={App.content}>
                                     22-05-2023
                                </p>
                          </div>
                          <div className={`col ${App.field}`}>
                                <p className={App.label}>
                                   Duration :
                                </p>
                                <p className={App.content}>
                                      30 Days
                                </p>
                          </div>
                      </div>
                      
                   </div>
                </div>
                <div className={App.form}>
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
                                      Redouane Nouara
                                </p>
                          </div>
                      </div>
                      <div className={`row row-cols-lg-2 ${App.details} gx-5`}>
                          <div className={`col ${App.field}`}>
                                <p className={App.label}>
                                  Email :
                                </p>
                                <p className={App.content}>
                                      redouanenouara@univ-constantine2.dz
                                </p>
                          </div>
                          <div className={`col ${App.field}`}>
                                <p className={App.label}>
                                    Phone Number :
                                </p>
                                <p className={App.content}>
                                     123456789
                                </p>
                          </div>
                      </div>
                      
                      <hr className={App.divider}/>
                      <div className={`row row-cols-lg-2 gx-5 ${App.details}`}>
                      <div className={`col ${App.field}`}>
                                <p className={App.label}>
                                  Internship Supervisor :
                                </p>
                                <p className={App.content}>
                                      Lee Felix
                                </p>
                          </div>
                          <div className={`col ${App.field}`}>
                                <p className={App.label}>
                                    Email :
                                </p>
                                <p className={App.content}>
                                     leefelix@google.com
                                </p>
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
                
                </div>
        </div>
    
     
  
    
   

    </div></>
  );
}
export default YourApplication;
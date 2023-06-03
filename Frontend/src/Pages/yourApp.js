import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from '../Styles/yourApp.module.css';
import Button from '../partials/button';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import InternshipForms from '../partials/InternshipApplication/internshipForms';
function YourApplication() {
      const studentId = jwtDecode(localStorage.getItem("token"))._id
      const getApplication = `http://localhost:4000/internship/allInternships/student/${studentId}`;
      const [application, setApplication] = useState([])
      const [application2, setApplication2] = useState([])
      const [responsible, setResponsible] = useState()
      const fetchApp = async () => {
            const res = await axios.get(`${getApplication}`);
            if (res.data.status == true) {
                  setApplication(res.data.internships)
                  setApplication2(res.data.newEstablishments)
                  setResponsible(res.data.responsible)
            }
      }
      useEffect(() => {
            fetchApp();
      }, []);
      return (
            <>
                  <Helmet>
                        <title>ConnectU | Your Application</title>
                        <meta name='description' content='Your Application' />
                  </Helmet>
                  <div className={`${App.page} container-fluid`}>
                        <div className={`${App.section}`}>
                              <p className={App.mainTitle}> Your Application</p>
                        </div>
                        {
                              application.length != 0 || application2.length != 0 ? <>
                                    <div className={`${App.section}`}>
                                          {
                                                application && application.map(
                                                      app => {
                                                            return <InternshipForms approvedByResponsible={app.approvedByResponsible} rejectionMessage={app.rejectionMessage}
                                                            {...(app.student ?  {studentFullName:app.student.full_name} : {})}
{...(app.student ? {cardNumber :app.student.student_card_number} : {})}
{...(app.student ? {socialNumber :app.student.social_security_number} : {})}
{...(app.student ?  {levelOfStudy :app.student.level_of_study} : {})}
{...(app.post ? {theme :app.post.title}  : {})}
{...(app.post ?{company:app.post.company.full_name}   : {})}
{...(app.post ?{studentId:app.student._id}   : {})}
{...(app.supervisor  ?{supervisorEmail :app.supervisor.email}    : {})}
{...(app.supervisor ?{supervisorName:app.supervisor.full_name}     : {})}


                                                            startingDate={app.startingDate}
                                                                  endingDate={app.endingDate} approvedBySupervisor={app.approvedBySupervisor}
                                                                  responsibleName={responsible.full_name} responsibleEmail={responsible.email} responsibleFax={responsible.fax} responsiblePhone={responsible.phone}
                                                                  internshipId={app._id} isOffer={true} type="student" 
                                                            />
                                                      }
                                                )
                                          }
                                          {
                                                application2 && application2.map(
                                                      app => {

                                                            return <InternshipForms approvedByResponsible={app.approvedByResponsible} message={app.rejectionMessage}
                                                            {...(app.student ?  {studentFullName:app.student.full_name} : {})}
                                                            {...(app.student ? {cardNumber :app.student.student_card_number} : {})}
                                                            {...(app.student ? {socialNumber :app.student.social_security_number} : {})}
                                                            {...(app.student ?  {levelOfStudy :app.student.level_of_study} : {})}
                                                             theme={app.theme} company={app.company} startingDate={app.startingDate}
                                                                  endingDate={app.endingDate} supervisorEmail={app.supervisor_email} supervisorName={app.supervisor_name} approvedBySupervisor={app.approvedBySupervisor}
                                                                  responsibleName={responsible.full_name} responsibleEmail={responsible.email} responsibleFax={responsible.fax} responsiblePhone={responsible.phone}
                                                                  internshipId={app._id} isOffer={false} type="student" 
                                                            />
                                                      }
                                                )}
                                    </div>
                              </>
                                    :
                                    application.length == 0 && application2.length == 0 && (
                                          <>
                                                <div className={`${App.section}`}>
                                                      <h3 className={App.h3}>You're not enrolled to any application</h3>
                                                      <NavLink to='/internships'>
                                                            <div className={App.btn1}>
                                                                  <Button content="Apply" color="black" />

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
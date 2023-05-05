import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Button from '../partials/button';
import Input from '../partials/input'
import Calendar from 'react-calendar';
import RightArrow from '../Images/right-arrow.png'
import LeftArrow from '../Images/left-arrow.png'
import calendarPic from '../Images/calendar.png';
import 'react-calendar/dist/Calendar.css'
import requestClass from '../Styles/applyForInternship.module.css'

function ApplyForInternship() {
  const [activeForm, setActiveForm] = useState(1);
  const [formTitle, setFormTitle] = useState("Student Information");
 
  const handleTabClick = (formNumber) => {
    if(formNumber >0 && formNumber <= 3)
    {
      setActiveForm(formNumber);
    }
    if (formNumber === 1)
    {
      setFormTitle("Student Information")
    }
    else if (formNumber === 2)
    {
      setFormTitle("Internship Details")
    }
    else if (formNumber === 3)
    setFormTitle("Supervised by")
  };

  const [starting, setStartingDate] = useState(new Date())
  const [ending, setEndingDate] = useState(new Date())
  const [dismiss, dismissModal] = useState("");
  const [dismiss2, dismissModal2] = useState("");
  const [message, displayMessage] = useState(false);
  const [message2, displayMessage2] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const [placeholder2, setPlaceholder2] = useState("");

  const startingDate = () => {
    const today = Date.now()
    if (starting < today) {
      setStartingDate(new Date())
      displayMessage(true)
      dismissModal("")
    } else {
      displayMessage(false)
      setStartingDate(starting)
      setPlaceholder(starting.toLocaleDateString())
      dismissModal("modal")
    }
  }

  const endingDate = () => {
    if (ending < starting) {
      console.log(ending)
      console.log(starting)
      setEndingDate(new Date())
      displayMessage2(true)
      dismissModal2("")
      setPlaceholder2("")
    } else {
      console.log(ending)
      console.log("-------")
      console.log(starting)
      displayMessage2(false)
      setEndingDate(ending)
      setPlaceholder2(ending.toLocaleDateString())
      dismissModal2("modal")
    }
  }

  return (
    <div className={`${requestClass.page} container-fluid`}>
      <div className={requestClass.main}>
        <div className={requestClass.section}>
          <h2 className={requestClass.pageTitle}>Internship Application</h2>
        </div>
        <div className={requestClass.section}>
          <div className={requestClass.form}>
            <div className={requestClass.formHeader}>
              <p>Please fill out this form</p>
              <div >
                      <button className={requestClass.cancelBtn}> Cancel</button>
                    </div>
            </div>
            <div >
              <div className={`nav nav-tab  flex-sm-row ${requestClass.formTabs}`}>
                <button
                  className={activeForm === 1 ? `${requestClass.active} ${requestClass.tabBtn}` : `${requestClass.tabBtn}`}
                  onClick={() => handleTabClick(1)}
                >
                  Student Information
                </button>
                <button
                  className={activeForm === 2 ? `${requestClass.active} ${requestClass.tabBtn}` : `${requestClass.tabBtn}`}
                  onClick={() => handleTabClick(2)}
                >
                  Internship Details
                </button>
                <button
                  className={activeForm === 3 ? `${requestClass.active} ${requestClass.tabBtn}` : `${requestClass.tabBtn}`}
                  onClick={() => handleTabClick(3)}
                >
                  Supervised by
                </button>
              </div>
              <div className={requestClass.mobileNavigation}>
                <button className={requestClass.arrows} onClick={() => handleTabClick(activeForm-1)}><img src={LeftArrow} alt='left arrow'/></button>
              <button
                  className={requestClass.active}
                  onClick={() => handleTabClick(1)}
                >
                  {formTitle}
                </button>
                <button  className={requestClass.arrows} onClick={() => handleTabClick(activeForm+1)}><img src={RightArrow} alt='right arrow'/></button>
                
             
              </div>


              {activeForm === 1 && (
                <div className={requestClass.formContent}>
                  <div className={`row ${requestClass.inputDiv}`}>
                    <p className='col-lg-6'>Full Name:</p>
                    <div className={`col-lg-6 ${requestClass.field}`}>
                      <Input />
                    </div>
                  </div>
                  <div className={`row ${requestClass.inputDiv}`}>
                    <p className='col-lg-6'>Student Card</p>
                    <div className={`col-lg-6 ${requestClass.field}`}>
                      <Input />
                    </div>
                  </div>
                  <div className={`row ${requestClass.inputDiv}`}>
                    <p className='col-lg-6'>Social Security Number</p>
                    <div className={`col-lg-6 ${requestClass.field}`}>
                      <Input />
                    </div>
                  </div>
                  <div className={`row ${requestClass.inputDiv}`}>
                    <p className='col-lg-6'>Preparing Diploma of</p>
                    <div className={`col-lg-6 ${requestClass.radio}`}>
                      <div className="form-check-inline ">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        <label className="form-check-label" for="flexRadioDefault1">
                          Licence
                        </label>
                      </div>
                      <div className="form-check-inline ">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        <label className="form-check-label" for="flexRadioDefault1">
                          Master
                        </label>
                      </div>

                    </div>
                  </div>
                  <div className={requestClass.inputDiv}>

                    <div className={requestClass.navigationBtn}>
                      <Button color="dark" content="Next"  onClick={() => handleTabClick(2)}/>
                    </div>
                  </div>

                </div>
              )

              }
              {
                activeForm === 2 && (
                  <div className={requestClass.formContent}>
                    <div className={`row ${requestClass.inputDiv}`}>
                      <p className='col-lg-3'>Theme</p>
                      <div className={`col-lg-9 ${requestClass.field}`}>
                        <Input />
                      </div>
                    </div>
                    <div className={`row ${requestClass.inputDiv}`}>
                      <p className='col-lg-3'>Company</p>
                      <div className={`col-lg-9 ${requestClass.field}`}>
                        <Input />
                      </div>
                    </div>
                    <div className={`row ${requestClass.inputDiv}`}>
                      <p className='col-lg-3'>Starting Date</p>
                      <div className={`col-lg-9 ${requestClass.field}`}>
                        <Input placeholder={placeholder} />
                        <button type="button" className={`btn btn-primary} ${requestClass.calendarBtn}`} data-bs-toggle="modal" data-bs-target="#exampleModal">
                          <img src={calendarPic} alt='calendar icon' />
                        </button>

                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
                          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className={`modal-content ${requestClass.calendarDiv}`}>
                              <div className={`modal-body `}>
                                <Calendar onChange={setStartingDate} value={placeholder} className={requestClass.calendar} />


                                <button data-bs-dismiss={dismiss} className={requestClass.chosenDateBtn} onClick={startingDate}> Submit</button>
                                {
                                  message && (
                                    <div className={requestClass.wrongDateNotif}>
                                      Please enter a recent date
                                    </div>
                                  )
                                }
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                    <div className={`row ${requestClass.inputDiv}`}>
                      <p className='col-lg-3'>Ending Date</p>
                      <div className={`col-lg-9 ${requestClass.field}`}>
                        <Input placeholder={placeholder2} />
                        <button type="button" className={`btn btn-primary} ${requestClass.calendarBtn}`} data-bs-toggle="modal" data-bs-target="#exampleModal">
                          <img src={calendarPic} alt='calendar' />
                        </button>

                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
                          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className={`modal-content ${requestClass.calendarDiv}`}>
                              <div className={`modal-body `}>
                                <Calendar onChange={setEndingDate} value={placeholder2} className={requestClass.calendar} />


                                <button data-bs-dismiss={dismiss2} className={requestClass.chosenDateBtn} onClick={endingDate}> Submit</button>
                                {
                                  message2 && (
                                    <div className={requestClass.wrongDateNotif}>
                                      Your chosen date is older than your chosen starting date
                                    </div>
                                  )
                                }
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                    <div className={`row ${requestClass.inputDiv}`}>
                      <p className='col-lg-3'>Duration</p>
                      <div className={`col-lg-9 ${requestClass.field}`}>
                        <Input placeholder="" />
        

                       

                      </div>
                    </div>

                    <div className={requestClass.inputDiv}>

                      <div className={requestClass.navigationBtn}>
                        <Button color="dark" content="Previous" onClick={() => handleTabClick(1)} />
                      </div>
                      <div className={requestClass.navigationBtn}>
                        <Button color="dark" content="Next" onClick={() => handleTabClick(3)} />
                      </div>
                    </div>

                  </div>
                )
              }
              {
                activeForm === 3 && (
                  <div className={requestClass.formContent}>
                  <div className={`row ${requestClass.inputDiv}`}>
                    <p className='col-lg-3'>Department Responsible</p>
                    <div className={`col-lg-9 ${requestClass.field}`}>
                      <Input />
                    </div>
                  </div>
                  <div className={`row ${requestClass.inputDiv}`}>
                    <p className='col-lg-3'>Email</p>
                    <div className={`col-lg-9 ${requestClass.field}`}>
                      <Input />
                    </div>
                  </div>
                  <div className={`row ${requestClass.inputDiv}`}>
                    <p className='col-lg-3'>Phone Number</p>
                    <div className={`col-lg-9 ${requestClass.field}`}>
                      <Input placeholder={placeholder} />
                    </div>
                  </div>
                  <div className={` ${requestClass.inputDiv}`}>
                   <hr/>
                  
                  </div>
                  <div className={`row ${requestClass.inputDiv}`}>
                    <p className='col-lg-3'>Internship Supervisor</p>
                    <div className={`col-lg-9 ${requestClass.field}`}>
                      <Input placeholder="" />
      

                     

                    </div>
                  </div>
                  <div className={`row ${requestClass.inputDiv}`}>
                    <p className='col-lg-3'>Email</p>
                    <div className={`col-lg-9 ${requestClass.field}`}>
                      <Input placeholder="" />
      

                     

                    </div>
                  </div>

                  <div className={requestClass.inputDiv}>

                    <div className={requestClass.navigationBtn}>
                      <Button color="dark" content="Previous" onClick={() => handleTabClick(2)}/>
                    </div>
                    <div className={requestClass.navigationBtn}>
                      <Button color="dark" content="Submit" />
                    </div>
                  </div>

                </div>
                )
              }

            </div>
          </div>
        </div>


      </div>

    </div>
  );
}
export default ApplyForInternship; 
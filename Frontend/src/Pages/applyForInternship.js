import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Button from '../partials/button';
import Input from '../partials/input'
import Calendar from 'react-calendar';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { toast } from 'react-toastify';
import calendarPic from '../Images/calendar.png';
import 'react-calendar/dist/Calendar.css'
import requestClass from '../Styles/applyForInternship.module.css'
import { NavLink } from 'react-router-dom';
function ApplyForInternship() {
  const [student,setStudentId]=useState(`${jwtDecode(localStorage.getItem("token"))._id}`)
  const createInternshipURL = "http://localhost:4000/internship/createNewEstablishmentInternship";
  const [startingDate, setStartingDate] = useState()
  const [endingDate, setEndingDate] = useState()
  const [cv,setCV] = useState("")
  const [theme,setTheme]=useState("")
  const [company,setCompany]=useState("")
  const [supervisor_name, setSupervisor] = useState("")
  const [supervisor_email, setSupervisorEmail] = useState("")
  const handleImage = (e) =>{
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file)
 }   
 const setFileToBase = (file)=>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = ()=>{
        setCV(reader.result)
    }
}
const submitForm = async (event) => {
    event.preventDefault();
    const payload = {

      startingDate,
      endingDate,
      supervisor_name,
      supervisor_email,
      student,
      theme,
      company,
      cv
    }
    try {
      const res = await axios.post(`${createInternshipURL}`, payload);
      if (res.data.status == true) {
        toast.success("Application Created Successfully")
        setEndingDate("")
        setStartingDate("")
        setSupervisor("")
        setCV("")
        setStudentId("")
        setCompany("")
        setSupervisorEmail("")
        setTheme("")
        window.location.replace("/yourapp")
      }
      else {
        toast.warn("Failed Operation")
      }
    }
    catch (err) {
      toast.error(err.response.data.error)
      console.log(err.response.data.error)
    }
  };
 
     

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
              <NavLink to="/internships"> <button className={requestClass.cancelBtn}> Cancel</button></NavLink>
                    </div>
                  </div>
                  <div className={requestClass.formContent}>
                    <div className={`row ${requestClass.inputDiv}`}>
                      <p className='col-lg-3'>Theme</p>
                      <div className={`col-lg-9 ${requestClass.field}`}>
                      <Input placeholder="please fill this form" type='text' value={theme} onChange={(e)=>setTheme(e.target.value)} />
                      </div>
                    </div>
                    <div className={`row ${requestClass.inputDiv}`}>
                      <p className='col-lg-3'>Company</p>
                      <div className={`col-lg-9 ${requestClass.field}`}>
                      <Input placeholder="please fill this form" type='text' value={company} onChange={(e)=>setCompany(e.target.value)} />

                      </div>
                    </div>
                    <div className={`row ${requestClass.inputDiv}`}>
                  <p className='col-lg-4'>Starting Date</p>
                  <div className={`col-lg-8 ${requestClass.field}`}>
                    <Input value={startingDate} disabled />
                    <button type="button" className={`btn btn-primary} ${requestClass.calendarBtn}`} data-bs-toggle="modal" data-bs-target="#exampleModal">
                      <img src={calendarPic} alt='calendar icon' />
                    </button>
                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className={`modal-content ${requestClass.calendarDiv}`}>
                          <div className={`modal-body  ${requestClass.calendarbody}`}>
                            <Calendar onChange={(e) => setStartingDate(e)} className={requestClass.calendar} calendarType='Arabic' minDate={new Date()} value={startingDate} />
                            <button className={requestClass.chosenDateBtn} data-bs-dismiss="modal" > Submit</button>

                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                <div className={`row ${requestClass.inputDiv}`}>
                  <p className='col-lg-4'>Ending Date</p>
                  <div className={`col-lg-8 ${requestClass.field}`}>
                    <Input placeholder={endingDate} disabled />
                    <button type="button" className={`btn btn-primary} ${requestClass.calendarBtn}`} data-bs-toggle="modal" data-bs-target="#endingModal">
                      <img src={calendarPic} alt='calendar' />
                    </button>

                    <div className="modal fade" id="endingModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className={`modal-content ${requestClass.calendarDiv}`}>
                          <div className={`modal-body `}>
                            <Calendar onChange={(e) => setEndingDate(e)} className={requestClass.calendar} calendarType='Arabic' minDate={startingDate} value={endingDate} />

                            <button className={requestClass.chosenDateBtn} data-bs-dismiss="modal" > Submit</button>

                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                    


                 
                
              
            
                  <div className={`row ${requestClass.inputDiv}`}>
                    <p className='col-lg-3'>Internship Supervisor</p>
                    <div className={`col-lg-9 ${requestClass.field}`}>
                      <Input placeholder="please fill this form" type='text' value={supervisor_name} onChange={(e)=>setSupervisor(e.target.value)} />
                    </div>
                  </div>
                  <div className={`row ${requestClass.inputDiv}`}>
                    <p className='col-lg-3'>Internship Supervisor Email</p>
                    <div className={`col-lg-9 ${requestClass.field}`}>
                      <Input placeholder="please fill this form" type='email' value={supervisor_email} onChange={(e)=>setSupervisorEmail(e.target.value)} />
                
                    </div>
                  </div>

                  <div className={requestClass.inputDiv}>

                
                    <div className={requestClass.navigationBtn}>
                      <Button color="dark" content="Submit" onClick={submitForm} />
                    </div>
                  </div>

                </div>
                
              

            </div>
          </div>
        </div>


      </div>

  );
}
export default ApplyForInternship; 
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Button from '../partials/button';
import Input from '../partials/input'
import Calendar from 'react-calendar';
import calendarPic from '../Images/calendar.png';
import requestClass from '../Styles/applyForExistingInternship.module.css'
import { NavLink,json,useLocation } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
function ApplyForExistingInternship(props) {
  
    
  const location = useLocation();
  const post = location.state.post;
  const company=location.state.company;
  const [student,setStudentId]=useState(`${jwtDecode(localStorage.getItem("token"))._id}`)
  const getAllSupervisors = "http://localhost:4000/user/allSupervisors"
  const createInternshipURL = "http://localhost:4000/internship/createInternship";
  const [startingDate, setStartingDate] = useState()
  const [endingDate, setEndingDate] = useState()
  const [supervisors, setSupervisors] = useState([])
  const [supervisor, setSupervisor] = useState([])
  const [cv,setCV] = useState("")
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
  const fetchSupervisors = async () => {
  
    const res = await axios.get(`${getAllSupervisors}`);
    if (res.data) {
      console.log(res.data)
      setSupervisors(res.data.supervisors)
    }
  }
  useEffect(() => {
    fetchSupervisors();
  }, []);
  const submitForm = async (event) => {
    event.preventDefault();
    const payload = {
      startingDate,
      endingDate,
      supervisor,
      student,
      post,
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
            <div >





              <div className={requestClass.formContent}>
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

                            <button className={requestClass.chosenDateBtn} data-bs-dismiss="modal"> Submit</button>

                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>






                <div className={`row ${requestClass.inputDiv}`}>
                  <p className='col-lg-4'>Internship Supervisor</p>
                  <select className={`col-lg-8 ${requestClass.select}`} onChange={(e) => setSupervisor(e.target.value)} value={supervisor}>
                      <option disabled value="" > Select an Internship Supervisor </option>
                      {supervisors.filter((s) => s.company.company_name == `${company}`).map((s) => (
                        <option key={s._id} value={s._id}>
                          {s.full_name}
                        </option>

                      ))}




                  </select>
                </div>


                <div className={requestClass.inputDiv}>
                <p className='col-lg-4'> Your CV</p>
<div className={`${requestClass.field}`}>
            <Input placeholder="fill this input" type="file" onChange={handleImage}/>
            </div>
                </div>
                <div className={requestClass.inputDiv}>


                  <div className={requestClass.navigationBtn}>
                    <Button color="dark" content="Submit" onClick={submitForm}/>
                  </div>
                </div>

              </div>


            </div>
          </div>
        </div>


      </div>

    </div>
  );
}
export default ApplyForExistingInternship; 
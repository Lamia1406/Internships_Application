import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '../button';
import Input from '../input';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { toast } from 'react-toastify';
import calendarPic from '../../Images/calendar.png';
import requestClass from '../../Styles/partials/Forms/applyForInternship.module.css'
import { NavLink,useLocation } from 'react-router-dom';
import TextArea from '../textarea';
import CalendarDiv from '../calendar';
function FormSample(props) {

    const user = jwtDecode(localStorage.getItem("token"))
    
    
    const getAllSupervisors = "http://localhost:4000/user/allSupervisors"
    const [supervisors, setSupervisors] = useState([])
    const [startingDate, setStartingDate] = useState()
    const [endingDate, setEndingDate] = useState()
    const [theme,setTheme]=useState("")
    const [company,setCompany]=useState("")
    const [supervisor_name, setSupervisorName] = useState("")
    const [supervisor, setSupervisor] = useState("")
    const [supervisor_email, setSupervisorEmail] = useState("")
    const [createInternshipURL,setCreateInternshipURL] = useState("")
    const [post,setPost] = useState("")
    const [student,setStudentId]=useState(``)
    const [innovation,setInnovation]=useState(0)
    const [knowledge,setKnowledge]=useState(0)
    const [feedback,setFeedback]=useState("")
    const [discipline,setDiscipline]=useState(0)
    const [skills,setSkills]=useState(0)
    const [initiative,setInitiative]=useState(0)
      
    const fetchSupervisors = async () => {
  
        const res = await axios.get(`${getAllSupervisors}`);
        if (res.data) {
          setSupervisors(res.data.supervisors.filter((s)=> s.company != null))
          
        }
      }
      const internship = props.internship
    useEffect(()=>{
      if(user.userType == "student"){
        setStudentId(user._id)
      }
      if(user.userType == "supervisor"){
        setStudentId(props.student)
      }
        if(props.isOffer == true){
            setCreateInternshipURL("http://localhost:4000/internship/createInternship")
            fetchSupervisors()
            setCompany(props.company)
            setPost(props.post)
        }
        if(props.isOffer == false){
            setCreateInternshipURL("http://localhost:4000/internship/createNewEstablishmentInternship")
        }
        if(props.formType== "evaluation"){
          setCreateInternshipURL(`http://localhost:4000/internship/evaluateStudent/${student}/${internship}`)
          
        }
        },[company,post,student,internship])
    const submitForm = async (event) => {
        event.preventDefault();
        const payload = {
          ...(props.formType === "application"  && { startingDate } ),
          ...(props.formType === "application"  && { endingDate } ),
           student,
          ...(props.formType === "application"  && { company } ),
          ...(props.isOffer === false  && { supervisor_name } ),
          ...(props.isOffer === false  && { supervisor_email } ),
          ...(props.isOffer === false  && { theme } ),
          ...(props.isOffer === true  && { supervisor } ),
          ...(props.isOffer === true  && { post } ),
          ...(props.formType === "evaluation"  && { innovation } ),
          ...(props.formType === "evaluation"  && { knowledge } ),
          ...(props.formType === "evaluation"  && { feedback } ),
          ...(props.formType === "evaluation"  && { discipline } ),
          ...(props.formType === "evaluation"  && { skills } ),
          ...(props.formType === "evaluation"  && { initiative } ),
          ...(props.formType === "evaluation"  && { internship } ),
          
        }
        try {
          const res = await axios.post(`${createInternshipURL}`, payload);
          if (res.data.status == true) {
            toast.success("Application Created Successfully")
            setEndingDate("")
            setStartingDate("")
            setSupervisor("")
            setStudentId("")
            setCompany("")
            setSupervisorEmail("")
            setTheme("")
           {
            if(props.formType=="application"){
              window.location.replace("/yourapp")
            }
            if(props.formType=="evaluation"){
              window.location.reload()
            }
           }
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
      
          <div className={requestClass.form}>
            <div className={requestClass.formHeader}>
              <p>Please fill out this form</p>
              <div >
              <NavLink to={props.destination}> <button className={requestClass.cancelBtn}> Cancel</button></NavLink>
                    </div>
                  </div>
                  <div className={requestClass.formContent}>
                    {
                      props.formType == "application" && (
                        <>
                        {
                        props.isOffer== false && (
                            <>
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
                            </>
                        )
                    }
                    <div className={`row ${requestClass.inputDiv}`}>
                  <p className='col-lg-4'>Starting Date</p>
                  <div className={`col-lg-8 ${requestClass.field}`}>
                    <Input value={startingDate} disabled />
                    <button type="button" className={`btn btn-primary} ${requestClass.calendarBtn}`} data-bs-toggle="modal" data-bs-target="#exampleModal">
                      <img src={calendarPic} alt='calendar icon' />
                    </button>
                    <CalendarDiv onChange={(e) => setStartingDate(e)} minDate={new Date()} value={startingDate}/>


                  </div>
                </div>
                <div className={`row ${requestClass.inputDiv}`}>
                  <p className='col-lg-4'>Ending Date</p>
                  <div className={`col-lg-8 ${requestClass.field}`}>
                    <Input placeholder={endingDate} disabled />
                    <button type="button" className={`btn btn-primary} ${requestClass.calendarBtn}`} data-bs-toggle="modal" data-bs-target="#endingModal">
                      <img src={calendarPic} alt='calendar' />
                    </button>

                    <CalendarDiv onChange={(e) => setEndingDate(e)} minDate={startingDate} value={endingDate}/>

                  </div>
                </div>
                {
                    props.isOffer == false && (
                        <>
                          <div className={`row ${requestClass.inputDiv}`}>
                    <p className='col-lg-3'>Internship Supervisor</p>
                    <div className={`col-lg-9 ${requestClass.field}`}>
                      <Input placeholder="please fill this form" type='text' value={supervisor_name} onChange={(e)=>setSupervisorName(e.target.value)} />
                    </div>
                  </div>
                  <div className={`row ${requestClass.inputDiv}`}>
                    <p className='col-lg-3'>Internship Supervisor Email</p>
                    <div className={`col-lg-9 ${requestClass.field}`}>
                      <Input placeholder="please fill this form" type='email' value={supervisor_email} onChange={(e)=>setSupervisorEmail(e.target.value)} />
                
                    </div>
                  </div>
                        </>
                    )
                }
                {
                  props.isOffer == true && (
                    <div className={`row ${requestClass.inputDiv}`}>
                    <p className='col-lg-4'>Internship Supervisor</p>
                    <select className={`col-lg-8 ${requestClass.select}`} onChange={(e) => setSupervisor(e.target.value)} value={supervisor}>
                        <option disabled value="" > Select an Internship Supervisor </option>
                        {
                         supervisors.filter((s) => s.company.full_name == `${props.company}`).map((s) => (
                         
                            s.full_name && (
                              <option key={s._id} value={s._id}>
                            {s.full_name}
                          </option>
                            )
                          
  
                        ))
                        }
  
  
  
  
                    </select>
                  </div>
                  )
                }
                        </>
                      )
                    }
                    {
                      props.formType == "evaluation" && (
                        <>
                            <div className={`row ${requestClass.inputDiv} gx-5 `}>
                      <div className={`col-lg-7 ${requestClass.title} `}>General discipline and interpersonal relationships </div>
                      <div className={`col-lg-2 ${requestClass.field}`}>
                      <Input placeholder="" type='number' value={discipline} onChange={(e)=>setDiscipline(e.target.value)} /> 
                      </div>
                      <div className={`col-lg-2 `}> /4
                      </div>
                    </div>
                    <div className={`row ${requestClass.inputDiv} gx-5`}>
                      <div className={`col-lg-7 ${requestClass.title} `}>Work skills and handling abilities</div>
                      <div className={`col-lg-2 ${requestClass.field}`}>
                      <Input placeholder="" type='number' value={skills} onChange={(e)=>setSkills(e.target.value)} />
                      </div>
                      <div className={`col-lg-2 `}> /4
                      </div>
                    </div>
                          <div className={`row ${requestClass.inputDiv} gx-5`}>
                    <div className={`col-lg-7 ${requestClass.title} `}>Initiative/entrepreneurship</div>
                    <div className={`col-lg-2 ${requestClass.field}`}>
                      <Input placeholder="" type='number' value={initiative} onChange={(e)=>setInitiative(e.target.value)} />
                    </div>
                    <div className={`col-lg-2 `}> /4
                      </div>
                  </div>
                  <div className={`row ${requestClass.inputDiv} gx-5`}>
                    <div className={`col-lg-7 ${requestClass.title}`}>Imagination and innovation capabilities</div>
                    <div className={`col-lg-2 ${requestClass.field}`}>
                      <Input placeholder="" type='number' value={innovation} onChange={(e)=>setInnovation(e.target.value)} />
                    </div>
                    <div className={`col-lg-2 `}> /4
                      </div>
                  </div>
                  <div className={`row ${requestClass.inputDiv} gx-5`}>
                    <div className={`col-lg-7 ${requestClass.title}`}>Knowledge acquired in the internship field</div>
                    <div className={`col-lg-2 ${requestClass.field}`}>
                      <Input placeholder="" type='number' value={knowledge} onChange={(e)=>setKnowledge(e.target.value)} />
                    </div>
                    <div className={`col-lg-2 `}> /4
                      </div>
                  </div>
                  <div className={`row ${requestClass.inputDiv} gx-5`}>
                    <div className={`col-lg-7 ${requestClass.title}`}>Feedback</div>
                    <div className={`col-lg-5 ${requestClass.field}`}>
                      <TextArea placeholder="" type='text' value={feedback} onChange={(e)=>setFeedback(e.target.value)}/>
                    </div>
                  </div>
                    
                       
               
                        </>
                      )
                    }
                  <div className={requestClass.inputDiv}>
                
                    <div className={requestClass.navigationBtn}>
                      <Button color="dark" content="Submit" onClick={submitForm} />
                    </div>
                  </div>

                </div>
          </div>
                
              

           
          
      


    

  );
}
export default FormSample; 
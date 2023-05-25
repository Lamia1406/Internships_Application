import presenceClass from '../Styles/studentPresence.module.css'
import { Helmet } from 'react-helmet';
import Button from '../partials/button';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Input from '../partials/input';
import calendarPic from '../Images/calendar.png'
 import {toast} from 'react-toastify';
 import axios from 'axios';
 import { useState,useEffect } from 'react';
 import jwtDecode from "jwt-decode";
 import Calendar from "react-calendar";
import OnePresence from '../partials/DatabasePartials/onePresence';
function Presence(props){
    const location = useLocation()
    const student= location.state.studentId
    console.log(location.state)
    const supervisor = jwtDecode(localStorage.getItem("token"))
    const presenceURL=`http://localhost:4000/internship/getStudentPresence/${student}/${supervisor._id}`
    const markPresenceURL=`http://localhost:4000/internship/markPresence/${student}/${supervisor._id}`;
    
    const [is_present,setPresence]=useState("");
    const [day,setDay] = useState()
    const [presences, setPresences] = useState([]);
    const fetchPresence = async () => {
      const res = await axios.get(`${presenceURL}`);
      if(res.data){
        setPresences(res.data.studentPresence)
      }
    }
    useEffect(()=>{
      fetchPresence();
    },[]);
    const submitForm = async(event) =>{
        event.preventDefault();
        const payload = {
            is_present,
            day,
            
        }
        try{
            const res = await axios.put(`${markPresenceURL}`, payload);
            if (res.data.status == true){
                toast.success("Presence Registered Successfully" )
                setDay("");
                setPresence("")
                setMarkPresenceClass(false)
                window.location.reload()

            }
            else {
                toast.warn("Failed Operation")
            }
        }
        catch (err) {
            toast.error(err.response.data.error)
            console.log(err.response.data.error)
        }
    }
    const [markPresenceClass,setMarkPresenceClass]=useState(false)
 
    
   return ( 
            <>
                <Helmet>
          <title>ConnectU | Student Presence </title>
          <meta name='description' content='Student Presence'/>
         </Helmet>
                  <div className={`${presenceClass.page} container-fluid`}>
                  <div className={presenceClass.section}>
                  <h2 className={presenceClass.h2}>Student Presence </h2>
                </div>
                   <div className= {presenceClass.section}>
                   <div className={`${presenceClass.results}`}>
                  <div>
                  This Internship is ({presences.length}) Days Long
                  </div>
                  <div>
                  {`${(presences.filter(p => p.is_present === true).length / presences.length) * 100}% of attendance so far`}
                  </div>
                  
         
              </div>
                 {markPresenceClass == false  &&(
                      <div className={presenceClass.newResponsible}>
                      <Button content="Mark Student Presence" color="dark" onClick={() => setMarkPresenceClass(true)}/>
                    </div>
                 )}
                 {
                    markPresenceClass == true && (
                        <div className={presenceClass.markPresence}>
                        <div className={`row ${presenceClass.field}`}>
                         <div className={`col-lg-5 ${presenceClass.label}`}>Day :</div>
                         <div className={`col-lg-7 ${presenceClass.content}`}>
                             <Input  disabled value={day}/>
                             <button type="button" className={`btn btn-primary} ${presenceClass.calendarBtn}`} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                   <img src={calendarPic} alt='calendar icon' />
                                 </button>
                                 <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                   <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                     <div className={`modal-content ${presenceClass.calendarDiv}`}>
                                       <div className={`modal-body  `}>
                                         <Calendar onChange={(e) => setDay(e)} className={presenceClass.calendar} calendarType='Arabic' minDate={new Date(location.state.startingDate)} maxDate={new Date(location.state.endingDate)} value={day} />
                                         <button className={presenceClass.chosenDateBtn} data-bs-dismiss="modal" > Submit</button>
             
                                       </div>
                                     </div>
                                   </div>
                                 </div>
                         </div>
                        
                         </div>
                        <div className={` ${presenceClass.field}`}>
                         <div className={`${presenceClass.label}`}>Presence :</div>
                         <div className={`${presenceClass.content}`}>
                         <select className={presenceClass.select} onChange={(e)=> setPresence(e.target.value)} value={is_present} >
                   <option disabled  value="" > Select The Student Presence</option>
                   
                       <option value={true}>
                        Yes
                       </option>
                       <option value={false}>
                        No
                       </option>
                   </select> 
                         </div>
                         </div>
                        <div className={presenceClass.field} >
                         <div className={presenceClass.navigationBtn}>
                            <div>
                            <Button content="Validate" color="dark" onClick={submitForm} />
                              </div>
                          <div>
                          <Button content="Cancel" color="white" onClick={()=>{setMarkPresenceClass(false)}} />
                          </div>
                         </div>
                         
                   </div>
                       </div>
                    )
                 }
               
               
          <div className={presenceClass.database}>
          <table className={`table  table-borderless `} >
        <thead>
          <tr>
            <th scope="col">Day </th>
            <th>Presence</th>
          </tr>
        </thead>
        <tbody>
        {
   Object.values(presences).map(presence => (
    <OnePresence day={presence.day}
    present={presence.is_present}
    />
  ))
}

        </tbody>
        
      </table>
          </div>
             
      </div>
      
      </div>
      </>
              
      
  
   )
}
export default Presence




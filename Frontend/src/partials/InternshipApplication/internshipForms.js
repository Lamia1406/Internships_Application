import internshipClass from "../../Styles/partials/InternshipApplication/internshipForms.module.css"
import Button from "../button"
import { useState } from "react"
import axios from "axios"
import CalendarDiv from "../calendar"
import changeDateFormat from "../../features/changeDateFormat"
import calendarPic from '../../Images/calendar.png'
import { toast } from "react-toastify"
import InternshipFormsFooters from './internshipFormsFooters'
import Input from "../input"
import InternshipFormsHeaders from "./internshipFormsHeaders"
function InternshipForms(props){
  
//Student Form 
const modifyAppURL = `http://localhost:4000/internship/modifyInternship/${props.internshipId}`
const modifyInternship = async (event) =>{
  event.preventDefault();
  const payload = {
    startingDate ,
    endingDate,
    theme,
    company,
    supervisor_email,
    supervisor_name
   
}
       try{
             const res = await axios.put(modifyAppURL,payload);
             if(res.data.status){
                   toast.success("Internship has been successfully modified")
                   window.location.reload();         
             }
       }
       catch(err){
        console.log(err)
        toast.error(err.response.data.error)
       }
       
 }
  const [rejectClass,setRejectClass]=useState(false)
const [startingDate, setStartingDate] = useState(props.startingDate)
const [theme, setTheme] = useState(props.theme)
const [company, setCompany] = useState(props.company)
const [supervisor_name, setSupervisorName] = useState(props.supervisorName)
const [supervisor_email, setSupervisorEmail] = useState(props.supervisorEmail)
const [endingDate, setEndingDate] = useState(props.endingDate)

    console.log(props)
    const [modifyClass,setModifyClass]=useState(false)
    return (
    <>
    
    <div className={` ${internshipClass.oneInternship}`}>
    
    <InternshipFormsHeaders approvedByResponsible={props.approvedByResponsible}  startingDate={props.startingDate} endingDate={props.endingDate} type= {props.type} approvedBySupervisor={props.approvedBySupervisor} message={props.message} studentId={props.studentId} internshipId= {props.internshipId} certificate = {props}/>
     <div className="accordion-item"> 
     <button className={`collapsed text-center ${internshipClass.btn}`} id={props.internshipId} type="button" data-bs-toggle="collapse" data-bs-target={`#internship${props.internshipId}`} aria-expanded="true" aria-controls={`internship${props.internshipId}`}>
        <div className={internshipClass.name}>{props.theme} </div>
          </button>
          <div id={`internship${props.internshipId}`} className={`accordion-collapse collapse`} aria-labelledby={props.internshipId} data-bs-parent="#accordionparent">
      <div className={`accordion-body`}>
        {
          (props.type == "supervisor" || props.type == "responsible"  || (props.type == "student" && modifyClass== false)) &&(
            <div className={`${internshipClass.form} `}>
            <div className={internshipClass.formTitle}> 
        <p>{props.type == "student" ? "Personal" : "Student"} Information</p>
        </div>
        <div className={`row row-cols-lg-2 ${internshipClass.details} gx-5`}>
        <div className={`col ${internshipClass.field}`}>
        <p className={internshipClass.label}>
            Full Name : 
        </p>
        <p className={internshipClass.content}>
        {props.studentFullName}
        </p>
        </div>
        <div className={`col ${internshipClass.field}`}>
        <p className={internshipClass.label}>
            Student Card :
        </p>
        <p className={internshipClass.content}>
             {props.cardNumber}
        </p>
        </div>
        <div className={`col ${internshipClass.field}`}>
        <p className={internshipClass.label}>
            Social Security Number:
        </p>
        <p className={internshipClass.content}>
        {props.socialNumber}
        
        </p>
        </div>
        <div className={`col ${internshipClass.field}`}>
        <p className={internshipClass.label}>
            Preparing Diploma of:
        </p>
        <p className={internshipClass.content}>
        {props.levelOfStudy}
        </p>
        </div>
        
        
        </div>           
        <div className={internshipClass.formTitle}>
         <p>Internship Details</p>
         </div>
        <div className={`row row-cols-lg-2 ${internshipClass.details} `}>
        
                <div className={`col ${internshipClass.field}`}>
                      <p className={internshipClass.label}>
                          Company :
                      </p>
                      <p className={internshipClass.content}>
                      {props.company}
        
                      </p>
                </div>  
                <div className={` col ${internshipClass.field}`}>
                      <p className={internshipClass.label}>
                         Starting Date :
                      </p>
                      <p className={internshipClass.content}>
                            {changeDateFormat(props.startingDate)}
                           
                      </p>
                </div>
                <div className={`col ${internshipClass.field}`}>
                      <p className={internshipClass.label}>
                          Ending Date :
                      </p>
                      <p className={internshipClass.content}>
                      {changeDateFormat(props.endingDate)}
                      </p>
                </div>
                <div className={`col ${internshipClass.field}`}>
                      <p className={internshipClass.label}>
                         Duration :
                      </p>
                      <p className={internshipClass.content}>
                           {Math.floor((new Date(props.endingDate) - new Date(props.startingDate)) / (1000 * 60 * 60 * 24)) } Days
                      </p>
                </div>
        </div>
        
        <div className={internshipClass.formTitle}> 
        <p>Supervised by</p>
        </div>
            <div className={`row row-cols-lg-2 ${internshipClass.details} gx-5`}>
             
             {
             ( props.type == "supervisor"  || props.type == "student")&& (
                <>
                  <div className={`col ${internshipClass.field}`}>
                      <p className={internshipClass.label}>
                        Department Responsible
                      </p>
                      <p className={internshipClass.content}>
                           {props.responsibleName}
                      </p>
                </div>
                <div className={`col ${internshipClass.field}`}>
                      <p className={internshipClass.label}>
                          Email :
                      </p>
                      <p className={internshipClass.content}>
                      {props.responsibleEmail}
        
                      </p>
                </div>
                <div className={`col ${internshipClass.field}`}>
                      <p className={internshipClass.label}>
                          Phone :
                      </p>
                      <p className={internshipClass.content}>
                      {props.responsiblePhone}
        
                      </p>
                </div>
                <div className={` ${internshipClass.field}`}>
                      <p className={internshipClass.label}>
                          Fax :
                      </p>
                      <p className={internshipClass.content}>
                      {props.responsibleFax}
        
                      </p>
                </div>
                </>
              )
             }
              {
               (props.type == "responsible"  || props.type == "student")&& (
                <>
                 <div className={`col ${internshipClass.field}`}>
                      <p className={internshipClass.label}>
                        Internship Supervisor :
                      </p>
                      <p className={internshipClass.content}>
                           {props.supervisorName}
                      </p>
                </div>
                <div className={`col ${internshipClass.field}`}>
                      <p className={internshipClass.label}>
                          Email :
                      </p>
                      <p className={internshipClass.content}>
                      {props.supervisorEmail}
        
                      </p>
                </div>
                  
                </>
               )  
              }
        
                 
        
                  </div>
                 
            <InternshipFormsFooters type={props.type} approvedByResponsible={props.approvedByResponsible} approvedBySupervisor={props.approvedBySupervisor}
            internshipId={props.internshipId} modifyClass={modifyClass} setModifyClass={setModifyClass} rejectClass={rejectClass} setRejectClass={setRejectClass} isOffer={props.isOffer} />
                 
                
        </div>
          )
        }
        {
        modifyClass == true && (
            <div className={internshipClass.form}>
<div className={internshipClass.formTitle}>
 <p>Internship Details</p>
 </div>
 <div className={internshipClass.formContent}>
<div className={` ${internshipClass.details} gx-5`}>
{ props.isOffer == false &&
(
    <>
     <div className={` row ${internshipClass.modifyForm}`}>
        <p className=" col-lg-3">
                 Theme :
              </p>
        <div className={` col-lg-7 ${internshipClass.formField}`}>
        <Input placeholder ="" value={theme} onChange={e=>setTheme(e.target.value)} type="text"/>
        </div>
        </div>
        <div className={` row ${internshipClass.modifyForm}`}>
        <p className=" col-lg-3">
                 Company :
              </p>
        <div className={` col-lg-7 ${internshipClass.formField}`}>
        <Input placeholder ="" value={company} onChange={e=>setCompany(e.target.value)} type="text"/>
        </div>
        </div>
    </> 
)}
        
        <div className={` row ${internshipClass.modifyForm}`}>
        <p className=" col-lg-3">
                 Starting Date :
              </p>
        <div className={` col-lg-7 ${internshipClass.formField}`}>
        <Input placeholder={changeDateFormat(startingDate)} disabled />
                    <button type="button" className={`btn btn-primary} ${internshipClass.calendarBtn}`} data-bs-toggle="modal" data-bs-target={`#startingModal2${props.internshipId}`}>
                      <img src={calendarPic} alt='calendar icon' />
                    </button>
                    <CalendarDiv onChange={(e) => setStartingDate(e)} minDate={new Date()} value={startingDate} id= {`startingModal2${props.internshipId}`}/>
        </div>
        </div>
        <div className={`row ${internshipClass.modifyForm}`}>
        <p className="col-lg-3">
                 Ending Date :
              </p>
        <div className={` col-lg-7 ${internshipClass.formField}`}>
        <Input placeholder={changeDateFormat(endingDate)} disabled />
                    <button type="button" className={`btn btn-primary} ${internshipClass.calendarBtn}`} data-bs-toggle="modal" data-bs-target={`#endingModal2${props.internshipId}`}>
                      <img src={calendarPic} alt='calendar icon' />
                    </button>
                    <CalendarDiv onChange={(e) => setEndingDate(e)}   minDate={new Date(startingDate)} value={endingDate} id={`endingModal2${props.internshipId}`}/>

        </div>
        </div>
</div>
</div>
{props.isOffer == false && (
    <div className={internshipClass.formTitle}> 
    <p>Supervised by</p>
    </div>
)}

<div className={internshipClass.formContent}>
    <div className={` ${internshipClass.details} `}>

     {
        props.isOffer == false && (
            <>
               <div className={` row ${internshipClass.modifyForm}`}>
        <p className=" col-lg-3">
                 Internship Supervisor :
              </p>
        <div className={` col-lg-7 ${internshipClass.formField}`}>
        <Input placeholder ="" value={supervisor_name} onChange={e=>setSupervisorName(e.target.value)} type="text"/>
        </div>
        </div>
        <div className={` row ${internshipClass.modifyForm}`}>
        <p className=" col-lg-3">
                 Email :
              </p>
        <div className={` col-lg-7 ${internshipClass.formField}`}>
        <Input placeholder ="" value={supervisor_email} onChange={e=>setSupervisorEmail(e.target.value)} type="email"/>
        </div>
        </div>
            </>
        )
     }
          

         

          </div>
          </div>
          <div className={internshipClass.modificationBtns}>
           <div>
                 <Button content="Validate" color="black" onClick={modifyInternship}/>
               </div>
               <div>
               <Button content="Cancel" color="white" onClick={()=>setModifyClass(false)}/>
               </div>
           </div>        
</div>
        )
      }
      
     
      </div>
      </div>
   </div>
   
   </div>
   </>
   )
}
export default InternshipForms




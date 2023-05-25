import { useState,useEffect } from "react"
import requestClass from '../Styles/request.module.css'
import axios from "axios"
import { Helmet } from "react-helmet"
import jwtDecode from "jwt-decode"
// import RequestForm from "../partials/InternshipApplication/requestForm"
import InternshipForms from "../partials/InternshipApplication/internshipForms"
function StudentProgress(){
    const user = jwtDecode(localStorage.getItem("token"))
     const [studentProgressURL,setStudentProgressURL]=useState("")    
    const [internships, setInternships] = useState([])
    const [responsibles,setResponsibles] = useState([])
      const fetchInternships = async () => {
      const res = await axios.get(`${studentProgressURL}`);
      if(res.data.status){
        setInternships(res.data.studentProgress)
        if(user.userType == "supervisor"){
            setResponsibles(res.data.allResponsibles)
        }
      }
    }
  
     useEffect(()=>{
      if (user.userType === "department responsible") {
        setStudentProgressURL(`http://localhost:4000/internship/studentProgress/responsible/${user._id}`);
      }
      if (user.userType === "supervisor") {
        setStudentProgressURL(`http://localhost:4000/internship/studentProgress/supervisor/${user._id}`);
      }
      fetchInternships()
    },[studentProgressURL]);
    return ( 
        <>
           <Helmet>
       <title>ConnectU | Requests</title>
       <meta name='description' content='Requests'/>
      </Helmet>
       <div className={requestClass.page}>
       <div className={`${requestClass.section}`}>
       <p className={requestClass.h3}> Student Progress</p> 
               </div>
     {
            internships.length != 0  ?  <>
            
               <div className={`${requestClass.section} ${requestClass.internships}`}>
               {
                user.userType== "department responsible"  &&  internships &&  internships.map(
                           (app) => {
                             return <InternshipForms approvedByResponsible = {app.approvedByResponsible} 
                              studentFullName = {app.student.full_name} cardNumber ={app.student.student_card_number} socialNumber ={app.student.social_security_number}
                              levelOfStudy ={app.student.level_of_study} theme={app.post.title} company={app.post.company.company_name} startingDate={app.startingDate}
                              endingDate = {app.endingDate} supervisorEmail ={app.supervisor.email} supervisorName= {app.supervisor.full_name} approvedBySupervisor={app.approvedBySupervisor}
                              internshipId={app._id} type= "responsible"
                              />
                           }
                     )
               }
               {
                user.userType== "supervisor"  &&  internships &&  internships.map(
                           (app,index) => {
                            const responsible = responsibles[index]
                             return <InternshipForms type="supervisor" approvedByResponsible = {app.approvedByResponsible} 
                              studentFullName = {app.student.full_name} cardNumber ={app.student.student_card_number} socialNumber ={app.student.social_security_number}
                              levelOfStudy ={app.student.level_of_study} theme={app.post.title} company={app.post.company.company_name} startingDate={app.startingDate}
                              endingDate = {app.endingDate} responsibleEmail = {responsible.email} responsibleName=  {responsible.full_name} approvedBySupervisor={app.approvedBySupervisor}
                              responsiblePhone = {responsible.phone} responsibleFax = {responsible.fax} studentId={app.student._id}

                              />
                           }
                     )
               }
              
               
         
           
        
                          
               
      
            
     </div>
      
         </>  
               :
              
                    
                     <div className={`${requestClass.section}`}>
                           <h3 className={requestClass.h4}>No applications</h3>
                         
                     </div>
              
              
           }
     
   
    
        
   </div>
   </>
     )
}
export default StudentProgress
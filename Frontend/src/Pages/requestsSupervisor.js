import { useState,useEffect } from "react"
import requestClass from '../Styles/request.module.css'
import axios from "axios"
import Button from "../partials/button"
import { Helmet } from "react-helmet"

import jwtDecode from "jwt-decode"
import InternshipForms from "../partials/InternshipApplication/internshipForms"
function RequestsSupervisor(){
    const supervisorId = jwtDecode(localStorage.getItem("token"))._id
    const getInternships = `http://localhost:4000/internship/allInternships/supervisor/${supervisorId}`
    const [internships, setInternships] = useState([])
    const [responsibles,setResponsibles] = useState([])
    const fetchInternships = async () => {
      const res = await axios.get(`${getInternships}`);
      if(res.data.status){
        setInternships(res.data.internships)
        setResponsibles(res.data.allResponsibles)
      }
    }
   
  
    useEffect(()=>{
      fetchInternships()
    },[]);
   
    
  

    return ( 
        <>
           <Helmet>
       <title>ConnectU | Requests</title>
       <meta name='description' content='Requests'/>
      </Helmet>
       <div className={requestClass.page}>
       <div className={`${requestClass.section}`}>
       <p className={requestClass.h3}> Internships</p> 
               </div>
     {
             internships.length != 0 ?  <>
              
               <div className={`${requestClass.section} ${requestClass.internships} `}>
               {
                    internships &&  internships.map(
                           (app,index) => {

                            const responsible = responsibles[index];
                            return <InternshipForms approvedByResponsible = {app.approvedByResponsible} 
studentFullName = {app.student.full_name} cardNumber ={app.student.student_card_number} socialNumber ={app.student.social_security_number}
levelOfStudy ={app.student.level_of_study} theme={app.post.title} company={app.post.company.company_name} startingDate={app.startingDate}
endingDate = {app.endingDate} responsibleEmail = {responsible.email} responsibleName=  {responsible.full_name} approvedBySupervisor={app.approvedBySupervisor}
responsiblePhone = {responsible.phone} responsibleFax = {responsible.fax} type = "supervisor"
internshipId={app._id} studentId={app.student._id} rejectionMessage = {app.rejectionMessage}

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
export default RequestsSupervisor
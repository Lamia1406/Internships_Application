import { useState,useEffect } from "react"
import requestClass from '../Styles/request.module.css'
import axios from "axios"
import { Helmet } from "react-helmet"
import jwtDecode from "jwt-decode"
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
                  internships &&  internships.map(
                           (app, index) => {
                            const responsible = responsibles[index]
                             return <InternshipForms 
                             
{...(app.student ?  {studentFullName:app.student.full_name} : {})}
{...(app.student ? {cardNumber :app.student.student_card_number} : {})}
{...(app.student ? {socialNumber :app.student.social_security_number} : {})}
{...(app.student ?  {levelOfStudy :app.student.level_of_study} : {})}
{...(app.post ? {theme :app.post.title}  : {})}
{...(app.post ?{company:app.post.company.full_name}   : {})}
{...(app.post ?{studentId:app.student._id}   : {})}
{...(app.supervisor && user.userType== "department responsible" ?{supervisorEmail :app.supervisor.email}    : {})}
{...(app.supervisor && user.userType== "department responsible" ?{supervisorName:app.supervisor.full_name}     : {})}
{...( user.userType== "department responsible" ?{type:"responsible"}     : {type:"supervisor"})}
{...( user.userType== "supervisor" ?{responsibleEmail:responsible.email}     : {})}
{...( user.userType== "supervisor" ?{responsibleName:responsible.full_name}     : {})}
{...( user.userType== "supervisor" ?{responsiblePhone:responsible.phone}     : {})}
{...( user.userType== "supervisor" ?{responsibleFax:responsible.fax}     : {})}
endingDate = {app.endingDate}
startingDate = {app.startingDate}
approvedBySupervisor={app.approvedBySupervisor}
approvedByResponsible={app.approvedByResponsible}
internshipId={app._id} 

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
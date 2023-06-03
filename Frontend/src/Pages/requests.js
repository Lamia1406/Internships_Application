import {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import requestClass from '../Styles/yourApp.module.css';
import {useState} from 'react'
import { Helmet } from 'react-helmet';
import axios from 'axios'
import jwtDecode from 'jwt-decode';
import InternshipForms from '../partials/InternshipApplication/internshipForms'
function Requests()
{      
const user = jwtDecode(localStorage.getItem("token"))
const [getInternshipsURL,setGetInternshipURL]= useState('')
const [internships, setInternships] = useState([])
const [newInternship, setNewInternship] = useState([])
const [responsibles,setResponsibles] = useState([])
console.log(internships)
const fetchInternships = async () => {
  const res = await axios.get(`${getInternshipsURL}`);
  if(res.data.status){
    setInternships(res.data.internships)
    if(user.userType == "supervisor"){
      setResponsibles(res.data.allResponsibles)
    }
    if(user.userType == "department responsible"){
      setNewInternship(res.data.newInternships)
    }
  }
}
useEffect(()=>{
  fetchInternships()
  if (user.userType === "department responsible") {
    setGetInternshipURL(`http://localhost:4000/internship/allInternships/responsible/${user._id}`);
  }
  if (user.userType === "supervisor") {
    setGetInternshipURL(`http://localhost:4000/internship/allInternships/supervisor/${user._id}`);
  }
},[getInternshipsURL]);
  return ( 
     <>
        <Helmet>
    <title>ConnectU | Requests</title>
    <meta name='description' content='Requests'/>
   </Helmet>
    <div className={requestClass.page}>
    <div className={`${requestClass.section}`}>
    <p className={requestClass.mainTitle}> Internships</p> 
            </div>
  {
     newInternship.length!= 0 || internships.length!= 0 ?  <>
          
            <div className={`${requestClass.section}`}>
            {
                 internships &&  internships.map(
                       (app,index) => {                  
                        const responsible = responsibles[index]                                               
return <InternshipForms approvedByResponsible = {app.approvedByResponsible} endingDate = {app.endingDate} startingDate={app.startingDate}  approvedBySupervisor={app.approvedBySupervisor}
{...(app.student ?  {studentFullName:app.student.full_name} : {})}
{...(app.student ? {cardNumber :app.student.student_card_number} : {})}
{...(app.student ? {socialNumber :app.student.social_security_number} : {})}
{...(app.student ?  {levelOfStudy :app.student.level_of_study} : {})}
{...(app.post ? {theme :app.post.title}  : {})}
{...(app.post ?{company:app.post.company.full_name}   : {})}
{...(app.supervisor && user.userType== "department responsible" ?{supervisorEmail :app.supervisor.email}    : {})}
{...(app.supervisor && user.userType== "department responsible" ?{supervisorName:app.supervisor.full_name}     : {})}
{...( user.userType== "department responsible" ?{type:"responsible"}     : {type:"supervisor"})}
offer= {true}{...( user.userType== "supervisor" ?{responsibleEmail:responsible.email}     : {})}
{...( user.userType== "supervisor" ?{responsibleName:responsible.full_name}     : {})}
{...( user.userType== "supervisor" ?{responsiblePhone:responsible.phone}     : {})}
{...( user.userType== "supervisor" ?{responsibleFax:responsible.fax}     : {})}
message={app.rejectionMessage}
internshipId={app._id}  
/>
                                 
                            
      

                        }
                  )
            }
            {
               user.userType== "department responsible" &&  newInternship &&  newInternship.map(
                  app => {
                       return <InternshipForms approvedByResponsible = {app.approvedByResponsible} 
                       {...(app.student ?  {studentFullName:app.student.full_name} : {})}
{...(app.student ? {cardNumber :app.student.student_card_number} : {})}
{...(app.student ? {socialNumber :app.student.social_security_number} : {})}
{...(app.student ?  {levelOfStudy :app.student.level_of_study} : {})}
                         theme={app.theme} company={app.company} startingDate={app.startingDate}
                        endingDate = {app.endingDate} supervisorEmail ={app.supervisor_email} supervisorName= {app.supervisor_name} approvedBySupervisor={app.approvedBySupervisor}
                         type ="responsible"
                        internshipId={app._id} isOffer = {false}
                        message={app.rejectionMessage}
                        />
                     
                  }
            )
            }
         
  </div>
   
      </>  
            :
           
            (!newInternship || newInternship.length == 0) && (!internships || internships.length== 0) && (
                         <>
                 
                  <div className={`${requestClass.section}`}>
                        <h3 className={requestClass.h4}>No applications</h3>
                  </div>
            </>
            )
           
        }
  

 
     
</div>
</>
  )
}
export default Requests;
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
const responsibleId = jwtDecode(localStorage.getItem("token"))._id
const getExistingInternships = `http://localhost:4000/internship/allInternships/responsible/${responsibleId}`
const getRejectedInternships = `http://localhost:4000/internship/rejectedInternships/responsible/${responsibleId}`
const getAcceptedInternships = `http://localhost:4000/internship/acceptedInternships/responsible/${responsibleId}`
const getNewInternships = `http://localhost:4000/internship/allNewEstablishment/responsible/${responsibleId}`
const [existingInternship, setExistingInternship] = useState([])
const [rejectedExistingInternships, setRejectedExistingInternships] = useState()
const [rejectedNewInternships, setRejectedNewInternships] = useState()
const [acceptedInternships, setAcceptedInternships] = useState()
const [newInternship, setNewInternship] = useState([])
const [acceptedByBoth,setAcceptedByBoth] = useState([])
const acceptedByBothURL = `http://localhost:4000/internship/acceptedByBoth/responsible/${responsibleId}`
const fetchExistingInternships = async () => {
  const res = await axios.get(`${getExistingInternships}`);
  if(res.data.status){
    setExistingInternship(res.data.internships)
  }
}
const fetchRejectedInternships = async () => {
  const res = await axios.get(`${getRejectedInternships}`);
  if(res.data.status == true){
    setRejectedExistingInternships(res.data.rejectedExistingInternships)
    setRejectedNewInternships(res.data.rejectedNewInternships)
  }
}
const fetchAcceptedInternships = async () => {
  const res = await axios.get(`${getAcceptedInternships}`);
  if(res.data.status == true){
    setAcceptedInternships(res.data.acceptedExistingInternships)
    console.log(res.data.acceptedExistingInternships)
  }
}
const fetchAcceptedByBoth = async () => {
  const res = await axios.get(`${acceptedByBothURL}`);
  if(res.data.status == true){
    setAcceptedByBoth(res.data.internships)
  }
}
const fetchNewInternships = async () => {
  const res = await axios.get(`${getNewInternships}`);
  if(res.data.status == true){
    setNewInternship(res.data.newInternships)
  }
}
useEffect(()=>{
  fetchExistingInternships()
  fetchNewInternships()
  fetchRejectedInternships()
  fetchAcceptedInternships()
  fetchAcceptedByBoth()
},[]);

   
    


  return ( 
     <>
        <Helmet>
    <title>ConnectU | Requests</title>
    <meta name='description' content='Requests'/>
   </Helmet>
    <div className={requestClass.page}>
  {
     newInternship || rejectedNewInternships ||  rejectedExistingInternships || existingInternship || newInternship ?  <>
            <div className={`${requestClass.section}`}>
    <p className={requestClass.mainTitle}> Internships</p> 
            </div>
            <div className={`${requestClass.section}`}>
            {
                 existingInternship &&  existingInternship.map(
                        app => {                                                     
                        
return <InternshipForms approvedByResponsible = {app.approvedByResponsible} 
studentFullName = {app.student.full_name} cardNumber ={app.student.student_card_number} socialNumber ={app.student.social_security_number}
levelOfStudy ={app.student.level_of_study} theme={app.post.title} company={app.post.company.company_name} startingDate={app.startingDate}
endingDate = {app.endingDate} supervisorEmail ={app.supervisor.email} supervisorName= {app.supervisor.full_name} approvedBySupervisor={app.approvedBySupervisor}
type="responsible"
internshipId={app._id} isOffer = {true}
/>
                                 
                            
      

                        }
                  )
            }
            {
                 rejectedExistingInternships &&  rejectedExistingInternships.map(
                        app => {
                  
                            return  <InternshipForms approvedByResponsible = {app.approvedByResponsible} 
                              studentFullName = {app.student.full_name} cardNumber ={app.student.student_card_number} socialNumber ={app.student.social_security_number}
                              levelOfStudy ={app.student.level_of_study} theme={app.post.title} company={app.post.company.company_name} startingDate={app.startingDate}
                              endingDate = {app.endingDate} supervisorEmail ={app.supervisor.email} supervisorName= {app.supervisor.full_name} approvedBySupervisor={app.approvedBySupervisor}
                              rejectionMessage= {app.rejectionMessage} type= "responsible"
                              internshipId={app._id} isOffer = {true}
                              />

                              
                        }
                  )
            }
            {
                 rejectedNewInternships &&  rejectedNewInternships.map(
                        app => {
                  
                              return <InternshipForms approvedByResponsible = {app.approvedByResponsible} 
                        studentFullName = {app.student.full_name} cardNumber ={app.student.student_card_number} socialNumber ={app.student.social_security_number}
                        levelOfStudy ={app.student.level_of_study} theme={app.theme} company={app.company} startingDate={app.startingDate}
                        endingDate = {app.endingDate} supervisorEmail ={app.supervisor_email} supervisorName= {app.supervisor_name} approvedBySupervisor={app.approvedBySupervisor}
                        rejectionMessage= {app.rejectionMessage} type ="responsible"
                        internshipId={app._id} isOffer = {false}
                        />

                              
                        }
                  )
            }
            {
                 acceptedInternships &&  acceptedInternships.map(
                        app => {
                            return  <InternshipForms approvedByResponsible = {app.approvedByResponsible} 
studentFullName = {app.student.full_name} cardNumber ={app.student.student_card_number} socialNumber ={app.student.social_security_number}
levelOfStudy ={app.student.level_of_study} theme={app.post.title} company={app.post.company.company_name} startingDate={app.startingDate}
endingDate = {app.endingDate} supervisorEmail ={app.supervisor.email} supervisorName= {app.supervisor.full_name} approvedBySupervisor={app.approvedBySupervisor}
 type="responsible"
internshipId={app._id} 
/>
                              

           
          
                                    
                        
            


                            
                              
                        }
                  )
            }
            {
                 acceptedByBoth &&  acceptedByBoth.map(
                        app => {
                            return  <InternshipForms approvedByResponsible = {app.approvedByResponsible} 
studentFullName = {app.student.full_name} cardNumber ={app.student.student_card_number} socialNumber ={app.student.social_security_number}
levelOfStudy ={app.student.level_of_study} theme={app.post.title} company={app.post.company.company_name} startingDate={app.startingDate}
endingDate = {app.endingDate} supervisorEmail ={app.supervisor.email} supervisorName= {app.supervisor.full_name} approvedBySupervisor={app.approvedBySupervisor}
 type="responsible"
internshipId={app._id} 
/>
                              

           
          
                                    
                        
            


                            
                              
                        }
                  )
            }
            {
                 newInternship &&  newInternship.map(
                  app => {
                       return <InternshipForms approvedByResponsible = {app.approvedByResponsible} 
                        studentFullName = {app.student.full_name} cardNumber ={app.student.student_card_number} socialNumber ={app.student.social_security_number}
                        levelOfStudy ={app.student.level_of_study} theme={app.theme} company={app.company} startingDate={app.startingDate}
                        endingDate = {app.endingDate} supervisorEmail ={app.supervisor_email} supervisorName= {app.supervisor_name} approvedBySupervisor={app.approvedBySupervisor}
                         type ="responsible"
                        internshipId={app._id} isOffer = {false}
                        />
                     
                  }
            )
            }
         
  </div>
   
      </>  
            :
           
            !newInternship && !existingInternship && !acceptedInternships && !rejectedExistingInternships && !rejectedNewInternships && (
                         <>
                  <div className={`${requestClass.section}`}>
                    <p className={requestClass.h3}> Internships</p>
                  </div>
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
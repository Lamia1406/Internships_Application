import presenceClass from '../Styles/main/studentPresence.module.css'
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormSample from '../partials/Forms/FormSample';

 import axios from 'axios';
 import { useState,useEffect } from 'react';
import DisplayForm from '../partials/Forms/displayForm';
import Layout from '../features/Layout';
import jwtDecode from 'jwt-decode';
 
function Evaluation(props){
    const location = useLocation()
    const user = jwtDecode(localStorage.getItem("token"))
    const student= location.state.studentId
    const internship= location.state.internshipId
    const evaluationURL=`http://localhost:4000/internship/getStudentEvaluation/${student}/${internship}`
    
    
    const [evaluations, setEvaluations] = useState([]);
    const fetchEvaluation = async () => {
      const res = await axios.get(`${evaluationURL}`);
      if(res.data){
        setEvaluations(res.data.studentEvaluation)
       
      }
    }
    useEffect(()=>{
      fetchEvaluation();
    },[]);
   
 
    
   return ( 
        
            <Layout pageTitle = "Student Evaluation" header = "Student Evaluation" content = {
                      <div className= {presenceClass.section}>                    
               
                      {
                       evaluations.length == 0 && evaluations && user.userType == "supervisor" && (
                         <FormSample destination= "/studentProgress" formType="evaluation" student={student} internship={internship} />
                       )
                      }
                      {
                       evaluations.length!=0 && evaluations && (
                         evaluations.map(
                           (e)=>(
                             <DisplayForm skills={e.skills} innovation ={e.innovation} knowledge ={e.knowledge}  discipline ={e.discipline}
                             initiative={e.initiative} full_mark = {e.full_mark} feedback = {e.feedback} destination= {user.userType == "student" ? "/yourApp" : "/studentProgress" } internship={internship}
                             approvedByResponsible={location.state.approvedByResponsible} approvedBySupervisor= {location.state.approvedBySupervisor}
                             />
                             
                           )
                         )
                         )
                      }
             </div>
            }/>
   )
}
export default Evaluation




import presenceClass from '../Styles/studentPresence.module.css'
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormSample from '../partials/Forms/FormSample';

 import axios from 'axios';
 import { useState,useEffect } from 'react';
import OneDataSet from '../partials/Database/oneDataSet';
import DisplayForm from '../partials/Forms/displayForm';
 
function Evaluation(props){
    const location = useLocation()
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
            <>
                <Helmet>
          <title>ConnectU | Student Presence </title>
          <meta name='description' content='Student Evaluation'/>
         </Helmet>
                  <div className={`${presenceClass.page} container-fluid`}>
                  <div className={presenceClass.section}>
                  <h2 className={presenceClass.h2}>Student Evaluation </h2>
                </div>
                   <div className= {presenceClass.section}>                    
               
               {
                evaluations.length == 0 && evaluations && (
                  <FormSample destination= "/studentProgress" formType="evaluation" student={student} internship={internship} />
                )
               }
               {
                evaluations.length!=0 && evaluations && (
                  evaluations.map(
                    (e)=>(
                      <DisplayForm skills={e.skills} innovation ={e.innovation} knowledge ={e.knowledge}  discipline ={e.discipline}
                      initiative={e.initiative} full_mark = {e.full_mark} feedback = {e.feedback} destination= "/studentProgress"
                      />
                      
                    )
                  )
                  )
                
               }
                   

             
      </div>
      
      </div>
      </>
              
      
  
   )
}
export default Evaluation




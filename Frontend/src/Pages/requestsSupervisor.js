import { useState,useEffect } from "react"
import requestClass from '../Styles/request.module.css'
import axios from "axios"
import Button from "../partials/button"
import { Helmet } from "react-helmet"
import jwtDecode from "jwt-decode"
function RequestsSupervisor(){
    const supervisorId = jwtDecode(localStorage.getItem("token"))._id
    const getInternships = `http://localhost:4000/internship/allInternships/supervisor/${supervisorId}`
  //  const getAcceptedInternships = `http://localhost:4000/internship/acceptedInternships/supervisor/${supervisorId}`
    const [internships, setInternships] = useState([])
    const [responsibles,setResponsibles] = useState([])
    const [rejectedInternships, setRejectedInternships] = useState()
    const [acceptedInternships, setAcceptedInternships] = useState()
    
    // const acceptInternship = async (idInternship) =>{
    
    //  const acceptInternshipURL = `http://localhost:4000/internship/acceptInternship/responsible/${idInternship}`
    //       try{
    //             const res = await axios.put(acceptInternshipURL);
    //             if(res.data.status){
    //                   toast.success("Student has been accepted")
    //                   window.location.reload()
                      
    //             }
    //       }
    //       catch(err){
    //             console.log(err)
    //       }
          
    // }
    const fetchInternships = async () => {
      const res = await axios.get(`${getInternships}`);
      if(res.data.status){
        setInternships(res.data.internships)
        setResponsibles(res.data.allResponsibles)
      }
    }
    // const fetchRejectedInternships = async () => {
    //   const res = await axios.get(`${getRejectedInternships}`);
    //   if(res.data.status == true){
    //     setRejectedInternships(res.data.rejectedExistingInternships)
    //   }
    // }
    // const fetchAcceptedInternships = async () => {
    //   const res = await axios.get(`${getAcceptedInternships}`);
    //   if(res.data.status == true){
    //     setAcceptedInternships(res.data.acceptedExistingInternships)
    //     console.log(res.data.acceptedExistingInternships)
    //   }
    // }
    // const fetchNewInternships = async () => {
    //   const res = await axios.get(`${getNewInternships}`);
    //   if(res.data.status == true){
    //     setNewInternship(res.data.newInternships)
    //   }
    // }
    useEffect(()=>{
      fetchInternships()
    //   fetchNewInternships()
    //   fetchRejectedInternships()
    //   fetchAcceptedInternships()
    },[]);
    const changDateFormat = (d) => {
        let date = new Date(Date.UTC(
          parseInt(d.substring(0, 4)),  
          parseInt(d.substring(5, 7)) - 1,  
          parseInt(d.substring(8, 10)),  
          parseInt(d.substring(11, 13)), 
          parseInt(d.substring(14, 16)), 
          parseInt(d.substring(17, 19)), 
          parseInt(d.substring(20, 23))  
        ));
      
        date = date.toUTCString();
        console.log(date);
      
        const today = new Date();
        const year = date.substring(12, 16);
        const month = date.substring(8, 11);
        const day = date.substring(5, 7);
      
        if (
          today.getFullYear() == year &&
          today.getMonth() + 1 == new Date(Date.parse(month + " 1, 2000")).getMonth() + 1 &&
          today.getDate() == day
        ) {
          return "today";
        }
        
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        if (
          yesterday.getFullYear() == year &&
          yesterday.getMonth() + 1 == new Date(Date.parse(month + " 1, 2000")).getMonth() + 1 &&
          yesterday.getDate() == day
        ) {
          return "yesterday";
        }
      
        return `${year}/${month}/${day}`;
      };
    
    const rejectInternship = () =>{
    }

    return ( 
        <>
           <Helmet>
       <title>ConnectU | Requests</title>
       <meta name='description' content='Requests'/>
      </Helmet>
       <div className={requestClass.page}>
     {
           /* rejectedInternships|| */ internships /*|| newInternship*/ ?  <>
               <div className={`${requestClass.section}`}>
       <p className={requestClass.h3}> Internships</p> 
               </div>
               <div className={`${requestClass.section}`}>
               {
                    internships &&  internships.map(
                           (app,index) => {
                            const responsible = responsibles[index];
                                return <div className={`accordion-item ${requestClass.FAQ}`}>
      <button className={`collapsed text-center ${requestClass.btn}`} id={app.student._id} type="button" data-bs-toggle="collapse" data-bs-target={`#student${app.student._id}`} aria-expanded="true" aria-controls={`student${app.student._id}`}>
      <div className={`alert alert-warning ${requestClass.pending}`}>Pending</div>
      <div className={requestClass.name}>{app.student.full_name} </div>
      </button>
    <div id={`student${app.student._id}`} className={`accordion-collapse collapse`} aria-labelledby={app.student._id} data-bs-parent="#accordionparent">
      <div className={`accordion-body`}>
         <div className={requestClass.form}>
                 <div className={requestClass.formTitle}> 
                 <p>Student Information</p>
                 </div>
                 <div className={requestClass.formContent}>
                   <div className={`row row-cols-lg-2 ${requestClass.details} gx-5`}>
                   <div className={`col ${requestClass.field}`}>
                             <p className={requestClass.label}>
                                 Full Name :
                             </p>
                             <p className={requestClass.content}>
                             {app.student.full_name}
                             </p>
                       </div>
                       <div className={`col ${requestClass.field}`}>
                             <p className={requestClass.label}>
                                 Student Card :
                             </p>
                             <p className={requestClass.content}>
                                  {app.student.student_card_number}
                             </p>
                       </div>
                       <div className={`col ${requestClass.field}`}>
                             <p className={requestClass.label}>
                                 Social Security Number:
                             </p>
                             <p className={requestClass.content}>
                             {app.student.social_security_number}
   
                             </p>
                       </div>
                       <div className={`col ${requestClass.field}`}>
                             <p className={requestClass.label}>
                                 Preparing Diploma of:
                             </p>
                             <p className={requestClass.content}>
                             {app.student.level_of_study}
                             </p>
                       </div>
                     
                   </div>
                </div>
                <div className={requestClass.formTitle}>
                              <p>Internship Details</p>
                              </div>
                              <div className={requestClass.formContent}>
                   <div className={`row row-cols-lg-2 ${requestClass.details} gx-5`}>
                   <div className={`col ${requestClass.field}`}>
                                           <p className={requestClass.label}>
                                              Theme :
                                           </p>
                                           <p className={requestClass.content}>
                                           {app.post.title}
                 
                                           </p>
                                     </div>
                                     <div className={`col ${requestClass.field}`}>
                                           <p className={requestClass.label}>
                                               Company :
                                           </p>
                                           <p className={requestClass.content}>
                                           {app.post.company.company_name}
                 
                                           </p>
                                     </div>  
                                     <div className={`col ${requestClass.field}`}>
                                           <p className={requestClass.label}>
                                              Starting Date :
                                           </p>
                                           <p className={requestClass.content}>
                                                 {changDateFormat(app.startingDate)}
                                                
                                           </p>
                                     </div>
                                     <div className={`col ${requestClass.field}`}>
                                           <p className={requestClass.label}>
                                               Ending Date :
                                           </p>
                                           <p className={requestClass.content}>
                                           {changDateFormat(app.endingDate)}
                                           </p>
                                     </div>
                                     <div className={`col ${requestClass.field}`}>
                                           <p className={requestClass.label}>
                                              Duration :
                                           </p>
                                           <p className={requestClass.content}>
                                                {(new Date(app.endingDate) - new Date(app.startingDate)) / (1000 * 60 * 60 * 24) } Days
                                           </p>
                                     </div>
                   </div>
                </div>
                <div className={requestClass.formTitle}> 
                           <p>Supervised by</p>
                           </div>
   
                           <div className={requestClass.formContent}>
                                 <div className={`row row-cols-lg-2 ${requestClass.details} gx-5`}>
                                    <div className={`col ${requestClass.field}`}>
                                           <p className={requestClass.label}>
                                             Department Responsible :
                                           </p>
                                           <p className={requestClass.content}>
                                                 {responsible.full_name}
                                           </p>
                                     </div>
                                     <div className={`col ${requestClass.field}`}>
                                           <p className={requestClass.label}>
                                               Email :
                                           </p>
                                           <p className={requestClass.content}>
                                           {responsible.email}
                 
                                           </p>
                                     </div>
                                     <div className={`col ${requestClass.field}`}>
                                           <p className={requestClass.label}>
                                               Phone :
                                           </p>
                                           <p className={requestClass.content}>
                                           (+213) 0{responsible.phone}
                 
                                           </p>
                                     </div>
                                     <div className={`col ${requestClass.field}`}>
                                           <p className={requestClass.label}>
                                               Fax :
                                           </p>
                                           <p className={requestClass.content}>
                                           (+213) 0{responsible.fax}
                 
                                           </p>
                                     </div>
                                       
                           
                                      
   
                                       </div>
                                       </div>
                                       <div className={requestClass.modificationBtns}>
                                 <div>
                                 <Button content="Accept" color="clear" /* onClick={() => acceptInternship(app._id)}*/ />
   
                                     </div>
                                     <div>
                                     <Button content="Reject" color="black" onClick={rejectInternship}/>
                                     </div>
                                 </div>
               
   </div>
      </div>
   
    </div>
   </div>
                           }
                     )
               }
               {
                    rejectedInternships &&  rejectedInternships.map(
                           app => {
                     
                 return    <div className={`accordion-item ${requestClass.FAQ}`}>
      <button className={`collapsed text-center ${requestClass.btn}`} id={app.student._id} type="button" data-bs-toggle="collapse" data-bs-target={`#student${app.student._id}`} aria-expanded="true" aria-controls={`#student${app.student._id}`}>
      <div> {app.student.full_name}</div>
      </button>
    <div id={`student${app.student._id}`} className={`accordion-collapse collapse`} aria-labelledby={app.student._id} data-bs-parent="#accordionparent">
      <div className={`accordion-body`}>
         <div className={requestClass.rejectedForm}>
                 <div className={requestClass.formTitle}> 
                 <p>Student Information</p>
                 </div>
                 <div className={requestClass.formContent}>
                   <div className={`row row-cols-lg-2 ${requestClass.details} gx-5`}>
                   <div className={`col ${requestClass.field}`}>
                             <p className={requestClass.label}>
                                 Full Name :
                             </p>
                             <p className={requestClass.content}>
                             {app.student.full_name}
                             </p>
                       </div>
                       <div className={`col ${requestClass.field}`}>
                             <p className={requestClass.label}>
                                 Student Card :
                             </p>
                             <p className={requestClass.content}>
                                  {app.student.student_card_number}
                             </p>
                       </div>
                       <div className={`col ${requestClass.field}`}>
                             <p className={requestClass.label}>
                                 Social Security Number:
                             </p>
                             <p className={requestClass.content}>
                             {app.student.social_security_number}
   
                             </p>
                       </div>
                       <div className={`col ${requestClass.field}`}>
                             <p className={requestClass.label}>
                                 Preparing Diploma of:
                             </p>
                             <p className={requestClass.content}>
                             {app.student.level_of_study}
                             </p>
                       </div>
                     
                   </div>
                </div>
                <div className={requestClass.formTitle}>
                              <p>Internship Details</p>
                              </div>
                              <div className={requestClass.formContent}>
                   <div className={`row row-cols-lg-2 ${requestClass.details} gx-5`}>
                   <div className={`col ${requestClass.field}`}>
                                           <p className={requestClass.label}>
                                              Theme :
                                           </p>
                                           <p className={requestClass.content}>
                                           {app.post.title}
                 
                                           </p>
                                     </div>
                                     <div className={`col ${requestClass.field}`}>
                                           <p className={requestClass.label}>
                                               Company :
                                           </p>
                                           <p className={requestClass.content}>
                                           {app.post.company.company_name}
                 
                                           </p>
                                     </div>  
                                     <div className={`col ${requestClass.field}`}>
                                           <p className={requestClass.label}>
                                              Starting Date :
                                           </p>
                                           <p className={requestClass.content}>
                                                 {changDateFormat(app.startingDate)}
                                                
                                           </p>
                                     </div>
                                     <div className={`col ${requestClass.field}`}>
                                           <p className={requestClass.label}>
                                               Ending Date :
                                           </p>
                                           <p className={requestClass.content}>
                                           {changDateFormat(app.endingDate)}
                                           </p>
                                     </div>
                                     <div className={`col ${requestClass.field}`}>
                                           <p className={requestClass.label}>
                                              Duration :
                                           </p>
                                           <p className={requestClass.content}>
                                                {(new Date(app.endingDate) - new Date(app.startingDate)) / (1000 * 60 * 60 * 24) } Days
                                           </p>
                                     </div>
                   </div>
                </div>
                <div className={requestClass.formTitle}> 
                           <p>Supervised by</p>
                           </div>
   
                           <div className={requestClass.formContent}>
                                 <div className={`row row-cols-lg-2 ${requestClass.details} gx-5`}>
                                    <div className={`col ${requestClass.field}`}>
                                           <p className={requestClass.label}>
                                             Internship Supervisor :
                                           </p>
                                           <p className={requestClass.content}>
                                                 {app.supervisor.full_name}
                                           </p>
                                     </div>
                                     <div className={`col ${requestClass.field}`}>
                                           <p className={requestClass.label}>
                                               Email :
                                           </p>
                                           <p className={requestClass.content}>
                                           {app.supervisor.email}
                 
                                           </p>
                                     </div>
                                       
                           
                                      
   
                                       </div>
                                       </div>
                                    
               </div>
   
      </div>
   
    </div>
   </div>
   
                                 
                           }
                     )
               }
               {
                    acceptedInternships &&  acceptedInternships.map(
                           app => {
                                 
                              return   <div className={`accordion-item ${requestClass.FAQ}`}>
      <button className={`collapsed text-center ${requestClass.btn}`} id={app.student._id} type="button" data-bs-toggle="collapse" data-bs-target={`#student${app.student._id}`} aria-expanded="true" aria-controls={`student${app.student._id}`}>
      <div className={`alert alert-success ${requestClass.accepted}`}>Accepted</div>
      <div className={requestClass.name}>{app.student.full_name}</div>
      </button>
    <div id={`student${app.student._id}`} className={`accordion-collapse collapse`} aria-labelledby={app.student._id} data-bs-parent="#accordionparent">
      <div className={`accordion-body`}>
         <div className={requestClass.acceptedForm}>
                 <div className={requestClass.formTitle}> 
                 <p>Student Information</p>
                 </div>
                 <div className={requestClass.formContent}>
                   <div className={`row row-cols-lg-2 ${requestClass.details} gx-5`}>
                   <div className={`col ${requestClass.field}`}>
                             <p className={requestClass.label}>
                                 Full Name :
                             </p>
                             <p className={requestClass.content}>
                             {app.student.full_name}
                             </p>
                       </div>
                       <div className={`col ${requestClass.field}`}>
                             <p className={requestClass.label}>
                                 Student Card :
                             </p>
                             <p className={requestClass.content}>
                                  {app.student.student_card_number}
                             </p>
                       </div>
                       <div className={`col ${requestClass.field}`}>
                             <p className={requestClass.label}>
                                 Social Security Number:
                             </p>
                             <p className={requestClass.content}>
                             {app.student.social_security_number}
   
                             </p>
                       </div>
                       <div className={`col ${requestClass.field}`}>
                             <p className={requestClass.label}>
                                 Preparing Diploma of:
                             </p>
                             <p className={requestClass.content}>
                             {app.student.level_of_study}
                             </p>
                       </div>
                     
                   </div>
                </div>
                <div className={requestClass.formTitle}>
                              <p>Internship Details</p>
                              </div>
                              <div className={requestClass.formContent}>
                   <div className={`row row-cols-lg-2 ${requestClass.details} gx-5`}>
                   <div className={`col ${requestClass.field}`}>
                                           <p className={requestClass.label}>
                                              Theme :
                                           </p>
                                           <p className={requestClass.content}>
                                           {app.post.title}
                 
                                           </p>
                                     </div>
                                     <div className={`col ${requestClass.field}`}>
                                           <p className={requestClass.label}>
                                               Company :
                                           </p>
                                           <p className={requestClass.content}>
                                           {app.post.company.company_name}
                 
                                           </p>
                                     </div>  
                                     <div className={`col ${requestClass.field}`}>
                                           <p className={requestClass.label}>
                                              Starting Date :
                                           </p>
                                           <p className={requestClass.content}>
                                                 {changDateFormat(app.startingDate)}
                                                
                                           </p>
                                     </div>
                                     <div className={`col ${requestClass.field}`}>
                                           <p className={requestClass.label}>
                                               Ending Date :
                                           </p>
                                           <p className={requestClass.content}>
                                           {changDateFormat(app.endingDate)}
                                           </p>
                                     </div>
                                     <div className={`col ${requestClass.field}`}>
                                           <p className={requestClass.label}>
                                              Duration :
                                           </p>
                                           <p className={requestClass.content}>
                                                {(new Date(app.endingDate) - new Date(app.startingDate)) / (1000 * 60 * 60 * 24) } Days
                                           </p>
                                     </div>
                   </div>
                   
                </div>
                <div className={requestClass.formTitle}> 
                           <p>Supervised by</p>
                           </div>
   
                           <div className={requestClass.formContent}>
                                 <div className={`row row-cols-lg-2 ${requestClass.details} gx-5`}>
                                    <div className={`col ${requestClass.field}`}>
                                           <p className={requestClass.label}>
                                             Internship Supervisor :
                                           </p>
                                           <p className={requestClass.content}>
                                                 {app.supervisor.full_name}
                                           </p>
                                     </div>
                                     <div className={`col ${requestClass.field}`}>
                                           <p className={requestClass.label}>
                                               Email :
                                           </p>
                                           <p className={requestClass.content}>
                                           {app.supervisor.email}
                 
                                           </p>
                                     </div>
                                       
                           
                                      
   
                                       </div>
                                       </div>
                                       <div className={requestClass.modificationBtns}>
                                 
                                     <div>
                                     <Button content="Waiting for Supervisor's Approval..." color="grey" onClick={rejectInternship} disabled/>
                                     </div>
                                 </div>
               </div>
      
   
      </div>
   
    </div>
   </div>
                               
                                 
                           }
                     )
               }
               {/* {
                    newInternship &&  newInternship.map(
                     app => {
                          return <div className={requestClass.form}>
           <div className={requestClass.formTitle}> 
           <p>Personal Information</p>
           </div>
           <div className={requestClass.formContent}>
             <div className={`row row-cols-lg-2 ${requestClass.details} gx-5`}>
             <div className={`col ${requestClass.field}`}>
                       <p className={requestClass.label}>
                           Full Name :
                       </p>
                       <p className={requestClass.content}>
                       {app.student.full_name}
                       </p>
                 </div>
                 <div className={`col ${requestClass.field}`}>
                       <p className={requestClass.label}>
                           Student Card :
                       </p>
                       <p className={requestClass.content}>
                            {app.student.student_card_number}
                       </p>
                 </div>
                 <div className={`col ${requestClass.field}`}>
                       <p className={requestClass.label}>
                           Social Security Number:
                       </p>
                       <p className={requestClass.content}>
                       {app.student.social_security_number}
   
                       </p>
                 </div>
                 <div className={`col ${requestClass.field}`}>
                       <p className={requestClass.label}>
                           Preparing Diploma of:
                       </p>
                       <p className={requestClass.content}>
                       {app.student.level_of_study}
                       </p>
                 </div>
               
             </div>
          </div>
          <div className={requestClass.formTitle}>
                        <p>Internship Details</p>
                        </div>
                        <div className={requestClass.formContent}>
             <div className={`row row-cols-lg-2 ${requestClass.details} gx-5`}>
             <div className={`col ${requestClass.field}`}>
                                     <p className={requestClass.label}>
                                        Theme :
                                     </p>
                                     <p className={requestClass.content}>
                                     {app.theme}
           
                                     </p>
                               </div>
                               <div className={`col ${requestClass.field}`}>
                                     <p className={requestClass.label}>
                                         Company :
                                     </p>
                                     <p className={requestClass.content}>
                                     {app.company}
                                     </p>
                               </div>  
                               <div className={`col ${requestClass.field}`}>
                                     <p className={requestClass.label}>
                                        Starting Date :
                                     </p>
                                     <p className={requestClass.content}>
                                           {changDateFormat(app.startingDate)}
                                          
                                     </p>
                               </div>
                               <div className={`col ${requestClass.field}`}>
                                     <p className={requestClass.label}>
                                         Ending Date :
                                     </p>
                                     <p className={requestClass.content}>
                                     {changDateFormat(app.endingDate)}
                                     </p>
                               </div>
                               <div className={`col ${requestClass.field}`}>
                                     <p className={requestClass.label}>
                                        Duration :
                                     </p>
                                     <p className={requestClass.content}>
                                          {(new Date(app.endingDate) - new Date(app.startingDate)) / (1000 * 60 * 60 * 24) } Days
                                     </p>
                               </div>
             </div>
          </div>
          <div className={requestClass.formTitle}> 
                     <p>Supervised by</p>
                     </div>
   
                     <div className={requestClass.formContent}>
                           <div className={`row row-cols-lg-2 ${requestClass.details} gx-5`}>
                              <div className={`col ${requestClass.field}`}>
                                     <p className={requestClass.label}>
                                       Internship Supervisor :
                                     </p>
                                     <p className={requestClass.content}>
                                           {app.supervisor_name}
                                     </p>
                               </div>
                               <div className={`col ${requestClass.field}`}>
                                     <p className={requestClass.label}>
                                         Email :
                                     </p>
                                     <p className={requestClass.content}>
                                     {app.supervisor_email}
           
                                     </p>
                               </div>
                                 
                     
                                
   
                                 </div>
                                 </div>
                                 <div className={requestClass.modificationBtns}>
                           <div>
                                 <Button content="Accept" color="clear"/>
                               </div>
                               <div>
                               <Button content="Reject" color="black"/>
                               </div>
                           </div>
         </div>
                     }
               )
               } */}
            
     </div>
      
         </>  
               :
              
            //    !newInternship && !newInternship && (
            //                 <>
            //          <div className={`${requestClass.section}`}>
            //            <p className={requestClass.h3}> Internships</p>
            //          </div>
            //          <div className={`${requestClass.section}`}>
            //                <h3 className={requestClass.h4}>No applications</h3>
            //                <div className={requestClass.btn1}>
            //                <Button content="Apply" color="black"/>
            //                      </div>
            //          </div>
            //    </>
            //    )
              
        <div></div>
           }
     
   
    
        
   </div>
   </>
     )
}
export default RequestsSupervisor
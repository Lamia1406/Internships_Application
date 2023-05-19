import User from '../Images/userBig.png'
import modalClass from '../Styles/partials/profil.module.css'
import React  from 'react'
import Button from '../partials/button';
import EditProfil from './editProfil';
import axios from 'axios'
import {toast} from 'react-toastify'
function Profil(props){
  const deleteStudentURL= `http://localhost:4000/v1/user/deleteStudent/${props.id}`
  const deleteStudent = async(event) =>{
    event.preventDefault();
          axios.delete(deleteStudentURL).then(
          res => {
            console.log(res)
            toast.success("Student Deleted Successfully" )
            window.location.reload();
          }
         ).catch(err=>{
          toast.error(err)
          console.log(err.data)
         })

    
};
  return(

    
            <div className={`modal fade `} id={props.modalId} tabIndex="-1" aria-labelledby="profilModal" aria-hidden="true">
<div className={`modal-dialog modal-dialog-centered modal-lg `}>
    <div className={`modal-content ${modalClass.main}`}>
    <button type="button" className={`${modalClass.close} btn-close`} data-bs-dismiss="modal" aria-label="Close"></button>
    <div className={modalClass.body}>
      <div className={modalClass.avatar}>
          {
            props.image ? <img src={props.image} alt='User pic' /> : <img src={User} alt='User pic' />
          }
          </div>
          <div className={modalClass.name}>
               {props.name}
         </div>
         { props.profil == 'responsible' && (
        <div className={modalClass.records}>
          <div className={modalClass.recordsTitle}>
            Internship Records
          </div>
          <div className={modalClass.recordsDetails}>
            <div> 
              <h6> Accepted</h6>
              <div className={modalClass.accepted}>12</div>
              </div>
            <div> 
              <h6 > Pending</h6>
              <div className={modalClass.pending}>4</div>
              </div>
            <div> 
              <h6> Rejected</h6>
              <div className={modalClass.rejected}>4</div>
              </div>
          </div>
        </div>
         )
         }
       <div className={modalClass.information}>
       <div className={` ${modalClass.profilDetails}`}>
        <div className={`${modalClass.title}`}>Email</div>
        <div className={`${modalClass.description}`}>{props.email}</div>
        </div>
        <div className={` ${modalClass.profilDetails}`}>
        <div className={`${modalClass.title}`}>Phone number</div>
        <div className={`${modalClass.description}`}>(+213) 0{props.phone}</div>
        </div>
        {
          props.profil =="responsible" &&(
            <>
            <div className={` ${modalClass.profilDetails}`}>
        <div className={`${modalClass.title}`}>Fax number</div>
        <div className={`${modalClass.description}`}>(+213) 0{props.fax}</div>
        </div>
        <div className={` ${modalClass.profilDetails}`}>
        <div className={`${modalClass.title}`}>Currently supervising</div>
        <div className={`${modalClass.description}`}>
            <ul>
                <li>Lamia Hamdi</li>
                <li>Latifa Boudiaf</li>
                <li>Imane Hamida</li>
                </ul>
            </div>
        </div>
            </>
          )
        }
        {props.profil == "student" && (
              <>
                 <div className={` ${modalClass.profilDetails}`}>
       <div className={`${modalClass.title}`}>Student Card Number</div>
       <div className={`${modalClass.description}`}>{props.card}</div>
       </div>
       <div className={` ${modalClass.profilDetails}`}>
       <div className={`${modalClass.title}`}> Social Security Number</div>
       <div className={`${modalClass.description}`}>{props.security}</div>
       </div>
              </>
        )}
       </div>
         
  
           
      
     
    
    
       
         <div className={modalClass.inputDiv} >
                <Button content="Delete" color="dark" onClick={deleteStudent}/>
                
      </div>
      </div>
    </div>
  </div>
   

</div>
   
    )
}
export default Profil
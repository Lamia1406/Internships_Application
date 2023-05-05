import User from '../Images/User.jpg'
import modalClass from '../Styles/partials/editProfil.module.css'
import React, { useEffect }  from 'react'
import Button from '../partials/button';
import Input from './input';
import { useState } from 'react';
import {toast} from "react-toastify";
import axios from 'axios';
function EditProfil(props){
    const [full_name,setFullName]=useEffect("");
    const [email,setEmail]=useEffect("");
    const [phone,setPhone]=useEffect("");
    const [department,setDepartment] = useEffect("");
    const [levelofStudy,setLevelOfStudy]=useEffect("");
    const [cardNumber,setCardNumber]=useEffect("");
    const [securityNumber,setSecurityNumber]=useEffect("");
    const submitForm = async(event) =>{
      event.preventDefault();
      const payload = {
          full_name,
          email,
          levelofStudy,
          cardNumber,
          securityNumber,
          department,
          phone
      }
      try{
          const res = await axios.post(``, payload);
          if (res.data?.status){
              toast.success("Successfully Signed Up" , {})
              setCardNumber("");
              setDepartment("");
              setEmail("");
              setFullName("");
              setLevelOfStudy("");
              setPhone("");
          }
          else {
              toast.warn("Failed Operation")
          }
      }
      catch (err) {
          const {
              errors : {body},}=toast.error("an Error happened while retrieving the request")
          console.error(err.message)
      }
  };
  return(

    
            <div className={`modal fade `} id={props.modalId} tabIndex="-1" aria-labelledby="editModal" aria-hidden="true">
{/* <div className={`modal-dialog modal-dialog-centered modal-lg `}>
    <div className={`modal-content ${modalClass.main}`}>
    <button type="button" className={`${modalClass.close} btn-close`} data-bs-dismiss="modal" aria-label="Close"></button>

    <div className={modalClass.body}>
      <div className={modalClass.avatar}>
          <img src={User} alt='User pic' />
          </div>
         { props.profil == 'responsible' && (
          <React.Fragment>
             <div className={modalClass.name}>
            Redouane Nouara
          </div>
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
       <div className={modalClass.information}>
       <div className={` ${modalClass.profilDetails}`}>
        <div className={`${modalClass.title}`}>Email</div>
        <div className={`${modalClass.description}`}>redouanenouara@univ-constantine2.dz</div>
        </div>
        <div className={` ${modalClass.profilDetails}`}>
        <div className={`${modalClass.title}`}>Phone number</div>
        <div className={`${modalClass.description}`}>123456789</div>
        </div>
        <div className={` ${modalClass.profilDetails}`}>
        <div className={`${modalClass.title}`}>Fax number</div>
        <div className={`${modalClass.description}`}>123456789</div>
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
       </div>
          </React.Fragment>
         )

         }
         {props.profil == "student" && (
        
           
            <React.Fragment>
            <div className={modalClass.name}>
            <Input placeholder="Full Name" type="text" onChange={(e)=> setFullName(e.target.value)}/>
         </div>
      
      <div className={modalClass.information}>
      <div className={` ${modalClass.profilDetails}`}>
       <div className={`${modalClass.title}`}>Email</div>
       <div className={`${modalClass.description}`}>               
        <Input placeholder="fill this input" type="email" onChange={(e)=> setEmail(e.target.value)}/></div>
       </div>
       <div className={` ${modalClass.profilDetails}`}>
       <div className={`${modalClass.title}`}>Phone number</div>
       <div className={`${modalClass.description}`}>
       <Input placeholder="fill this input" type="number" onChange={(e)=> setPhone(e.target.value)}/>
       </div>
       </div>
       <div className={` ${modalClass.profilDetails}`}>
       <div className={`${modalClass.title}`}>Student Card Number</div>
       <div className={`${modalClass.description}`}> <Input placeholder="fill this input" type="number" onChange={(e)=> setCardNumber(e.target.value)}/></div>
       </div>
       <div className={` ${modalClass.profilDetails}`}>
       <div className={`${modalClass.title}`}> Social Security Number</div>
       <div className={`${modalClass.description}`}> <Input placeholder="fill this input" type="number" onChange={(e)=> setSecurityNumber(e.target.value)}/></div>
       </div>
       <div className={` ${modalClass.profilDetails}`}>
       <div className={`${modalClass.title}`}> Department</div>
       <div className={`${modalClass.description}`}> <Input placeholder="fill this input" type="text" onChange={(e)=> setDepartment(e.target.value)}/></div>
       </div>
       <div className={` ${modalClass.profilDetails}`}>
       <div className={`${modalClass.title}`}> Study Level</div>
       <div className={`${modalClass.description}`}> <Input placeholder="fill this input" type="text" onChange={(e)=> setLevelOfStudy(e.target.value)}/></div>
       </div>
       
    
      </div>
         </React.Fragment>
         
        
            
          
         )}
         <div className={modalClass.inputDiv} >
                <div><Button content="Validate" color="dark"/></div>
                <div><Button content="Cancel" color="dark"/></div>
                
      </div>
      </div>
    </div>
  </div> */}
   

</div>
   
    )
}
export default EditProfil
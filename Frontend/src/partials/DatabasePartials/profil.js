import User from '../../Images/userBig.png'
import modalClass from '../../Styles/partials/DatabaseTables/profil.module.css'
import React, { useState,useEffect }  from 'react'
import Button from '../button';
import axios from 'axios'
import {toast} from 'react-toastify'
function Profil(props){
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
         { props.profil == 'responsible' || props.profil == "supervisor"&& (
        <div className={modalClass.records}>
          <div className={modalClass.recordsTitle}>
            Internship Records
          </div>
          <div className={modalClass.recordsDetails}>
            <div> 
              <h6> Accepted</h6>
                  {props.accepted}
              </div>
            <div> 
              <h6 > Pending</h6>
              <div className={modalClass.pending}>{props.pending}</div>
              </div>
            <div> 
              <h6> Rejected</h6>
              <div className={modalClass.rejected}>{props.rejected}</div>
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
        {
          (props.profil == "student" || props.profil == "responsible") && (
            <div className={` ${modalClass.profilDetails}`}>
        <div className={`${modalClass.title}`}>Phone number</div>
        <div className={`${modalClass.description}`}>(+213) 0{props.phone}</div>
        </div>
          )
        }
        {
          props.profil =="responsible" &&(
            <>
            <div className={` ${modalClass.profilDetails}`}>
        <div className={`${modalClass.title}`}>Fax number</div>
        <div className={`${modalClass.description}`}>(+213) 0{props.fax}</div>
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
       <div className={` ${modalClass.profilDetails}`}>
       <div className={`${modalClass.title}`}> Currently Enrolled</div>
       <div className={`${modalClass.description}`}>{props.enrolled}</div>
       </div>
              </>
        )}
       </div>
         
  
           
      
     
    
    
       
         
      </div>
    </div>
  </div>
   

</div>
   
    )
}
export default Profil
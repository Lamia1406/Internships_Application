import User from '../Images/User.jpg'
import modalClass from '../Styles/partials/profil.module.css'
import React  from 'react'
import Button from '../partials/button';
import EditProfil from './editProfil';
function Profil(props){

  return(

    
            <div className={`modal fade `} id={props.modalId} tabIndex="-1" aria-labelledby="profilModal" aria-hidden="true">
<div className={`modal-dialog modal-dialog-centered modal-lg `}>
    <div className={`modal-content ${modalClass.main}`}>
    <button type="button" className={`${modalClass.close} btn-close`} data-bs-dismiss="modal" aria-label="Close"></button>
    <div className={modalClass.body}>
      <div className={modalClass.avatar}>
          <img src={User} alt='User pic' />
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
                <div><Button content="Modify" color="dark" dataBsToggle="modal" dataBsTarget={props.footer}/></div>
                <div><Button content="Delete" color="dark"/></div>
                
      </div>
      </div>
    </div>
  </div>
   

</div>
   
    )
}
export default Profil
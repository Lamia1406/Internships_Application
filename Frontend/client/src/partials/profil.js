import User from '../Images/User.jpg'
import modalClass from '../Styles/partials/profil.module.css'
import React , {useState} from 'react'
import Button from '../partials/button'
function Profil(props,profil){

  return(

    
            <div className={`modal fade `} id={props.modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div className={`modal-dialog modal-dialog-centered modal-lg `}>
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
            Lamia Hamdi
          </div>
       
       <div className={modalClass.information}>
       <div className={` ${modalClass.profilDetails}`}>
        <div className={`${modalClass.title}`}>Email</div>
        <div className={`${modalClass.description}`}>lamia.hamdi@univ-constantine2.dz</div>
        </div>
        <div className={` ${modalClass.profilDetails}`}>
        <div className={`${modalClass.title}`}>Phone number</div>
        <div className={`${modalClass.description}`}>123456789</div>
        </div>
        <div className={` ${modalClass.profilDetails}`}>
        <div className={`${modalClass.title}`}>Student Card Number</div>
        <div className={`${modalClass.description}`}>123456789</div>
        </div>
        <div className={` ${modalClass.profilDetails}`}>
        <div className={`${modalClass.title}`}> Social Security Number</div>
        <div className={`${modalClass.description}`}>123456789</div>
        </div>
     
       </div>
          </React.Fragment>
         )}
         <div className={modalClass.inputDiv} >
                <Button content="Modify" color="dark"/>
      </div>
      </div>
    </div>
  </div>
   

</div>
   
    )
}
export default Profil
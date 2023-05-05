import { useEffect, useState } from 'react';
import profilClass from '../Styles/userProfil.module.css'
import { Helmet } from 'react-helmet';
import User from '../Images/User.jpg'
import Button from '../partials/button';
import axios from 'axios';
function UserProfil(){
    const [user,setUser]=useState("")
    useEffect(() => {
      axios.get('http://localhost:4000/v1/user/profil')
        .then(response => {
          setUser(response.data.user);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);
  
    return ( 
        <>
        <Helmet>
         <title>ConnectU | Profil</title>
         <meta name='description' content='HomePage'/>
        </Helmet>
         <div className={`${profilClass.page} container-fluid`}>
             <div className= {profilClass.section}>
             <div className={profilClass.avatar}>
          <img src={User} alt='User pic' />
          </div>
          <div className={profilClass.name}>
          {user.full_name}
          </div>
             
           
           
              {(user.userType == 'department responsible') &&
     (
        
       <>
        <div className={profilClass.records}>
          <div className={profilClass.recordsTitle}>
            Internship Records
          </div>
          <div className={profilClass.recordsDetails}>
            <div> 
              <h6> Accepted</h6>
              <div className={profilClass.accepted}>12</div>
              </div>
            <div> 
              <h6 > Pending</h6>
              <div className={profilClass.pending}>4</div>
              </div>
            <div> 
              <h6> Rejected</h6>
              <div className={profilClass.rejected}>4</div>
              </div>
          </div>
        </div>
        </>
        )}
       <div className={profilClass.information}>
       <div className={` ${profilClass.profilDetails}`}>
        <div className={`${profilClass.title}`}>Email</div>
        <div className={`${profilClass.description}`}>{user.email}</div>
        </div>
        {
          (user.userType == "department responsible" || user.userType == "student") &&(
              <>
               <div className={` ${profilClass.profilDetails}`}>
        <div className={`${profilClass.title}`}>Phone number</div>
        <div className={`${profilClass.description}`}>{user.phone}</div>
        </div>
              </>
          )
        }
       {user.userType =="department responsible" && (
        <>
         <div className={` ${profilClass.profilDetails}`}>
        <div className={`${profilClass.title}`}>Fax number</div>
        <div className={`${profilClass.description}`}>123456789</div>
        </div>
        <div className={` ${profilClass.profilDetails}`}>
        <div className={`${profilClass.title}`}>Currently supervising</div>
        <div className={`${profilClass.description}`}>
            <ul>
                <li>Lamia Hamdi</li>
                <li>Latifa Boudiaf</li>
                <li>Imane Hamida</li>
                </ul>
            </div>
        </div>
        </>
       )}
       {user.userType == "student" &&(
          <>
          <div className={` ${profilClass.profilDetails}`}>
<div className={`${profilClass.title}`}>Student Card Number</div>
<div className={`${profilClass.description}`}>1234567</div>
</div>
<div className={` ${profilClass.profilDetails}`}>
<div className={`${profilClass.title}`}> Social Security Number</div>
<div className={`${profilClass.description}`}>1234567</div>
</div>
          </>
       )}
       </div>
      <div className={profilClass.inputDiv} >
                <div><Button content="Modify" color="dark" /></div>
                <div><Button content="Delete" color="dark"/></div>
                
      </div>
       </div>
         
         
     
         </div>
        </>
       );
}

export default UserProfil




        

   
   
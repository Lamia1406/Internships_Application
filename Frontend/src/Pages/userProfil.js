import { useEffect, useState } from 'react';
import profilClass from '../Styles/userProfil.module.css'
import { Helmet } from 'react-helmet';
import User from '../Images/userBig.png'
import Button from '../partials/button';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Input from '../partials/input';
import { toast } from 'react-toastify';
import { json } from 'react-router-dom';
function UserProfil(){
  const user = jwtDecode(localStorage.getItem("token"))
  const[modifyURL,setModifyURL]=useState("")
  const [userProfil,setUserProfil]=useState("")
  const [profilDetails,setDetails]=useState([])
  const [full_name,setFullName]=useState(user.full_name)
  const [email,setEmail]=useState(user.email)
  const [phone,setPhone] =useState(0)
  const [password,setPassword]=useState(user.password)
  const [student_card_number,setCardNumber] =useState(0)
  const [image,setImage] = useState(user.image)
  const handleImage = (e) =>{
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file)
 }   
 const setFileToBase = (file)=>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = ()=>{
        setImage(reader.result)
    }
}
const fetchUser = async()=>{
  setUserProfil(`http://localhost:4000/user/profil/${user.userType}/${user._id}`)
try{
  const res = await axios.get(`${userProfil}`);

  if(res.data.status){
     setDetails(res.data.profil)
  }
}
catch(err){
  console.log(err)
}
}
    const [social_security_number,setSecurityNumber]=useState(0)
    useEffect(() => {
      if (user.userType === "student") {
        setModifyURL(`http://localhost:4000/user/student/${user._id}`)
        fetchUser()
        setPhone(user.phone);
        setCardNumber(user.student_card_number)
        setSecurityNumber(user.social_security_number)
      }
    }, [userProfil]);
  
  
  const [modifyClass,setModifyClass]=useState(false)
  const modifyProfil = async (event) =>{
    event.preventDefault();
    const payload = {
      full_name,
      student_card_number,
      social_security_number,
      password,
      phone,
      image
  }
         try{
               const res = await axios.put(modifyURL,payload);
               if(res.data.status){
                     toast.success("Your account has been successfully modified")
                     window.location.reload();
                     
                     
               }
         }
         catch(err){
          console.log(err)
          toast.error(err.response.data.error)
         }
         
   }
    return ( 
        <>
        <Helmet>
         <title>ConnectU | Profil</title>
         <meta name='description' content='HomePage'/>
        </Helmet>
         {modifyClass == false && (
          <div className={`${profilClass.page} container-fluid`}>
          <div className= {profilClass.section}>
          <div className={profilClass.avatar}>
       {
         user.image != "" ? <img src={profilDetails.image} alt='User pic' /> : <img src={User} alt='User pic' />
       }
       </div>
       <div className={profilClass.name}>
       {profilDetails.full_name}
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
     <div className={`${profilClass.description}`}>{profilDetails.email}</div>
     </div>
     {
       (user.userType == "department responsible" || user.userType == "student") &&(
           <>
            <div className={` ${profilClass.profilDetails}`}>
     <div className={`${profilClass.title}`}>Phone number</div>
     <div className={`${profilClass.description}`}>(+213) {profilDetails.phone}</div>
     </div>
           </>
       )
     }
    {user.userType =="department responsible" && (
     <>
      <div className={` ${profilClass.profilDetails}`}>
     <div className={`${profilClass.title}`}>Fax number</div>
     <div className={`${profilClass.description}`}>(+213) {user.fax}</div>
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
<div className={`${profilClass.description}`}>{profilDetails.student_card_number}</div>
</div>
<div className={` ${profilClass.profilDetails}`}>
<div className={`${profilClass.title}`}> Social Security Number</div>
<div className={`${profilClass.description}`}>{profilDetails.social_security_number}</div>
</div>
       </>
    )}
    
    </div>
   <div className={profilClass.inputDiv} >
             <div><Button content="Modify" color="dark" onClick={()=>setModifyClass(true)} /></div>  
             {
               user.userType == "webmaster" && (
                 <div><Button content="Delete" color="dark"/></div>
               )
             }              
   </div>
    </div>
      
      
  
      </div>
         )}
         {
          modifyClass == true && (
            <div className={`${profilClass.page} container-fluid`}>
          <div className= {profilClass.section}>
          <div className={profilClass.avatar}>
          <Input placeholder="Image" type="file" onChange={handleImage}/>
       </div>
       <div className={profilClass.name}>
       <Input placeholder={`Full Name : ${full_name}`} type="text" onChange={(e)=> setFullName(e.target.value)}/>
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
     <Input placeholder={`Email : ${email}`} type="email" disabled/>
     </div>
     {
       (user.userType == "department responsible" || user.userType == "student") &&(
           <>
            <div className={` ${profilClass.profilDetails}`}>
            <Input placeholder={`Phone Number : ${phone}`} type="number" onChange={(e)=> setPhone(e.target.value)} />
     </div>
           </>
       )
     }
    {user.userType =="department responsible" && (
     <>
      <div className={` ${profilClass.profilDetails}`}>
     <div className={`${profilClass.title}`}>Fax number</div>
     <div className={`${profilClass.description}`}>(+213) 0{user.fax}</div>
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
<Input placeholder={`Student Card Number : ${student_card_number}`} type="number" onChange={(e)=> setCardNumber(e.target.value)} />
</div>
<div className={` ${profilClass.profilDetails}`}>
<Input placeholder={`Social Security Number : ${social_security_number}`} type="number" onChange={(e)=> setSecurityNumber(e.target.value)} />
</div>
<div className={` ${profilClass.profilDetails}`}>
<Input placeholder="Password" type="password" onChange={(e)=> setPassword(e.target.value)} />
</div>
       </>
    )}
    
    </div>
   <div className={profilClass.inputDiv} >
             <div><Button content="Validate" color="dark" onClick={modifyProfil}/></div>  
                 <div><Button content="Cancel" color="white" onClick={()=>setModifyClass(false)} /></div>
                          
   </div>
    </div>
      
      
  
      </div>
          )
         }
        </>
       );
}

export default UserProfil




        

   
   
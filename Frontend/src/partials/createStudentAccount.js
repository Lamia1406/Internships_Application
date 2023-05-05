import createStudentClass from '../Styles/partials/createStudentAccount.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Input from './input';
import Button from '../partials/button';
 import {toast} from 'react-toastify';
 import axios from 'axios';
 import { useState,useEffect } from 'react';
function CreateStudentAccount(props)
{

    const createStudentUrl="http://localhost:4000/v1/user/signup";
    const [full_name,setFullName]=useState("");
    const [email,setEmail]=useState("");
    const [phone,setPhone]=useState("");
    const [department,setDepartment] = useState("");
    const [level_of_study,setLevelOfStudy]=useState("");
    const [student_card_number,setCardNumber]=useState("");
    const [social_security_number,setSecurityNumber]=useState("");
    const [password,setPassword]=useState("");
    const submitForm = async(event) =>{
        event.preventDefault();
        const payload = {
            full_name,
            email,
            level_of_study,
            student_card_number,
            social_security_number,
            password,
            department,
            phone
        }
        try{
            const res = await axios.post(`${createStudentUrl}`, payload);
          
            if (res.data.status=== true){
                setCardNumber("");
                setDepartment("");
                setEmail("");
                setFullName("");
                setLevelOfStudy("");
                setPassword("");
                setPhone("");                
                toast.success("Student Created Successfully")
                window.location.replace("/students")

                
            }
        }
        catch (err) {
           toast.error(err.response.data.message)
           console.log(err.response.data.message)
        }
    };
return (
    <div className={`modal fade `} id={props.modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className={`modal-dialog modal-dialog-centered modal-lg `}>
        <div className={`modal-content ${createStudentClass.main}`}>
        <button type="button" className={`btn-close ${createStudentClass.close}`} data-bs-dismiss="modal" aria-label="Close"></button>
        <div className={createStudentClass.body}>
           <div className={createStudentClass.information}>
           <div className={` ${createStudentClass.profilDetails}`}>
            <div className={`${createStudentClass.title}`}>Full Name</div>
            <div className={`${createStudentClass.description}`}>
                <Input placeholder="fill this input" type="text" onChange={(e)=> setFullName(e.target.value)}/>
            </div>
            </div>
           <div className={` ${createStudentClass.profilDetails}`}>
            <div className={`${createStudentClass.title}`}>Email</div>
            <div className={`${createStudentClass.description}`}>
                <Input placeholder="fill this input" type="email"  onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            </div>
           <div className={` ${createStudentClass.profilDetails}`}>
            <div className={`${createStudentClass.title}`}>Phone Number</div>
            <div className={`${createStudentClass.description}`}>
                <Input placeholder="fill this input" text="number"  onChange={(e)=> setPhone(e.target.value)} />
            </div>
            </div>
           <div className={` ${createStudentClass.profilDetails}`}>
            <div className={`${createStudentClass.title}`}>Student Card Number</div>
            <div className={`${createStudentClass.description}`}>
                <Input placeholder="fill this input" type="number"  onChange={(e)=> setCardNumber(e.target.value)} />
            </div>
            </div>
           <div className={` ${createStudentClass.profilDetails}`}>
            <div className={`${createStudentClass.title}`}>Social Security Number</div>
            <div className={`${createStudentClass.description}`}>
                <Input placeholder="fill this input" type="number" onChange={(e)=> setSecurityNumber(e.target.value)} />
            </div>
            </div>
           <div className={` ${createStudentClass.profilDetails}`}>
            <div className={`${createStudentClass.title}`}>Department</div>
            <div className={`${createStudentClass.description}`}>
            <select className={createStudentClass.select} onChange={(e)=> setDepartment(e.target.value)} defaultValue="department">
      <option disabled value="department" > Department</option>
      <option className={createStudentClass.category} value="Technologies des Logiciels et Systèmes d'Information"> Technologies des Logiciels et Systèmes d'Information</option>
      <option className={createStudentClass.category} value="Informatique Fondamentale et ses Applications"> Informatique Fondamentale et ses Applications</option>
      
      </select>
            </div>
            </div>
           <div className={` ${createStudentClass.profilDetails}`}>
            <div className={`${createStudentClass.title}`}>Study Level</div>
            <div className={`${createStudentClass.description}`}>
            <select className={createStudentClass.select} onChange={(e)=> setLevelOfStudy(e.target.value)} defaultValue="level of study">
      <option disabled value="level of study"> Level of Study </option>
      <option className={createStudentClass.category} value="L3"> L3</option>
      <option className={createStudentClass.category} value="M2"> M2</option>
      
      </select>
            </div>
            </div>
           <div className={` ${createStudentClass.profilDetails}`}>
            <div className={`${createStudentClass.title}`}>Password</div>
            <div className={`${createStudentClass.description}`}>
            <Input placeholder="fill this input" type="password"  onChange={(e)=> setPassword(e.target.value)} />
            </div>
            </div>
          
           </div>
           <div className={createStudentClass.inputDiv} >
            <div className={createStudentClass.navigationBtn}>
                <Button content="Validate" color="dark" onClick={submitForm}/>
            </div>
            <div className={createStudentClass.navigationBtn}>
                <Button content="Cancel" color="white" dataBsDismiss="modal"/>
            </div>
      </div>
          </div>
         
        </div>
        
      </div>
       
    
    </div>
)
}
export default CreateStudentAccount
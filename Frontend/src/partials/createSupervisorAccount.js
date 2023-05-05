import createAccount from '../Styles/partials/createSupervisorAccount.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Input from './input';
import Button from '../partials/button'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
function CreateSupervisorAccount(props)
{
    const createSupervisorsURL="http://localhost:4000/v1/user/create_supervisor";
    const [full_name,setFullName]=useState("");
    const [email,setEmail]=useState("");
    const [company,setCompany]=useState("")
    const [address,setCompanyAddress]=useState("")
    const [password,setPassword]=useState("");
    const submitForm = async(event) =>{
        event.preventDefault();
        const payload = {
            full_name,
            email,
            company,
            address,
            password,
        }
        try{
            const res = await axios.post(`${createSupervisorsURL}`, payload);
          
            if (res.data.status=== true){
                setCompany("");
                setCompanyAddress("");
                setEmail("");
                setFullName("");
                setPassword("");                
                toast.success("Supervisor Created Successfully")
                window.location.replace("/supervisors")

                
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
        <div className={`modal-content ${createAccount.main}`}>
        <button type="button" className={`btn-close ${createAccount.close}`} data-bs-dismiss="modal"aria-label="Close"></button>
        <div className={createAccount.body}>
           <div className={createAccount.information}>
           <div className={` ${createAccount.profilDetails}`}>
            <div className={`${createAccount.title}`}>Full Name</div>
            <div className={`${createAccount.description}`}>
                <Input placeholder="fill this input" type="text" onChange={(e)=> setFullName(e.target.value)} />
            </div>
            </div>
           <div className={` ${createAccount.profilDetails}`}>
            <div className={`${createAccount.title}`}>Email</div>
            <div className={`${createAccount.description}`}>
                <Input placeholder="fill this input" type="email" onChange={(e)=> setEmail(e.target.value)} />
            </div>
            </div>
           <div className={` ${createAccount.profilDetails}`}>
            <div className={`${createAccount.title}`}>Company</div>
            <div className={`${createAccount.description}`}>
                <Input placeholder="fill this input" type="text" onChange={(e)=> setCompany(e.target.value)} />
            </div>
            </div>
           <div className={` ${createAccount.profilDetails}`}>
            <div className={`${createAccount.title}`}>Company Address</div>
            <div className={`${createAccount.description}`}>
                <Input placeholder="fill this input" type="text" onChange={(e)=> setCompanyAddress(e.target.value)} />
            </div>
            </div>
           <div className={` ${createAccount.profilDetails}`}>
            <div className={`${createAccount.title}`}>Password</div>
            <div className={`${createAccount.description}`}>
                <Input placeholder="fill this input" type="password" onChange={(e)=> setPassword(e.target.value)} />
            </div>
            </div>
           
          
          
           </div>
           <div className={createAccount.inputDiv} >
            <div className={createAccount.navigationBtn}>
                <Button content="Validate" color="dark" onClick={submitForm}/>
            </div>
            <div className={createAccount.navigationBtn}>
                <Button content="Cancel" color="white" dataBsDismiss="modal"/>
            </div>
      </div>
          </div>
         
        </div>
        
      </div>
       
    
    </div>
)
}
export default CreateSupervisorAccount
import createUniClass from "../../Styles/partials/CreateDatabase/createUniversity.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Input from "../input";
import Button from "../button";
 import {toast} from 'react-toastify';
 import axios from 'axios';
 import { useState } from 'react';
 

function CreateUniversity(){
    const createUniversityURL="http://localhost:4000/university/createUniversity";
    const [address,setAddress]=useState("");
    const [full_name,setFullName]=useState("");
    const [submitSuccessful,setSubmitSuccessful] = useState(false)
    const submitForm = async(event) =>{
        event.preventDefault();
        const payload = {
            address,
            full_name,
        }
        try{
            const res = await axios.post(`${createUniversityURL}`, payload);
            if (res.data.status == true){
                toast.success("University created Successfully" )
                setAddress("");
                setFullName("")
                setSubmitSuccessful(!submitSuccessful)
                window.location.reload()

            }
            else {
                toast.warn("Failed Operation")
            }
        }
        catch (err) {
            toast.error(err.response.data.error)
            console.log(err.response.data.error)
        }
    }
return (
    <div className={`modal fade `}  tabIndex="-1" id="createUni" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className={`modal-dialog modal-dialog-centered modal-lg `}>
        <div className={`modal-content ${createUniClass.main}`}>
        <button type="button" className={`btn-close ${createUniClass.close}`} data-bs-dismiss="modal"aria-label="Close"></button>
        <div className={createUniClass.body}>
           <div className={createUniClass.information}>
           <div className={` ${createUniClass.profilDetails}`}>
            <div className={`${createUniClass.title}`}>University Name</div>
            <div className={`${createUniClass.description}`}>
                <Input placeholder="fill this input" type="text" onChange={(e)=> setFullName(e.target.value)} value={full_name}/>
            </div>
            </div>
           <div className={` ${createUniClass.profilDetails}`}>
            <div className={`${createUniClass.title}`}>Address</div>
            <div className={`${createUniClass.description}`}>
            <Input placeholder="fill this input" text="text" onChange={(e)=> setAddress(e.target.value)} value={address} />
            </div>
            </div>
           </div>
           <div className={createUniClass.inputDiv} >
            <div className={createUniClass.navigationBtn}>
                <Button content="Validate" color="dark" onClick={submitForm} />
            </div>
            <div className={createUniClass.navigationBtn}>
                <Button content="Cancel" color="white" dataBsDismiss="modal"/>
            </div>
      </div>
          </div>
      
        </div>
        
      </div>
    
    </div>
   
)
}

export default CreateUniversity
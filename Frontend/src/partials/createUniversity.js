import createUniversityClass from '../Styles/partials/createUniversity.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Input from './input';
import Button from './button';
 import {toast} from 'react-toastify';
 import axios from 'axios';
 import { useState,useEffect } from 'react';
function CreateUniversity(props)
{
    const createUniversityURL="http://localhost:4000/v1/university/createUniversity";
    const [address,setAddress]=useState("");
    const [full_name,setName]=useState("");
    const [submitSuccessful,setSubmitSuccessful] = useState(false)

    const submitForm = async(event) =>{
        event.preventDefault();
        const payload = {
            address,
            full_name
        }
        try{
            const res = await axios.post(`${createUniversityURL}`, payload);
            if (res.data.status == true){
                toast.success("University created Successfully" )
                setName("");
                setAddress("");
                setSubmitSuccessful(!submitSuccessful)
               window.location.replace("/departments")

            }
            else {
                toast.warn("Failed Operation")
            }
        }
        catch (err) {
            toast.error(err.response.data.error)
            console.log(err.response.data.error)
        }
    };


return (
    <div className={`modal fade `} id={props.modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
    <div className={`modal-dialog modal-dialog-centered modal-lg `}>
        <div className={`modal-content ${createUniversityClass.main}`}>
        <button type="button" className={`btn-close ${createUniversityClass.close}`} data-bs-dismiss="modal"aria-label="Close"></button>
        <div className={createUniversityClass.body}>
           <div className={createUniversityClass.information}>
           <div className={` ${createUniversityClass.profilDetails}`}>
            <div className={`${createUniversityClass.title}`}>University Name</div>
            <div className={`${createUniversityClass.description}`}>
            <Input placeholder="fill this input" type="text" onChange={(e)=> setName(e.target.value)} value={full_name}/>
            </div>
            </div>
           <div className={` ${createUniversityClass.profilDetails}`}>
            <div className={`${createUniversityClass.title}`}>Address</div>
            <div className={`${createUniversityClass.description}`}>
            <Input placeholder="fill this input" type="text" onChange={(e)=> setAddress(e.target.value)} value={address}/>
            </div>
            </div>
           </div>
           <div className={createUniversityClass.inputDiv} >
            <div className={createUniversityClass.navigationBtn}>
                <Button content="Validate" color="dark" onClick={submitForm} />
            </div>
            <div className={createUniversityClass.navigationBtn}>
                <Button content="Cancel" color="white" dataBsToggle="modal" dataBsTarget="#faculty"/>
            </div>
      </div>
          </div>
         
        </div>
        
      </div>
       
    
    </div>
)
}
export default CreateUniversity
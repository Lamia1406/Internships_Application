import createCompanyClass from '../Styles/partials/createCompany.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Input from './input';
import Button from './button';
 import {toast} from 'react-toastify';
 import axios from 'axios';
 import { useState } from 'react';
function CreateCompany(props)
{
    const createCompanyURL="http://localhost:4000/v1/post/createCompany";
    const [address,setAddress]=useState("");
    const [company_name,setCompanyName]=useState("");
    const [submitSuccessful,setSubmitSuccessful] = useState(false)
    const submitForm = async(event) =>{
        event.preventDefault();
        const payload = {
            address,
            company_name,
        }
        try{
            const res = await axios.post(`${createCompanyURL}`, payload);
            if (res.data.status == true){
                toast.success("Company created Successfully" )
                setCompanyName("");
                setAddress("");
                setSubmitSuccessful(!submitSuccessful)
                window.location.replace("/internships")

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
    <div className={`modal fade `} id={props.modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className={`modal-dialog modal-dialog-centered modal-lg `}>
        <div className={`modal-content ${createCompanyClass.main}`}>
        <button type="button" className={`btn-close ${createCompanyClass.close}`} data-bs-dismiss="modal"aria-label="Close"></button>
        <div className={createCompanyClass.body}>
           <div className={createCompanyClass.information}>
           <div className={` ${createCompanyClass.profilDetails}`}>
            <div className={`${createCompanyClass.title}`}>Company Name</div>
            <div className={`${createCompanyClass.description}`}>
            <Input placeholder="fill this input" type="text" onChange={(e)=> setCompanyName(e.target.value)} value={company_name}/>
            </div>
            </div>
           <div className={` ${createCompanyClass.profilDetails}`}>
            <div className={`${createCompanyClass.title}`}>Address</div>
            <div className={`${createCompanyClass.description}`}>
            <Input placeholder="fill this input" type="text" onChange={(e)=> setAddress(e.target.value)} value={address}/>

            </div>
            </div>
           </div>
           <div className={createCompanyClass.inputDiv} >
            <div className={createCompanyClass.navigationBtn}>
                <Button content="Validate" onClick={submitForm}   />
            </div>
            <div className={createCompanyClass.navigationBtn}>
                <Button content="Cancel" color="white" dataBsToggle="modal" dataBsTarget={`#${props.drop}`}/>
            </div>
      </div>
          </div>
         
        </div>
        
      </div>
       
    
    </div>
)
}
export default CreateCompany
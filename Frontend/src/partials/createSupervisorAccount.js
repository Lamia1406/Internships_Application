import createAccount from '../Styles/partials/createSupervisorAccount.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Input from './input';
import Button from '../partials/button'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
function CreateSupervisorAccount(props)
{
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
    const getAllCompanies = "http://localhost:4000/v1/post/allCompanies"

    const createSupervisorsURL="http://localhost:4000/v1/user/create_supervisor";
    const [full_name,setFullName]=useState("");
    const [email,setEmail]=useState("");
    const [company,setCompany]=useState("")
    const [companies,setCompanies]=useState([])
    const [password,setPassword]=useState("");
    const [image,setImage] = useState("");
    const fetchCompanies = async () => {
        const res = await axios.get(`${getAllCompanies}`);
        if(res.data){
            console.log(res.data)
          setCompanies(res.data.companies)
        }
      }
      useEffect(()=>{
        fetchCompanies();
      },[]);
    const submitForm = async(event) =>{
        event.preventDefault();
        const payload = {
            full_name,
            email,
            company,
            password,
            image
        }
        try{
            const res = await axios.post(`${createSupervisorsURL}`, payload);
          
            if (res.data.status=== true){
                setCompany("");
                setEmail("");
                setFullName("");
                setPassword("");                
                toast.success("Supervisor Account Created Successfully")
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
            <div className={`${createAccount.title}`}> Profil Picture</div>
            <div className={`${createAccount.description}`}>
            <Input placeholder="fill this input" type="file" onChange={handleImage}/>
            </div>
            </div>
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
            <select className={createAccount.select} onChange={(e)=> setCompany(e.target.value)} value={company} >
      <option disabled  value="" > Select Your Company</option>
      {companies.map((c) => (
          <option key={c._id} value={c._id}>
            {c.company_name}
          </option>
       
        ))}
      </select> 
      <p> Or </p> 
     <div className={createAccount.addFaculty} >
         <Button content="Add Company" color="white"  dataBsToggle="modal" dataBsTarget="#company"/>
          </div>
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
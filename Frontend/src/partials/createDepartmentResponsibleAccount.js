import createDepAccountClass from '../Styles/partials/createDepResAccount.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Input from './input';
import Button from '../partials/button'
import { useState , useEffect} from 'react';
import axios from 'axios';
import {toast} from "react-toastify"
function CreateDepartmentResponsibleAccount(props)
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
     const getAllFaculties = "http://localhost:4000/v1/university/allFaculties"
     const createResponsibleURL="http://localhost:4000/v1/user/create_responsible";
    const [full_name,setFullName]=useState("");
    const [email,setEmail]=useState("");
    const [image,setImage] = useState("");
    const [phone,setPhone] = useState("");
    const [fax,setFax] = useState("");
    const [faculties,setFaculties] = useState([]);
    const [password, setPassword] = useState("")
    const [faculty, setFaculty] = useState("")
    const [dep_name, setDepartment] = useState("")
    const fetFaculties = async () => {
      const res = await axios.get(`${getAllFaculties}`);
      if(res.data){
        setFaculties(res.data.faculties)
      }
    }
    useEffect(()=>{
      fetFaculties();
    },[]);
    const submitForm = async(event) =>{
        event.preventDefault();
        const payload = {
    full_name,
    email,
    image,
    phone,
    fax,
    password,
    dep_name,
    faculty
        }
        try{
            const res = await axios.post(`${createResponsibleURL}`, payload);
            console.log(res)
            if (res.data.status == true){
                toast.success("Department Responsible Account Created Successfully" )
                setFullName("")
                setEmail("")
                setImage("")
                setPhone("")
                setFax("")
                setPassword("")
                setDepartment("")
                setFaculty("")
                window.location.replace("/departments")
            }
            else {
                toast.warn("Failed Operation")
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
        <div className={`modal-content ${createDepAccountClass.main}`}>
        <button type="button" className={`btn-close ${createDepAccountClass.close}`} data-bs-dismiss="modal"aria-label="Close"></button>
        <div className={createDepAccountClass.body}>
           <div className={createDepAccountClass.information}>
           <div className={` ${createDepAccountClass.profilDetails}`}>
            <div className={`${createDepAccountClass.title}`}> Profil Picture</div>
            <div className={`${createDepAccountClass.description}`}>
            <Input placeholder="fill this input" type="file" onChange={handleImage}/>
            </div>
            </div>
           <div className={` ${createDepAccountClass.profilDetails}`}>
            <div className={`${createDepAccountClass.title}`}>Full Name</div>
            <div className={`${createDepAccountClass.description}`}>
                <Input placeholder="fill this input" type="text" value={full_name}  onChange= {(e)=>setFullName(e.target.value)}/>
            </div>
            </div>
           <div className={` ${createDepAccountClass.profilDetails}`}>
            <div className={`${createDepAccountClass.title}`}>Email</div>
            <div className={`${createDepAccountClass.description}`}>
                <Input placeholder="fill this input" type="email" value={email}  onChange= {(e)=>setEmail(e.target.value)} />
            </div>
            </div>
           <div className={` ${createDepAccountClass.profilDetails}`}>
            <div className={`${createDepAccountClass.title}`}>Phone Number</div>
            <div className={`${createDepAccountClass.description}`}>
                <Input placeholder="fill this input" type="number" value={phone}  onChange= {(e)=>setPhone(e.target.value)} />
            </div>
            </div>
           <div className={` ${createDepAccountClass.profilDetails}`}>
            <div className={`${createDepAccountClass.title}`}>Fax Number</div>
            <div className={`${createDepAccountClass.description}`}>
                <Input placeholder="fill this input" type="number" value={fax}  onChange= {(e)=>setFax(e.target.value)} />
            </div>
            </div>
            <div className={` ${createDepAccountClass.profilDetails}`}>
            <div className={`${createDepAccountClass.title}`}>Department</div>
            <div className={`${createDepAccountClass.description}`}>
                <Input placeholder="fill this input" type="text" value={dep_name}  onChange= {(e)=>setDepartment(e.target.value)} />
            </div>
            </div>
           <div className={` ${createDepAccountClass.profilDetails}`}>
            <div className={`${createDepAccountClass.title}`}>Faculty</div>
            <div className={`${createDepAccountClass.description}`}>
            <select className={createDepAccountClass.select} onChange={(e)=> setFaculty(e.target.value)} value={faculty} >
      <option disabled  value="" > Select Your Faculty</option>
      {faculties.map((f) => (
          <option key={f._id} value={f._id}>
            {f.name}
          </option>
       
        ))}      
      </select> 
      <p> Or </p> 
     <div className={createDepAccountClass.addFaculty} >
         <Button content="Add Faculty" color="white"  dataBsToggle="modal" dataBsTarget="#faculty"/>
          </div>
            </div>
            </div>
            <div className={` ${createDepAccountClass.profilDetails}`}>
            <div className={`${createDepAccountClass.title}`}>Password</div>
            <div className={`${createDepAccountClass.description}`}>
                <Input placeholder="fill this input" type="password" value={password}  onChange= {(e)=>setPassword(e.target.value)} />
            </div>
            </div>
          
           </div>
           <div className={createDepAccountClass.inputDiv} >
            <div className={createDepAccountClass.navigationBtn}>
                <Button content="Validate" color="dark" onClick={submitForm}/>
            </div>
            <div className={createDepAccountClass.navigationBtn}>
                <Button content="Cancel" color="white" dataBsDismiss="modal"/>
            </div>
      </div>
          </div>
         
        </div>
        
      </div>
       
    
    </div>
)
}
export default CreateDepartmentResponsibleAccount
import createDepAccountClass from '../../Styles/partials/CreateDatabase/createDB.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from '../input';
import Button from '../button'
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
     const getAllDepartments = "http://localhost:4000/university/allDepartments"
     const createResponsibleURL="http://localhost:4000/user/createResponsible";
    const [full_name,setFullName]=useState("");
    const [email,setEmail]=useState("");
    const [image,setImage] = useState("");
    const [phone,setPhone] = useState("");
    const [fax,setFax] = useState("");
    const [departments,setDepartments] = useState([]);
    const [password, setPassword] = useState("")
    const [department, setDepartment] = useState("")
    const fetchDepartments = async () => {
      const res = await axios.get(`${getAllDepartments}`);
      if(res.data){
        setDepartments(res.data.departments)
      }
    }
    useEffect(()=>{
      fetchDepartments();
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
    department,
    
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
    <div className={`modal fade `} id={props.modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className={`modal-dialog modal-dialog-centered modal-lg `}>
        <div className={`modal-content ${createDepAccountClass.main}`}>
        <button type="button" className={`btn-close ${createDepAccountClass.close}`} data-bs-dismiss="modal"aria-label="Close"></button>
        <div className={createDepAccountClass.body}>
           <div className={createDepAccountClass.information}>
           <div className={` ${createDepAccountClass.profilDetails}`}>
            <div className={`${createDepAccountClass.title}`}>Faculty</div>
            <div className={`${createDepAccountClass.description}`}>
            <select className={createDepAccountClass.select} onChange={(e)=> setDepartment(e.target.value)} value={department} >
      <option disabled  value="" > Select Your Department</option>
      {departments.map((f) => (
          <option key={f._id} value={f._id}>
            {f.full_name}
          </option>
       
        ))}      
      </select> 
     
            </div>
            </div>
           
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
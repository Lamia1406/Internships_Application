import createFacultyClass from '../../Styles/partials/CreateDatabase/createDB.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from '../input';
import Button from '../button';
 import {toast} from 'react-toastify';
 import axios from 'axios';
 import { useState,useEffect } from 'react';
function CreateFaculty(props)
{
    const getAllUniversities = "http://localhost:4000/university/allUniversities"
    const createFacultyURL="http://localhost:4000/university/createFaculty";
    const [address,setAddress]=useState("");
    const [name,setName]=useState("");
    const [universities,setUniversities] = useState([])
    const [university,setUniversity] = useState("")
    const [submitSuccessful,setSubmitSuccessful] = useState(false)

    const fetUniversities = async () => {
        const res = await axios.get(`${getAllUniversities}`);
        if(res.data){
          setUniversities(res.data.universities)
        }
      }
      useEffect(()=>{
        fetUniversities();
      },[]);
    const submitForm = async(event) =>{
        event.preventDefault();
        const payload = {
            address,
            name,
            university
        }
        try{
            const res = await axios.post(`${createFacultyURL}`, payload);
            if (res.data.status == true){
                toast.success("Company created Successfully" )
                setName("");
                setAddress("");
                setSubmitSuccessful(!submitSuccessful)
                setUniversity("")
                window.location.reload();

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
    <div className={`modal fade `} id="createFac" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
    <div className={`modal-dialog modal-dialog-centered modal-lg `}>
        <div className={`modal-content ${createFacultyClass.main}`}>
        <button type="button" className={`btn-close ${createFacultyClass.close}`} data-bs-dismiss="modal"aria-label="Close"></button>
        <div className={createFacultyClass.body}>
           <div className={createFacultyClass.information}>
           <div className={` ${createFacultyClass.profilDetails}`}>
            <div className={`${createFacultyClass.title}`}>University</div>
            <div className={`${createFacultyClass.description}`}>
            <select className={createFacultyClass.select} onChange={(e)=> setUniversity(e.target.value)} value={university} defaultValue='university'>
      <option disabled  value="" > Select University</option>
      {universities.map((u) => (
          <option key={u._id} value={u._id}>
            {u.full_name}
          </option>
       
        ))}
                

                
      
      </select> 
      
            </div>
            </div>
           <div className={` ${createFacultyClass.profilDetails}`}>
            <div className={`${createFacultyClass.title}`}>Faculty Name</div>
            <div className={`${createFacultyClass.description}`}>
            <Input placeholder="fill this input" type="text" onChange={(e)=> setName(e.target.value)} value={name}/>
            </div>
            </div>
           <div className={` ${createFacultyClass.profilDetails}`}>
            <div className={`${createFacultyClass.title}`}>Address</div>
            <div className={`${createFacultyClass.description}`}>
            <Input placeholder="fill this input" type="text" onChange={(e)=> setAddress(e.target.value)} value={address}/>
            </div>
            </div>
            
           </div>
           <div className={createFacultyClass.inputDiv} >
            <div className={createFacultyClass.navigationBtn}>
                <Button content="Validate" color="dark" onClick={submitForm}  />
            </div>
            <div className={createFacultyClass.navigationBtn}>
                <Button content="Cancel" color="white" dataBsDismiss="modal"/>
            </div>
      </div>
          </div>
         
        </div>
        
      </div>
       
    
    </div>
)
}
export default CreateFaculty
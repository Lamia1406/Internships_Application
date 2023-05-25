import createFacultyClass from '../../Styles/partials/CreateDatabase/createDB.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Input from '../input';
import Button from '../button';
 import {toast} from 'react-toastify';
 import axios from 'axios';
 import { useState,useEffect } from 'react';
function CreateDepartment(props)
{
    const getAllFacultiesURL = "http://localhost:4000/university/allFaculties"
    const createDepartment="http://localhost:4000/university/createDepartment";
    const [full_name,setName]=useState("");
    const [faculties,setFaculties] = useState([])
    const [faculty,setFaculty] = useState("")
    const [submitSuccessful,setSubmitSuccessful] = useState(false)
    const fetchFaculties = async () => {
        const res = await axios.get(`${getAllFacultiesURL}`);
        if(res.data){
          setFaculties(res.data.faculties)
        }
      }
      useEffect(()=>{
        fetchFaculties();
      },[]);
    const submitForm = async(event) =>{
        event.preventDefault();
        const payload = {
            faculty,
            full_name,
        }
        try{
            const res = await axios.post(`${createDepartment}`, payload);
            if (res.data.status == true){
                toast.success("Company created Successfully" )
                setName("");
                
                setSubmitSuccessful(!submitSuccessful)
                setFaculty("")
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
    <div className={`modal fade `} id="createDep" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
    <div className={`modal-dialog modal-dialog-centered modal-lg `}>
        <div className={`modal-content ${createFacultyClass.main}`}>
        <button type="button" className={`btn-close ${createFacultyClass.close}`} data-bs-dismiss="modal"aria-label="Close"></button>
        <div className={createFacultyClass.body}>
           <div className={createFacultyClass.information}>
           <div className={` ${createFacultyClass.profilDetails}`}>
            <div className={`${createFacultyClass.title}`}>Faculty</div>
            <div className={`${createFacultyClass.description}`}>
            <select className={createFacultyClass.select} onChange={(e)=> setFaculty(e.target.value)} value={faculty} defaultValue='faculty'>
      <option disabled  value="" > Select Faculty</option>
      {faculties.map((u) => (
          <option key={u._id} value={u._id}>
            {u.name}
          </option>
       
        ))}
                
   
      
      </select> 
      
            </div>
            </div>
           <div className={` ${createFacultyClass.profilDetails}`}>
            <div className={`${createFacultyClass.title}`}>Department Name</div>
            <div className={`${createFacultyClass.description}`}>
            <Input placeholder="fill this input" type="text" onChange={(e)=> setName(e.target.value)} value={full_name}/>
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
export default CreateDepartment
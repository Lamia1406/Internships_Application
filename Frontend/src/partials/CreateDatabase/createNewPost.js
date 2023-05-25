import createPostClass from '../../Styles/partials/CreateDatabase/createDB.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from '../input';
import Button from '../button';
 import {toast} from 'react-toastify';
 import axios from 'axios';
 import TextArea from '../textarea';
 import { useState,useEffect } from 'react';

function CreateNewPost(props)
{
    const getAllCompanies = "http://localhost:4000/post/allCompanies"
    const createPostURL="http://localhost:4000/post/createPost";
    const [title,setTitle]=useState("");
    const [company,setCompany]=useState("");
    const [description,setDescription]=useState("");
    const [image,setImage] = useState("");
    const [companies, setCompanies] = useState([]);
    const fetchCompanies = async () => {
      const res = await axios.get(`${getAllCompanies}`);
      if(res.data){
        setCompanies(res.data.companies)
      }
    }
    useEffect(()=>{
      fetchCompanies();
    },[]);
    const submitForm = async(event) =>{
        event.preventDefault();
        const payload = {
            title,
            company,
            description, 
            image
        }
        console.log(company)
        try{
            const res = await axios.post(`${createPostURL}`, payload);
            console.log(res)
            if (res.data.status == true){
                toast.success("Post created Successfully" )
                setCompany("");
                setTitle("");
                setDescription("");
                setImage("")
                window.location.replace("/internships")
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
 const createCompany = () =>{

 }
return (
    <div className={`modal fade `} id={props.modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className={`modal-dialog modal-dialog-centered modal-lg `}>
        <div className={`modal-content ${createPostClass.main}`}>
        <button type="button" className={`btn-close ${createPostClass.close}`} data-bs-dismiss="modal"aria-label="Close"></button>
        <div className={createPostClass.body}>
           <div className={createPostClass.information}>
           <div className={` ${createPostClass.profilDetails}`}>
            <div className={`${createPostClass.title}`}>Image</div>
            <div className={`${createPostClass.description}`}>
                <Input placeholder="fill this input" type="file" onChange={handleImage}/>
            </div>
            </div>
           <div className={` ${createPostClass.profilDetails}`}>
            <div className={`${createPostClass.title}`}>Title</div>
            <div className={`${createPostClass.description}`}>
                <Input placeholder="fill this input" type="text" onChange={(e)=> setTitle(e.target.value)} value={title}/>
            </div>
            </div>
           <div className={` ${createPostClass.profilDetails}`}>
            <div className={`${createPostClass.title}`}>Company</div>
            <div className={`${createPostClass.description}`}>
            <select className={createPostClass.select} onChange={(e)=> setCompany(e.target.value)} value={company} defaultValue='company'>
      <option disabled  value="" > Select Company</option>
      {companies.map((c) => (
          <option key={c._id} value={c._id}>
            {c.company_name}
          </option>
       
        ))}
                

                
      
      </select> 
      
     
            </div>
            </div>
        
           <div className={` ${createPostClass.profilDetails}`}>
            <div className={`${createPostClass.title}`}>Description</div>
            <div className={`${createPostClass.description}`}>
            <TextArea placeholder="fill this input" text="text" maxLength="500"  onChange={(e)=> setDescription(e.target.value)} value={description} />
            </div>
            </div>
           </div>
           <div className={createPostClass.inputDiv} >
            <div className={createPostClass.navigationBtn}>
                <Button content="Validate" color="dark" onClick={submitForm} />
            </div>
            <div className={createPostClass.navigationBtn}>
                <Button content="Cancel" color="white" dataBsDismiss="modal"/>
            </div>
      </div>
          </div>
         
        </div>
        
      </div>
    
    </div>
)
}
export default CreateNewPost
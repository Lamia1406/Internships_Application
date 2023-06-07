import createUniClass from "../../Styles/partials/Database/createDB.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from "../input";
import Button from "../button";
 import {toast} from 'react-toastify';
 import axios from 'axios';
 import { useState,useEffect } from 'react';
 import TextArea from "../textarea";
import calendarPic from '../../Images/calendar.png'
import CalendarDiv from "../calendar";
import changeDateFormat from "../../features/changeDateFormat";
function CreateOneDataRecord(props){
    const getAllDepartmentsURL = "http://localhost:4000/university/allDepartments"
    const getAllCompanies = "http://localhost:4000/post/allCompanies"
    const [departments,setDepartments] = useState([])
    const [company,setCompany]=useState("")
    const [companies,setCompanies]=useState([])
    const [level_of_study,setLevelOfStudy]=useState("");
    const [student_card_number,setCardNumber]=useState("");
    const [social_security_number,setSecurityNumber]=useState(""); 
    const [createDataURL, setCreateDataURL]= useState("")
    const [title,setTitle]=useState("");
    const [is_present,setPresence]=useState("");
    const [day,setDay] = useState()
    const [description,setDescription]=useState("");
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
     const fetchDepartments = async () => {
        const res = await axios.get(`${getAllDepartmentsURL}`);
        if(res.data){
          setDepartments(res.data.departments)
        }
      }
      const fetchCompanies = async () => {
        const res = await axios.get(`${getAllCompanies}`);
        if(res.data){
          setCompanies(res.data.companies)
        }
      }
    useEffect(()=>{
        if(props.table == "Universities"){
            setCreateDataURL("http://localhost:4000/university/createUniversity")
        }
        if(props.table == "Faculties"){
            setCreateDataURL("http://localhost:4000/university/createFaculty")
        }
        if(props.table == "Departments"){
            setCreateDataURL("http://localhost:4000/university/createDepartment")
        }
        if(props.table == "Companies"){
            setCreateDataURL("http://localhost:4000/post/createCompany")
        }
        if(props.table == "Responsibles"){
            setCreateDataURL("http://localhost:4000/user/createResponsible")
            fetchDepartments()
        }
        if(props.table == "Students"){
            setCreateDataURL("http://localhost:4000/user/createStudent")
            fetchDepartments()
        }
        if(props.table == "Supervisors"){
            setCreateDataURL("http://localhost:4000/user/createSupervisor")
            fetchCompanies()
        }
        if(props.table == "Posts"){
            setCreateDataURL("http://localhost:4000/post/createPost")
            fetchCompanies()

        }
        if(props.table == "Presences"){
            setCreateDataURL(`http://localhost:4000/internship/markPresence/${props.student}/${props.internshipId}`)



        }
        

      },[]);
    const [full_name,setFullName]=useState("");
    const [address,setAddress]=useState("");
    const [university,setUniversity] = useState("")
    const [faculty,setFaculty] = useState("")
    const [department,setDepartment] = useState("")
    const [image,setImage] = useState("");
    const [email,setEmail]=useState("");
    const [phone,setPhone] = useState("");
    const [fax,setFax] = useState("");
    const [submitSuccessful,setSubmitSuccessful] = useState(false)
    const submitForm = async(event) =>{
        event.preventDefault();
        const payload = {
            ...(props.table != "Posts" && {full_name}),
            ...((props.table === "Universities" || props.table === "Faculties" || props.table === "Companies" )&& { address } ),
            ...(props.table === "Faculties"  && { university } ),
            ...(props.table === "Departments"  &&{ faculty } ),
            ...((props.table === "Responsibles" || props.table== "Students" || props.table == "Supervisors" ) && { email } ),
            ...((props.table === "Responsibles" || props.table== "Students" || props.table == "Supervisors" || props.table == "Posts") && { image } ),
            ...((props.table === "Responsibles" || props.table== "Students")  && { phone } ),
            ...((props.table === "Responsibles" || props.table== "Students")  && { department } ),
            ...(props.table === "Responsibles"   && { fax } ),
            ...((props.table === "Supervisors"  || props.table == "Posts") && { company } ),
            ...(props.table === "Students"   && { level_of_study }),
            ...(props.table === "Students"   && { social_security_number } ),
            ...(props.table === "Students"   && { student_card_number } ),
            ...(props.table === "Posts"   && { title } ),
            ...(props.table === "Posts"   && { description } ),
            ...(props.table === "Presences"   && { day } ),
            ...(props.table === "Presences"   && { is_present } ),

          };
        try{
            let res;
             if(props.table != "Presences"){
                res = await axios.post(`${createDataURL}`, payload);
             }
             else{
                res = await axios.put(`${createDataURL}`, payload);
             }
            if (res.data.status == true){
                toast.success("created Successfully" )
                setAddress("");
                setFullName("");
                setUniversity("")
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
    <>
    <div className={`modal fade `}  tabIndex="-1" id={props.id} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className={`modal-dialog modal-dialog-centered modal-lg `}>
        <div className={`modal-content ${createUniClass.main}`}>
        <button type="button" className={`btn-close ${createUniClass.close}`} data-bs-dismiss="modal"aria-label="Close"></button>
        <div className={createUniClass.body}>
           <div className={createUniClass.information}>
            {
                props.table == "Faculties" && (
                    <div className={`row ${createUniClass.profilDetails}`}>
            <div className={`${createUniClass.title} col-lg-3`}>University</div>
            <div className={`${createUniClass.description} col-lg-9`}>
            <select className={createUniClass.select} onChange={(e)=> setUniversity(e.target.value)} value={university} >
      <option disabled  value="" > Select University</option>
      {
      props.universities.map((u) => 
         {
            return  <option key={u._id} value={u._id}>
         {u.full_name} 
       </option>
       }
       
        )
        }
                

                
      
      </select> 
      
            </div>
            </div>
                )
            }
            {
                (props.table == "Responsibles" || props.table == "Students" )&& (
                   
                    <div className={`row ${createUniClass.profilDetails}`}>
                    <div className={` ${createUniClass.title} col-lg-3`}>Department</div>
                    <div className={` ${createUniClass.description} col-lg-9`}>
                    <select className={createUniClass.select} onChange={(e)=> setDepartment(e.target.value)} value={department} >
              <option disabled  value="" > Select the Department</option>
              {departments.map((f) => (
                  <option key={f._id} value={f._id}>
                    {f.full_name}
                  </option>
               
                ))}      
              </select> 
             
                    </div>
                    </div>
                   
                    
                   
                )
            }
            {
              (props.table == "Supervisors" || props.table=="Posts") && (
                <div className={`row ${createUniClass.profilDetails}`}>
            <div className={`${createUniClass.title} col-lg-3`}>Company</div>
            <div className={`${createUniClass.description} col-lg-9`}>
            <select className={createUniClass.select} onChange={(e)=> setCompany(e.target.value)} value={company} >
      <option disabled  value="" > {props.table == "Supervisors" ? "Select Internship Supervior Company" : "Select Company"}</option>
      {companies.map((c) => (
          <option key={c._id} value={c._id}>
            {c.full_name}
          </option>
       
        ))}
      </select> 
      
     
            </div>
            </div>
              )  
            }
            {
                (props.table == "Responsibles" || props.table == "Supervisors" || props.table == "Students" || props.table == "Posts") && (
                    <div className={`row ${createUniClass.profilDetails}`}>
                    <div className={`${createUniClass.title} col-lg-3`}> Image</div>
                    <div className={`${createUniClass.description} col-lg-9`}>
                    <Input placeholder="fill this input" type="file" onChange={handleImage}/>
                    </div>
                    </div>
                )
            }
            {
                props.table == "Departments" && (
                    <div className={`row ${createUniClass.profilDetails}`}>
            <div className={`${createUniClass.title} col-lg-3`}>Faculty</div>
            <div className={`${createUniClass.description } col-lg-9`}>
            <select className={createUniClass.select} onChange={(e)=> setFaculty(e.target.value)} value={faculty} >
      <option disabled  value="" > Select Faculty</option>
      {
      props.faculties.map((u) => 
         {
            return  <option key={u._id} value={u._id}>
         {u.full_name} 
       </option>
       }
       
        )
        }
                

                
      
      </select> 
      
            </div>
            </div>
                )
            }
           <div className={`row ${createUniClass.profilDetails}`}>
            <div className={`${createUniClass.title} col-lg-3`}>{
        props.table === "Universities"? "University Name"
    : 
        props.table === "Faculties" ? "Faculty Name"
    : 
        props.table === "Departments" ? "Department Name"
    : 
        props.table === "Companies" ? "Company Name" 
    :
        props.table === "Responsibles" ? "Department Responsible Name" 
    :
        props.table === "Supervisors" ? "Internship Supervisor Name" 
    :
        props.table === "Students" ? "Student Name" 
    : ""
    }</div>
           {
            (props.table != "Posts"  && props.table != "Presences"  ) && (
                <div className={`${createUniClass.description} col-lg-9`}>
                <Input placeholder="fill this input" type="text" onChange={(e)=> setFullName(e.target.value)} value={full_name}/>
            </div>
            )
           }
            </div>
           
            {
                (props.table=="Universities" || props.table == "Faculties"  || props.table == "Companies") && (
                    <div className={`row ${createUniClass.profilDetails} `}>
                    <div className={`${createUniClass.title} col-lg-3`}>Address</div>
                    <div className={`${createUniClass.description} col-lg-9`}>
                            <Input placeholder="fill this input" text="text" onChange={(e)=> setAddress(e.target.value)} value={address} />
                        
                    
                    </div>
                    </div>
                )
            }
            {
               ( props.table == "Responsibles" || props.table == "Supervisors" || props.table == "Students")&&
                (
                    <div className={`row ${createUniClass.profilDetails}`}>
                    <div className={`${createUniClass.title} col-lg-3`}>Email</div>
                    <div className={`${createUniClass.description} col-lg-9`}>
                        <Input placeholder="fill this input" type="email" value={email}  onChange= {(e)=>setEmail(e.target.value)} />
                    </div>
                    </div>
                )
            }
            {
                (props.table== "Responsibles" || props.table =="Students") && (
                   
           <div className={`row ${createUniClass.profilDetails}`}>
            <div className={`${createUniClass.title} col-lg-3`}>Phone Number</div>
            <div className={`${createUniClass.description} col-lg-9`}>
                <Input placeholder="fill this input" type="number" value={phone}  onChange= {(e)=>setPhone(e.target.value)} />
            </div>
            </div>
            )}
           {
            props.table == "Responsibles" && (
                <div className={`row ${createUniClass.profilDetails}`}>
            <div className={`${createUniClass.title} col-lg-3`}>Fax Number</div>
            <div className={`${createUniClass.description} col-lg-9`}>
                <Input placeholder="fill this input" type="number" value={fax}  onChange= {(e)=>setFax(e.target.value)} />
            </div>
            </div>
            )
           }
           {
            props.table == "Students" && (
                <>
                <div className={` row ${createUniClass.profilDetails}`}>
            <div className={`${createUniClass.title} col-lg-3`}>Student Card Number</div>
            <div className={`${createUniClass.description} col-lg-9`}>
                <Input placeholder="fill this input" type="number"  onChange={(e)=> setCardNumber(e.target.value)}  value={student_card_number}/>
            </div>
            </div>
           <div className={`row ${createUniClass.profilDetails}`}>
            <div className={`${createUniClass.title} col-lg-3`}>Social Security Number</div>
            <div className={`${createUniClass.description} col-lg-9`}>
                <Input placeholder="fill this input" type="number" onChange={(e)=> setSecurityNumber(e.target.value)} value={social_security_number} />
            </div>
            </div>
           <div className={`row ${createUniClass.profilDetails} `}>
            <div className={`${createUniClass.title} col-lg-3`}>Study Level</div>
            <div className={`${createUniClass.description} col-lg-9`}>
            <select className={createUniClass.select} onChange={(e)=> setLevelOfStudy(e.target.value)} defaultValue="level of study" >
      <option disabled value="level of study"> Level of Study </option>
      <option className={createUniClass.category} value="L3"> L3</option>
      <option className={createUniClass.category} value="M2"> M2</option>
      
      </select>
            </div>
            </div>
                </>
            )
           }
           {
            props.table == "Posts" && (
                <>
                <div className={`row ${createUniClass.profilDetails}`}>
            <div className={`${createUniClass.title} col-lg-3`}>Title</div>
            <div className={`${createUniClass.description} col-lg-9`}>
                <Input placeholder="fill this input" type="text" onChange={(e)=> setTitle(e.target.value)} value={title}/>
            </div>
            </div>  
           <div className={`row ${createUniClass.profilDetails}`}>
            <div className={`${createUniClass.title} col-lg-3`}>Description</div>
            <div className={`${createUniClass.description} col-lg-9`}>
            <TextArea placeholder="fill this input" text="text" maxLength="500"  onChange={(e)=> setDescription(e.target.value)} value={description} />
            </div>
            </div>
                </>
            )
           }
           {
            props.table == "Presences" && (
                <>
                <div className={`row ${createUniClass.profilDetails}`}>
            <div className={`${createUniClass.title} col-lg-3`}>Day </div>
            <div className={`${createUniClass.description} col-lg-9`}>
            <Input  disabled value={changeDateFormat(day)} />
                             <button type="button" className={`btn btn-primary} ${createUniClass.calendarBtn}`} data-bs-toggle="modal" data-bs-target="#calendarforpresence">
                                   <img src={calendarPic} alt='calendar icon' />
                                 </button>
            </div>
            </div>  
                <div className={`row ${createUniClass.profilDetails}`}>
            <div className={`${createUniClass.title} col-lg-3`}>Presence </div>
            <div className={`${createUniClass.description} col-lg-9`}>
             <select className={createUniClass.select} onChange={(e)=> setPresence(e.target.value)} value={is_present} >
                   <option disabled  value="" > Select The Student Presence</option>                 
                       <option value={true}>
                        Yes
                       </option>
                       <option value={false}>
                        No
                       </option>
                   </select>
            </div>
            </div>  
           
                </>
            )
           }
                    
          
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
    <CalendarDiv  onChange={(e) => setDay(e) } minDate={new Date(props.startingDate)} maxDate={new Date(props.endingDate)} value={day} id={"calendarforpresence"} footer = {props.id}/>
    
    </>
   
)
}

export default CreateOneDataRecord
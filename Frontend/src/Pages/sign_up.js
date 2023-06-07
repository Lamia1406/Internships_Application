import signupClass from "../Styles/main/signup.module.css"
import logo from '../Images/logo.png'
import Input from "../partials/input";
import  Button from "../partials/button";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import {NavLink} from 'react-router-dom'
import {useState,useEffect} from 'react';

import axios from 'axios'
import { toast } from "react-toastify";
function Signup(){
    const createStudentUrl="http://localhost:4000/user/createStudent";
    const getAllDepartments = "http://localhost:4000/university/allDepartments"
    const [departments,setDepartments]=useState([])
    const [full_name,setFullName]=useState("");
    const [email,setEmail]=useState("");
    const [phone,setPhone]=useState("");
    const [department,setDepartment] = useState("");
    const [level_of_study,setLevelOfStudy]=useState("");
    const [student_card_number,setCardNumber]=useState("");
    const [social_security_number,setSecurityNumber]=useState("");
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
            level_of_study,
            student_card_number,
            social_security_number,
            department,
            phone
        }
        try{
            const res = await axios.post(`${createStudentUrl}`, payload);
          
            if (res.data.status=== true){
                toast.success("Signup Successfully,please login now")
                setCardNumber("");
                setDepartment("");
                setEmail("");
                setFullName("");
                setLevelOfStudy("");
                setPhone("");
                window.location.replace("/login")

            }
        }
        catch (err) {
           toast.error(err.response.data.error)
           console.log(err.response.data.error)
        }
    };
   
    return(
      <>
        <Helmet>
        <title>ConnectU | Sign Up</title>
        <meta name='description' content='Sign Up'/>
       </Helmet>
        <div className={signupClass.page}>
            <div className={signupClass.page2}>
               <div className={signupClass.page3}>
               <div className={signupClass.page4A}>
               <img src={logo} alt="logo"/>
               <div className={signupClass.welcome}>
                        <h1>Welcome</h1>
                        <p>Elevate Your Internship Adventure.</p>
                    </div>
               </div>
                <div>
                    
                    <div className={signupClass.page4B}>
                        <form className={`row row-cols-lg-3 gy-2 ${signupClass.forms}`}>
                            <div className={`col ${signupClass.signup}`}>
                                <Input placeholder="Full Name" type="text" onChange={(e)=> setFullName(e.target.value)} value={full_name}/> 
                          </div>
                            <div className={`col ${signupClass.signup}`}>
                                <Input placeholder="Email" type="email" onChange={(e)=> setEmail(e.target.value)} value={email}/>
                          </div>
                            <div className={`col ${signupClass.signup}`}>
                                <Input placeholder="Phone Number" type="number" onChange={(e)=> setPhone(e.target.value)} value={phone}/>
                          </div>
                            <div className={`col ${signupClass.signup}`}>
                                <Input placeholder="Student Card Number" type="number" onChange={(e)=> setCardNumber(e.target.value)} value={student_card_number}/>
                          </div>
                            <div className={`col ${signupClass.signup}`}>
                                <Input placeholder="Social Security Number" type="number" onChange={(e)=> setSecurityNumber(e.target.value)}  value={social_security_number}/>
                          </div>
                            <div className={`col`}>
                            <select className={signupClass.select} onChange={(e)=> setDepartment(e.target.value)} value={department} >
      <option disabled  value="" > Select Your Department</option>
      {departments.map((d) => (
          <option key={d._id} value={d._id}>
            {d.full_name}
          </option>
       
        ))}      
        
      </select> 
       
   
                          </div>
                            <div className={`col`}>
                            <select className={signupClass.select} onChange={(e)=> setLevelOfStudy(e.target.value)} defaultValue="level of study">
      <option disabled value="level of study"> Level of Study</option>
      <option className={signupClass.category} value="L3"> L3</option>
      <option className={signupClass.category} value="M2"> M2</option>
      
      </select>
                          </div>
                            
                        </form>
                        <div>
                            <div className={signupClass.loginbtns}>
                            <div>
                            <Button content="Sign Up" color="signupDark" onClick={submitForm} />
                            </div>
                           <div>
                           <NavLink to="/login">
                           <Button content="Already Have an Account" color="signupLight"/>
                           </NavLink>
                           </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
               </div>
            </div>
        </div></>
    );
}
export default Signup;
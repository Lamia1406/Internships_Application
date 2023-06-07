import loginClass from "../Styles/main/login.module.css"
import logo from '../Images/logo.png'
import Input from "../partials/input";
import  Button from "../partials/button";
import {useState} from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from "react-helmet";
import {toast} from 'react-toastify'
import { NavLink } from "react-router-dom";
function Login({history}){
  const getUserTypeUrl = 'http://localhost:4000/user/login';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const submitForm = async(event) =>{
      event.preventDefault();
      const payload = {
          email,
          password
      }
      try{
          const res = await axios.post(`${getUserTypeUrl}`, payload);
          if (res.data.status == true){
              toast.success("Log in Successfully" , {})
              setEmail("");
              setPassword("");
              window.location.replace("/")
                localStorage.setItem("token",JSON.stringify(res.data.token));
              
             
          }
      }
      catch (err) {
        toast.error(err.response.data.error)
      }
  };
    return(
      <>
        <Helmet>
        <title>ConnectU | Login</title>
        <meta name='description' content='Login'/>
       </Helmet>
        <div className={loginClass.page}>
            <div className={loginClass.page2}>
               <div className={loginClass.page3}>
               <div className={loginClass.page4A}>
               <img src={logo} alt="logo"/>
               <div className={loginClass.welcome}>
                        <h1>Welcome back!</h1>
                        <p>Elevate Your Internship Adventure.</p>
                    </div>
               </div>
                <div>
                    
                    <form  className={loginClass.page4B}>
                        <div className={`row ${loginClass.forms}`}>
                            <div className={`col-lg-6 ${loginClass.login}`}>
                                <Input placeholder="University email" type="email"  onChange={(event) => setEmail(event.target.value)}/>
     
                          </div>
                            <div className={`col-lg-6 ${loginClass.login}`}>
                                <Input placeholder="Password"  type="password"
            onChange={(event) => setPassword(event.target.value)}/>
                               
                               
                          </div>
                        </div>
                        <div>
                            <div className={loginClass.loginbtns}>
                            <div>
                              <Button content="Login" color="loginDark" type="submit" value="Login" onClick={submitForm} />
                            </div>
                           <NavLink to="/signup">
                           <div>
                           <Button content="Create an account" color="loginLight"/>
                           </div>
                           </NavLink>
                            </div>
                        
                        </div>
                    </form>
                  
                </div>
               </div>
            </div>
        </div></>
    );
}
export default Login;
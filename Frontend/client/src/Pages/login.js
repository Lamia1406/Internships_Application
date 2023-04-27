import loginClass from "../Styles/login.module.css"
import logo from '../Images/logo.png'
import Input from "../partials/input";
import  Button from "../partials/button";
import {useState} from 'react'
import axios from 'axios';
import Google from "../Images/google2.png";
import ForgotPassword from "../partials/forgotPassword";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Helmet } from "react-helmet";
function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post('/login', {
            email,
            password,
          });
          setMessage(response.data.message);
        } catch (error) {
          setMessage('Error: ' + error.message);
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
                    
                    <form onSubmit={handleSubmit} className={loginClass.page4B}>
                        <div className={`row ${loginClass.forms}`}>
                            <div className={`col-lg-6 ${loginClass.login}`}>
                                <Input placeholder="University email" type="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
                                <div className={`form-check ${loginClass.remembermeCheck}`}>
  <input className="form-check-input" type="checkbox" id="rememberme" />
  <label className="form-check-label" htmlFor="rememberme">Remember me</label>
</div>  
                          </div>
                            <div className={`col-lg-6 ${loginClass.login}`}>
                                <Input placeholder="Password"  type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}/>
                                <div  className={`${loginClass.forgotpassword}`}>
<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Forgot password
</button>

<ForgotPassword/>

                                </div>
                               
                          </div>
                        </div>
                        <div>
                            <div className={loginClass.loginbtns}>
                            <div>
                            <Button content="Login" color="black" type="submit" value="Login" />
                            </div>
                           <div>
                           <Button content="Create an account" color="clear"/>
                           </div>
                            </div>
                            <fieldset className={`${loginClass.connection}`}>
                                  <legend  className="float-none w-auto">Or connect with:</legend>
                                  <img src={Google} alt="google logo"/>
                            </fieldset>
                        </div>
                    </form>
                    {message && <p>{message}</p>}
                </div>
               </div>
            </div>
        </div></>
    );
}
export default Login;
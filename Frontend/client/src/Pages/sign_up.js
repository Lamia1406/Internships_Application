import signupClass from "../Styles/signup.module.css"
import logo from '../Images/logo.png'
import Input from "../partials/input";
import  Button from "../partials/button";
import Google from "../Images/google2.png";
import ForgotPassword from "../partials/forgotPassword";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Helmet } from "react-helmet";
function Signup(){
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
                                <Input placeholder="Full Name"/> 
                          </div>
                            <div className={`col ${signupClass.signup}`}>
                                <Input placeholder="Email"/>
                          </div>
                            <div className={`col ${signupClass.signup}`}>
                                <Input placeholder="Phone Number"/>
                          </div>
                            <div className={`col ${signupClass.signup}`}>
                                <Input placeholder="Student Card Number"/>
                          </div>
                            <div className={`col ${signupClass.signup}`}>
                                <Input placeholder="Social Security Number"/>
                          </div>
                            <div className={`col ${signupClass.signup}`}>
                                <Input placeholder="Department"/>
                          </div>
                            <div className={`col ${signupClass.signup}`}>
                                <Input placeholder="Study Level"/>
                          </div>
                        </form>
                        <div>
                            <div className={signupClass.loginbtns}>
                            <div>
                            <Button content="Sign Up" color="signup" />
                            </div>
                           <div>
                           <Button content="Already Have an Account" color="accountExist"/>
                           </div>
                            </div>
                            <fieldset className={`${signupClass.connection}`}>
                                  <legend  className="float-none w-auto">Or connect with:</legend>
                                  <img src={Google} alt="google logo"/>
                            </fieldset>
                        </div>
                    </div>
                </div>
               </div>
            </div>
        </div></>
    );
}
export default Signup;
import loginClass from "../Styles/login.module.css"
import logo from '../Images/logo.png'
import Input from "../partials/input";
import  Button from "../partials/button";
import Google from "../Images/google2.png";
import ForgotPassword from "../partials/forgotPassword";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
function Login(){
    return(
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
                    
                    <div className={loginClass.page4B}>
                        <div className={`row ${loginClass.forms}`}>
                            <form className={`col-lg-6 ${loginClass.login}`}>
                                <Input placeholder="University email"/>
                                <div className={`form-check ${loginClass.remembermeCheck}`}>
  <input className="form-check-input" type="checkbox" id="rememberme" />
  <label className="form-check-label" htmlFor="rememberme">Remember me</label>
</div>  
                          </form>
                            <form className={`col-lg-6 ${loginClass.login}`}>
                                <Input placeholder="Password"/>
                                <div  className={`${loginClass.forgotpassword}`}>
<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Forgot password
</button>

<ForgotPassword/>

                                </div>
                               
                          </form>
                        </div>
                        <div>
                            <div className={loginClass.loginbtns}>
                            <div>
                            <Button content="Login" color="black" />
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
                    </div>
                </div>
               </div>
            </div>
        </div>
    );
}
export default Login;
import {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'
import logo from '../Images/logo.png';
import User from '../Images/userBig.png'
import facebook from '../Images/facebook.png'; 
import twitter from '../Images/twitter.png';
import ntic from '../Images/ntic.png'; 
import { NavLink ,Link} from 'react-router-dom';
import NavbarClass from '../Styles/partials/navbar.module.css';
import { useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
function NavBar()
{    
  const user = jwtDecode(localStorage.getItem("token"))
  const logout = ()=>{
      axios.get("http://localhost:4000/user/logout").then(
        result => {
          toast.success("Sign Out Suuccessful")
          localStorage.removeItem("token");
          window.location.replace("/login")

        }
      ).catch(
        error =>{
          console.log(error)
        }
      )
  }

  const isCurrentPage = ({ isActive }) => {
    return isActive ? `${NavbarClass.active} ${NavbarClass.links}` : `${NavbarClass.links}`;
  };   
  return ( 
    
    <nav className= {`navbar sticky-top  navbar-expand-lg ${NavbarClass.navbar}`}>
  <div className="container-fluid">
  <Link to="/" className={` ${NavbarClass.brand}`}>
          <img src={logo} alt='ConnectU logo'/>
        </Link>
        <div className={NavbarClass.avatar}>
          {user.image ? <img src={user.image} alt='User pic' /> : <img src={User} alt='User pic' />}
          </div>
           <button className={`navbar-toggler ${NavbarClass.menuList}` }type='button'
            data-bs-toggle='collapse'
            data-bs-target='#nav1'
            aria-controls='nav1'
            aria-expanded="false"
            aria-label='Toggle navigation'>
                   <span className={`navbar-toggler-icon navbar-dark ${NavbarClass.menuListIcon}`}></span>
                   
        </button>   
        <div className="collapse navbar-collapse" id="nav1">
        <ul className={`me-auto mb-2 mb-lg-0 ${NavbarClass.navItems}`}>
        <div className={`navbar-nav `}>
        <li className={NavbarClass.navItem}>
             <NavLink to="/" className={isCurrentPage} aria-current="page">
               Home
             </NavLink>
           </li>
          {(user.userType == "webmaster" || user.userType == "student") &&(
             <li className={NavbarClass.navItem}>
             <NavLink to="/internships" className={isCurrentPage}>
             Internships
             </NavLink>
           </li>
          )}
        {user.userType == "webmaster" && (
          <>
             <li className={NavbarClass.navItem}>
          <NavLink to="/database" className={isCurrentPage}>
          Database
          </NavLink>
        </li>
             <li className={NavbarClass.navItem}>
          <NavLink to="/students" className={isCurrentPage}>
          Students
          </NavLink>
        </li>
             <li className={NavbarClass.navItem}>
          
          <NavLink to="/departments" className={isCurrentPage}>
          Department Responsibles
          </NavLink>
        </li>
             <li className={NavbarClass.navItem}>
          
          <NavLink to="/supervisors" className={isCurrentPage}>
          Internship Supervisors
          </NavLink>
        </li>
        </>
        )}
        {
          user.userType== "department responsible" && (
            <li className={NavbarClass.navItem}>
          <NavLink to="/requests" className={isCurrentPage}>
          Internships
          </NavLink>
        </li>
          )
        }
        {
          user.userType== "supervisor" && (
            <li className={NavbarClass.navItem}>
          <NavLink to="/requestsForSupervisor" className={isCurrentPage}>
          Internships
          </NavLink>
        </li>
          )
        }
        {(user.userType == "department responsible" || user.userType =="supervisor") && (
          <>
            
            <li className={NavbarClass.navItem}>
          
          <NavLink to="/studentProgress" className={isCurrentPage}>
          Student Progress
          </NavLink>
        </li>
          </>
        )}
        
       {
        user.userType != "webmaster" && (
          <li className={NavbarClass.navItem}>
          <NavLink to = "/notifications" className={isCurrentPage}>
              Notifications
          </NavLink>
          </li>
        )
       }
            {user.userType=="student" && (
           <li className={NavbarClass.navItem}>
             <NavLink to ="/yourapp" className={isCurrentPage}>
               Your application
             </NavLink>
           </li>
           
            )}
            <li className={`${NavbarClass.navItem} ${NavbarClass.settings}`} >
                     <NavLink  to= "/userProfil"className={isCurrentPage}>
                       Profile
                     </NavLink>
             </li>
                     <li className={`${NavbarClass.navItem} ${NavbarClass.settings}`}>
                     <Link to="" onClick={logout} className={NavbarClass.links}>
                       Sign out
                     </Link>
                    </li>
                    <li className={`${NavbarClass.slogan}  col-lg-5`}>
             <img src={logo} alt='logo'/>
             <p> Effortlessly apply for your dream internship</p>
             <div className={NavbarClass.socials}>
             <img src={facebook} alt='facebook logo'/>
             <img src={twitter} alt='twitter logo'/>
             <img src={ntic} alt='ntic logo'/>
               </div>
               </li>  
 
            {user.userType != "webmaster" && (
                            <li className={NavbarClass.navItem}>
                            <NavLink to="product" className={isCurrentPage} >
                               Product
                             </NavLink>
                           </li> 
            )}
          

 </div>
 </ul>
 <div className={`${NavbarClass.userSettings} dropdown`}>
               <div className={`${NavbarClass.dropdownPic} dropdown-toggle`}  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {user.image ?  <img src={user.image}alt='user pic' /> :  <img src={User}alt='user pic' />}
               </div>
               <ul className={`${NavbarClass.settingsMenu} dropdown-menu dropdown-menu-end`}>
                 <li><NavLink to="/userProfil" className={`${NavbarClass.links} ${NavbarClass.dropdownItem}`}>Profile</NavLink></li>
                 <li><hr className={`dropdown-divider ${NavbarClass.dropdownItem}`}/></li>
                 <li><Link onClick={logout} className={`${NavbarClass.links} ${NavbarClass.dropdownItem}`} >Sign Out</Link></li>
               </ul>
             </div>
  </div>
  </div>

</nav>
   
  );
}
export default NavBar; 






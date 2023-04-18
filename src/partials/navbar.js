import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'
import logo from '../Images/logo.png';
import User from '../Images/User.jpg'
import facebook from '../Images/facebook.png'; 
import twitter from '../Images/twitter.png';
import ntic from '../Images/ntic.png'; 
import { NavLink ,Link} from 'react-router-dom';




import NavbarClass from '../Styles/partials/navbar.module.css';
import { useState } from 'react';

function NavBar()
{    
  const [user,changeUser] = useState("webmaster")
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
          <img src={User} alt='User pic' />
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
           <li className={NavbarClass.navItem}>
          <NavLink to="/internships" className={isCurrentPage}>
          Internships
          </NavLink>
        </li>
        {user == "webmaster" && (
          <React.Fragment>
             <li className={NavbarClass.navItem}>
          <NavLink to="/students" className={isCurrentPage}>
          Students
          </NavLink>
        </li>
             <li className={NavbarClass.navItem}>
          
          <NavLink to="/internships" className={isCurrentPage}>
          Departments
          </NavLink>
        </li>
             <li className={NavbarClass.navItem}>
          
          <NavLink to="/internships" className={isCurrentPage}>
          Internship Supervisors
          </NavLink>
        </li>
        </React.Fragment>
        )}
        {(user == "depResponsible" || user =="supervisor") && (
          <React.Fragment>
            <li className={NavbarClass.navItem}>
          
          <NavLink to="/internships" className={isCurrentPage}>
          Student Progress
          </NavLink>
        </li>
          </React.Fragment>
        )}
        <li className={NavbarClass.navItem}>
            <NavLink to = "/" className={isCurrentPage}>
                Notifications
            </NavLink>
            </li>
            <li className={`${NavbarClass.navItem} ${NavbarClass.settings}`} >
                     <NavLink className={isCurrentPage}>
                       Profile
                     </NavLink>
             </li>
                     <li className={`${NavbarClass.navItem} ${NavbarClass.settings}`}>
                     <Link  className={NavbarClass.links}>
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
 {user=="student" && (
           <li className={NavbarClass.navItem}>
             <NavLink to ="/yourapp" className={isCurrentPage}>
               Your application
             </NavLink>
           </li>
           
            )}
            {user != "webmaster" && (
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
                   <img src={User}alt='user pic' />
               </div>
               <ul className={`${NavbarClass.settingsMenu} dropdown-menu dropdown-menu-end`}>
                 <li><NavLink className={`${NavbarClass.links} ${NavbarClass.dropdownItem}`}>Profile</NavLink></li>
                 <li><hr className={`dropdown-divider ${NavbarClass.dropdownItem}`}/></li>
                 <li><Link className={`${NavbarClass.links} ${NavbarClass.dropdownItem}`} >Sign Out</Link></li>
               </ul>
             </div>
  </div>
  </div>

</nav>
   
  );
}
export default NavBar; 



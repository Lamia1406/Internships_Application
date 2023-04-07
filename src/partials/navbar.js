import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'
import logo from '../Images/logo.png';
import user from '../Images/user.png';
import facebook from '../Images/facebook.png'; 
import twitter from '../Images/twitter.png';
import ntic from '../Images/ntic.png'; 




import '../Styles/navbar.css';
function NavBar()
{       
  return ( 
    <nav className='navbar navbar-expand-lg p-0' >
      <div className='container-fluid p-0 '>
       <div className='navbar-header'>
       <a className='navbar-brand brand'>
          <img src={logo} alt='ConnectU logo' className='d-inline-block align-top '/>
        </a>
          <div className='avatar'>
          <img src={user} alt='User pic' className='d-inline-block align-top '/>
          </div>
       <button className='navbar-toggler' type='button'
            data-bs-toggle='collapse'
            data-bs-target='#nav1'
            aria-controls='nav1'
            aria-expanded="false"
            aria-label='Toggle navigation'>
                   <span className="navbar-toggler-icon navbar-dark"></span>
        </button>     
       </div>
        <div className="collapse navbar-collapse" id="nav1">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className='nav-item'>
             <a to="/home" className="nav-link links" aria-current="page">
               Home
             </a>
           </li>
           <li className='nav-item'>
          
             <a to="/internship" className='nav-link links'>
             Internships
             </a>
           </li>
           <li className='nav-item'>
             <a  className='nav-link links'>
               Your application
             </a>
           </li>
           <li className='nav-item'>
             <a  className='nav-link links'>
               Notifications
             </a>
           </li>
           <li className='nav-item'>
             <a  className='nav-link links' >
               Product
             </a>
           </li> 
           <li className='nav-item settings' >
                    <a className='nav-link links'>
                      Profile
                    </a>
            </li>
                    <li className='nav-item settings'>
                    <a   className='nav-link links'>
                      Sign out
                    </a>
                    </li>
            
            <li className='slogan col-lg-5'>
            <img src={logo}/>
            <p> Effortlessly apply for your dream internship</p>
            <div className='socials'>
            <img src={facebook}/>
            <img src={twitter}/>
            <img src={ntic}/>
              </div>
              </li> 
       </ul>
       <div className="nav-item dropdown">
              <a className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={user} />
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item links">Profile</a></li>
                <li><hr className="dropdown-divider"/></li>
                <li><a className="dropdown-item links" >Sign Out</a></li>
              </ul>
            </div>
              
        
         </div>
  
      </div>
      
    
  
     
    </nav>
   
  );
}
export default NavBar; 



import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NavBar from '../partials/navbar';
import Footer from '../partials/footer';
import ApplyImage from '../Images/apply.png';
import Collab from '../Images/collaboration.png';

import '../Styles/product.css';
import Button from '../partials/button';

function Product()
{
   
  return ( 
    <div>
        <NavBar/>
      <div className='container-fluid p-0'>
        <div className='row hero-section'>
          <div className='col-lg-7 hero'>
             <div className='intro-div'>
             <h1 className='h1'> Manage your internship with ConnectU </h1>
              <p className='bodyl'> We know how daunting it can be to navigate the internship search process, which is why we created our platform to simplify things for you</p>
             </div>
            <Button className="clear" content="Apply Now!" icon={ApplyImage}/>
          </div>
          <div className='col-lg-5 collab'>
              <img src={Collab} />
          </div>
        </div>
    
    

      </div>
      <Footer/>

    </div>
  );
}
export default Product;
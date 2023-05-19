import {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import internshipsClass from '../Styles/internships.module.css';
import Button from '../partials/button';

import CreateCompany from '../partials/createCompany';
import {useState} from 'react'

import Sort from '../Images/sort.png';
import Search from "../Images/search.png"
import { Pagination } from 'antd';
import Internship from '../partials/internship_post';
import Input from '../partials/input.js';
import { Helmet } from 'react-helmet';
import CreateNewPost from '../partials/createNewPost';
import axios from 'axios'
import jwtDecode from 'jwt-decode';
import {  NavLink, useNavigate } from 'react-router-dom';
function Internships()
{      
const user = jwtDecode(localStorage.getItem("token"))
const navigate=useNavigate 
 
const [pageNumber, setPageNumber] = useState(1);
const getAllPosts = `http://localhost:4000/post/allPosts?pageNumber=${pageNumber}`;
  const [posts, setPosts] = useState([]);
    const [count, setCount] = useState("");
    const fetchPosts = async () => {
      const res = await axios.get(`${getAllPosts}`);
      if(res.data.status == true){
        setPosts(res.data.posts)
        setCount(res.data.count)
        
      }
      // const [applications, setApplications] = useState([])
      // const internshipsOfResponsibleURL = `http://localhost:4000/v1/internship/allInternships/${user._id}`
      // const fetchApplications = async () => {
      //   const res = await axios.get(`${internshipsOfResponsibleURL}`);
      //   if(res.data){
      //     setApplications(res.data)
      //   }
      // }
      

    }
    useEffect(()=>{
      //fetchApplications();
      fetchPosts()
    },[pageNumber]);
       
  return ( 
     <>
        <Helmet>
    <title>ConnectU | Internships</title>
    <meta name='description' content='Internships'/>
   </Helmet>
    <div className={internshipsClass.page}>
<div className={`${internshipsClass.section} row`}>
  <div className={`col-lg-6 ${internshipsClass.left}`}>
  <h3 className={internshipsClass.h3}> Internships</h3>
  {(user.userType == "webmaster" || user.userType == "student") &&(
         <div className={internshipsClass.sorting}>
         <span className={internshipsClass.allPosts}>All Post</span>
         <div className={`dropdown ${internshipsClass.sortBy}`}>
       <button className={`dropdown-toggle ${internshipsClass.sortBtn}`} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        Sort by Year <img className={internshipsClass.icon} src={Sort} alt='sort icon'/>
       </button>
       <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
         <li className={internshipsClass.year}><button classname={`dropdown-item ${internshipsClass.year}`} >Any</button></li>
         <li className='dropdown-divider'></li>
         <li className={internshipsClass.year}><button classname={`dropdown-item `} >2023</button></li>
         <li className={internshipsClass.year}><button classname={`dropdown-item `} >2022</button></li>
         <li className={internshipsClass.year}><button classname={`dropdown-item `} >2020</button></li>
       </ul>
     </div>
     
     
        </div>
  )}
  </div>
  {(user.userType == "webmaster" || user.userType == "student") && (
         <div className={`col-lg-6 ${internshipsClass.right}`}>
         <form className={`${internshipsClass.inputDiv} d-flex`}>
         <Input placeholder="search by keyword..."/>
         <button className={internshipsClass.searchIcon} type="submit"><img src={Search} alt='search icon' /></button>
         </form>
       
         </div>       
  )
  }

 
     </div>
     {user.userType == "webmaster" && (
        <div className={internshipsClass.newPost}>
        <Button content="Create New Post" color="dark" dataBsToggle="modal" dataBsTarget="#post"/>
      </div>
   )}
{ (user.userType == "student" || user.userType == "webmaster") && (
        <div className={internshipsClass.section} >
          {posts.map((p) => (
              <Internship company={p.company.company_name} image={p.image} title={p.title} id={p._id}
 description={p.description} published={`Last Updated at : ${new Date(p.updatedAt).toLocaleDateString("en-GB").split('/').reverse().join('/')}`}
 user={user.userType} 
 />
        ))}

       
<Pagination current={pageNumber} total={count} pageSize={5} onChange={(prev) =>{setPageNumber(prev)}} />
     </div>
)} 
{/* {user.userType == 'department responsible' && (                     
             <div>
                   <div className={App.formTitle}> 
              <p>Student Information</p>
              </div>
              <div className={App.formContent}>
                <div className={`row row-cols-lg-2 ${App.details} gx-5`}>
                <div className={`col ${App.field}`}>
                          <p className={App.label}>
                              Full Name :
                          </p>
                          <p className={App.content}>
                          {app.student.full_name}
                          </p>
                    </div>
                    <div className={`col ${App.field}`}>
                          <p className={App.label}>
                              Student Card :
                          </p>
                          <p className={App.content}>
                               {app.student.student_card_number}
                          </p>
                    </div>
                    <div className={`col ${App.field}`}>
                          <p className={App.label}>
                              Social Security Number:
                          </p>
                          <p className={App.content}>
                          {app.student.social_security_number}

                          </p>
                    </div>
                    <div className={`col ${App.field}`}>
                          <p className={App.label}>
                              Preparing Diploma of:
                          </p>
                          <p className={App.content}>
                          {app.student.level_of_study}
                          </p>
                    </div>
                  
                </div>
             </div>
                  </div>
                  
                  
            )} */}
          {/* {
            application.map(
                  app =>{
                        return <div className={App.form}>
                        <div className={App.formTitle}>
                           <p>Internship Details</p>
                           </div>
                           <div className={App.formContent}>
                              <div className={`row  row-cols-lg-2 row-cols-1 ${App.details} gx-5`}>
                                  <div className={`col ${App.field}`}>
                                        <p className={App.label}>
                                           Theme :
                                        </p>
                                        <p className={App.content}>
                                        {app.post.title}
              
                                        </p>
                                  </div>
                                  <div className={`col ${App.field}`}>
                                        <p className={App.label}>
                                            Company :
                                        </p>
                                        <p className={App.content}>
                                        {app.post.company.company_name}
              
                                        </p>
                                  </div>
                                  <div className={`col ${App.field}`}>
                                        <p className={App.label}>
                                           Starting Date :
                                        </p>
                                        <p className={App.content}>
                                              {changDateFormat(app.startingDate)}
                                             
                                        </p>
                                  </div>
                                  <div className={`col ${App.field}`}>
                                        <p className={App.label}>
                                            Ending Date :
                                        </p>
                                        <p className={App.content}>
                                        {changDateFormat(app.endingDate)}
                                        </p>
                                  </div>
                                  <div className={`col ${App.field}`}>
                                        <p className={App.label}>
                                           Duration :
                                        </p>
                                        <p className={App.content}>
                                             {(new Date(app.endingDate) - new Date(app.startingDate)) / (1000 * 60 * 60 * 24) } Days
                                        </p>
                                  </div>
                              </div>
                              
                           </div>
                        </div>
                  }
            )
          }
         {
            application.map(
                  app =>{
                        return  <div className={App.form}>
                        <div className={App.formTitle}> 
                        <p>Supervised by</p>
                        </div>
                        <div className={App.formContent}>
            
                              <div className={`row row-cols-lg-2 ${App.details} gx-5`}>
                                  <div className={`col ${App.field}`}>
                                        <p className={App.label}>
                                          Email :
                                        </p>
                                        <p className={App.content}>
                                        {app.student.department.email}
                                        </p>
                                  </div>
                                  <div className={`col ${App.field}`}>
                                        <p className={App.label}>
                                            Phone Number :
                                        </p>
                                        <p className={App.content}>
                                       (+213) 0{app.student.department.phone}
                                        </p>
                                  </div>
                              </div>
                              
                              <hr className={App.divider}/>
                              <div className={`row row-cols-lg-2 gx-5 ${App.details}`}>
                              <div className={`col ${App.field}`}>
                                        <p className={App.label}>
                                          Internship Supervisor :
                                        </p>
                                        <p className={App.content}>
                                              {app.supervisor.full_name}
                                        </p>
                                  </div>
                                  <div className={`col ${App.field}`}>
                                        <p className={App.label}>
                                            Email :
                                        </p>
                                        <p className={App.content}>
                                        {app.supervisor.email}
              
                                        </p>
                                  </div>
                              </div>
                              <div className={App.modificationBtns}>
                              <div>
                                    <Button content="Delete" color="clear"/>
                                  </div>
                                  <div>
                                  <Button content="Modify" color="black"/>
                                  </div>
                              </div>
                           </div>
                        
                        </div>
                  }
                 )
         } */}
  {/* </div>
   
      </>  
            :
            <>
                  <div className={`${App.section}`}>
                    <p className={App.mainTitle}> Your Application</p>
                  </div>
                  <div className={`${App.section}`}>
                        <h3 className={App.h3}>You're not enrolled to any application</h3>
                        <div className={App.btn1}>
                        <Button content="Apply" color="black"/>

                              </div>
                  </div>
            </>
        } */}
    
        {user.userType == "student" && (
          <div className={`${internshipsClass.section} row ${internshipsClass.newCompany}`}>
          <div className='col-lg-6'>
        <p> Did you contact an unlisted establishment? If yes, please apply here </p>
         </div>
       <NavLink to='/applyForInternship' className={`col_lg-2 ${internshipsClass.apply}`}>
       <div  >
          <Button color="dark" content="Apply" />
  </div>
       </NavLink>
          </div>
    )}
  
    
   

    </div>
    <CreateNewPost modalId="post" />
    </>
  );

  
   
   




   
}
export default Internships;
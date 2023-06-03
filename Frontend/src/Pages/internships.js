import {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import internshipsClass from '../Styles/internships.module.css';
import Button from '../partials/button';
import {useState} from 'react'
import Sort from '../Images/sort.png';
import Search from "../Images/search.png"
import { Pagination } from 'antd';
import Internship from '../partials/DatabasePartials/onePost';
import Input from '../partials/input.js';
import { Helmet } from 'react-helmet';
import axios from 'axios'
import jwtDecode from 'jwt-decode';
import {  NavLink, useNavigate } from 'react-router-dom';
import CreateOneDataRecord from '../partials/Database/createOneDataRecord';
function Internships()
{      
const user = jwtDecode(localStorage.getItem("token"))
const navigate=useNavigate 
 
const [pageNumber, setPageNumber] = useState(1);
const getAllPosts = `http://localhost:4000/post/allPosts?pageNumber=${pageNumber}`;
  const [posts, setPosts] = useState([]);
    const [count, setCount] = useState(0);
    const fetchPosts = async () => {
      const res = await axios.get(`${getAllPosts}`);
      if(res.data.status == true){
        setPosts(res.data.posts)
        setCount(res.data.count)
      }
      
      

    }
    useEffect(()=>{
      fetchPosts()
    },[pageNumber]);
       
  return ( 
     <>
        <Helmet>
    <title>ConnectU | Internships</title>
    <meta name='description' content='Internships'/>
   </Helmet>
    <div className={internshipsClass.page}>
<div className={`${internshipsClass.section} `}>
  <h3 className={internshipsClass.h3}> Internships</h3>
  

 
     </div>
     {user.userType == "webmaster" && (
        <div className={internshipsClass.newPost}>
        <Button content="Create New Offer" color="dark" dataBsToggle="modal" dataBsTarget="#post"/>
      </div>
   )}
{ (user.userType == "student" || user.userType == "webmaster") && (
        <div className={internshipsClass.section} >
          {posts.map((p) => (
      
            p.isOffer == true && (
                  <Internship 
                  {...(p.company ? { company: p.company.full_name } : {})}
                  image={p.image} title={p.title} id={p._id}
                  description={p.description} published={`Last Updated at : ${new Date(p.updatedAt).toLocaleDateString("en-GB").split('/').reverse().join('/')}`}
                  user={user.userType}
                  />
                 
            )
      
        ))}

     <div className={internshipsClass.pagination}>
     <Pagination current={pageNumber} pageSize={3} total={count}  onChange={(page) =>{setPageNumber(page)}} />

      </div>  
     </div>
)} 

    
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
    <CreateOneDataRecord table="Posts" id="post" />
    </>
  );

  
   
   




   
}
export default Internships;
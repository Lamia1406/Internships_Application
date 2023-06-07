import {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import internshipsClass from '../Styles/main/internships.module.css';
import Button from '../partials/button';
import {useState} from 'react'
import { Pagination } from 'antd';
import Internship from '../partials/DatabasePartials/onePost';
import axios from 'axios'
import jwtDecode from 'jwt-decode';
import {  NavLink } from 'react-router-dom';
import CreateOneDataRecord from '../partials/Database/createOneDataRecord';
import Layout from '../features/Layout';
import NotAvailable from '../partials/not_available';
function Internships()
{      
const user = jwtDecode(localStorage.getItem("token"))
 
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
     <Layout pageTitle = "Internships" header = {
     ` Internships`
   }
   content = {
    <>  {user.userType == "webmaster" && (
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

   {
    posts.length != 0 ? (
      <div className={internshipsClass.pagination}>
   <Pagination current={pageNumber} pageSize={3} total={count}  onChange={(page) =>{setPageNumber(page)}} />

    </div>  
    ): (
      <NotAvailable message = "No offers available in the moment"/>
    )
   }
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
  )}</>
   }/>
    <CreateOneDataRecord table="Posts" id="post" />
    </>
  );
}
export default Internships;
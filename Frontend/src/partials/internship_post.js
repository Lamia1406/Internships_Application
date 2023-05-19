import Button from '../partials/button';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import React,{useState} from'react'
import Post from '../Images/emptyPost.jpg'
import internshipPostClass from '../Styles/partials/internship_post.module.css'
import axios from 'axios';
import { toast } from 'react-toastify';
function Internship(props){
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate('/applyForExistingInternship', { state: { post: props.id ,company:props.company} });
  }
  const deletePostUrl= `http://localhost:4000/v1/post/deletePost/${props.id}`
  const deletePost = async(event) =>{
    console.log(deletePostUrl)
    event.preventDefault();
          axios.delete(deletePostUrl).then(
          res => {
            console.log(res)
            toast.success("Post Deleted Successfully" )
            window.location.reload();
          }
         ).catch(err=>{
          toast.error(err)
          console.log(err)
         })

    
};
    return(
        <div className={`row ${internshipPostClass.posts} p-0`} >
        <div  className={`col-lg-6 ${internshipPostClass.postImgDiv}`}>
        {props.image ? <img src={props.image} className={internshipPostClass.postImg}/> : <img src={Post} className={internshipPostClass.postImg}/>}
        </div>
       <div  className={`col-lg-6`}>
          <p className={internshipPostClass.companyName}>{props.company}</p>
          <h3 className={internshipPostClass.title}>{props.title}</h3>
          <p className={internshipPostClass.description}>{props.description}</p>
          <p className={internshipPostClass.published}>
         {props.published}
          </p>
              {props.user == "student" &&
              (
                
                 <div className={internshipPostClass.apply}>
                    
                      <Button color="dark" content="Apply" onClick={handleSubmit} />
    

              </div>
              )}
              {props.user == 'webmaster' && (
                <div className={internshipPostClass.manageWebmaster}>
                     <div className={internshipPostClass.apply}>
                 <Button color="dark" content="Modify" />
                 </div>
                 <div className={internshipPostClass.apply}>
                 <Button color="dark" content="Delete" onClick={deletePost} />
                 </div>
                </div>
              )}
       </div>
</div>
    );
}
export default Internship;
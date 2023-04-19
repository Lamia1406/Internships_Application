import Button from '../partials/button';
import { useNavigate } from 'react-router-dom';
import internshipPostClass from '../Styles/partials/internship_post.module.css'
function Internship(props){
    const applyForInternship = useNavigate();
    return(
        <div className={`row ${internshipPostClass.posts} p-0`} >
        <div  className={`col-lg-6 ${internshipPostClass.postImgDiv}`}>
        <img src={props.image} className={internshipPostClass.postImg}/>
        </div>
       <div  className={`col-lg-6`}>
          <p className={internshipPostClass.companyName}>{props.company}</p>
          <h3 className={internshipPostClass.title}>{props.title}</h3>
          <p className={internshipPostClass.description}>{props.description}</p>
          <p className={internshipPostClass.published}>
         {props.published}
          </p>
              <div className={internshipPostClass.apply}>
              <Button color="dark" content="Apply" onClick = {() =>applyForInternship("/applyForInternship")}/>
              </div>
       </div>
</div>
    );
}
export default Internship;
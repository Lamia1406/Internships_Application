import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Button from '../partials/button';
import OneResponsible from '../partials/DatabasePartials/oneResponsible';
import { Helmet } from 'react-helmet';
import axios from "axios";
import { useState,useEffect } from 'react';
import departmentsClass from '../Styles/departments.module.css';
import CreateDepartmentResponsibleAccount from '../partials/CreateDatabase/createDepartmentResponsibleAccount';
import OneStudent from '../partials/DatabasePartials/oneStudent';
import CreateStudentAccount from '../partials/CreateDatabase/createStudentAccount';
function Students(){  
  const getAllStudents = 'http://localhost:4000/user/allStudents';
  const [students, setStudents] = useState([]);
  const fetchStudents = async () => {
    const res = await axios.get(`${getAllStudents}`);
   if(res.data){
    setStudents(res.data.students);
   }
  }
  useEffect(()=>{
    fetchStudents();
  },[]);
        return(
      <>
          <Helmet>
    <title>ConnectU | Students</title>
    <meta name='description' content='Department Responsibles'/>
   </Helmet>
            <div className={`${departmentsClass.page} container-fluid`}>
            <div className={departmentsClass.section}>
            <h2 className={departmentsClass.h2}>Students</h2>
          </div>
             <div className= {departmentsClass.section}>
          
          <div className={`${departmentsClass.results}`}>
            <div>
              Results({students.length})
            </div>
   
        </div>
         
    <div className={departmentsClass.database}>
    <table className={`table  table-borderless `} >
  <thead>
    <tr>
      <th scope="col">Full Name</th>
      <th>Department</th>
      <th>Faculty</th>
      <th scope="col">University</th>
      <th scope="col">Profil</th>
    </tr>
  </thead>
  <tbody>
  {students.map((r) => (
            <OneStudent 
            name={r.full_name} 
            dep={r.department.full_name} 
            faculty ={r.department.faculty.name}
            univ ={r.department.faculty.university.full_name}
            email={r.email}
            phone={r.phone}
            image =  {r.image}
            enrolled= {r.enrolled}
            security= {r.social_security_number}
            card= {r.student_card_number}
   id={r._id}/>
        ))}
  </tbody>
  
</table>
    </div>
       
</div>
<div className={departmentsClass.newResponsible}>
        <Button content="Create Student Account" color="dark" dataBsToggle="modal" dataBsTarget="#student"/>
      </div>
      <CreateStudentAccount modalId="student"/>

</div></>
        )
}
export default Students
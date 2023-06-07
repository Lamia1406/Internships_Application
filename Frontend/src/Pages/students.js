import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '../partials/button';
import axios from "axios";
import { useState,useEffect } from 'react';
import departmentsClass from '../Styles/main/usersDatabase.module.css';
import OneDataSet from '../partials/Database/oneDataSet';
import CreateOneDataRecord from '../partials/Database/createOneDataRecord';
import Layout from '../features/Layout';
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
      
      <Layout pageTitle = "Students" header = "Students" content ={
          <>
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
      <th scope="col">University</th>
      <th>Faculty</th>
      <th>Department</th>
      <th scope="col">Profil</th>
    </tr>
  </thead>
  <tbody>
  {students.map((r) => (
            <OneDataSet 
            full_name={r.full_name} 
            dep={r.department.full_name} 
            faculty ={r.department.faculty.full_name}
            university ={r.department.faculty.university.full_name}
            email={r.email}
            phone={r.phone}
            image =  {r.image}
            enrolled= {r.enrolled}
            security= {r.social_security_number}
            user="student"
            card= {r.student_card_number}
            profil = {`student${r._id}`}
            length={Object.keys(r).length}
   id={r._id}
   table = "Students"
   />
        ))}
  </tbody>
  
</table>
    </div>
       
</div>
<div className={departmentsClass.newResponsible}>
        <Button content="Create Student Account" color="dark" dataBsToggle="modal" dataBsTarget="#student"/>
      </div>
      <CreateOneDataRecord table="Students" id="student"/>
          </>
      }/>
        )
}
export default Students
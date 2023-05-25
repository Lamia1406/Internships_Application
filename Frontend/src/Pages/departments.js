import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Button from '../partials/button';
import OneResponsible from '../partials/DatabasePartials/oneResponsible';
import { Helmet } from 'react-helmet';
import axios from "axios";
import { useState,useEffect } from 'react';
import departmentsClass from '../Styles/departments.module.css';
import CreateDepartmentResponsibleAccount from '../partials/CreateDatabase/createDepartmentResponsibleAccount';
function DepartmentResponsibles(){  
  const getAllResponsiblesURL = 'http://localhost:4000/user/allResponsibles';
  const [responsibles, setResponsibles] = useState([]);
  const fetchResponsibles = async () => {
    const res = await axios.get(`${getAllResponsiblesURL}`);
   if(res.data){
    setResponsibles(res.data.responsibles);
   }
  }
  useEffect(()=>{
    fetchResponsibles();
  },[]);
        return(
      <>
          <Helmet>
    <title>ConnectU | Department Responsibles</title>
    <meta name='description' content='Department Responsibles'/>
   </Helmet>
            <div className={`${departmentsClass.page} container-fluid`}>
            <div className={departmentsClass.section}>
            <h2 className={departmentsClass.h2}>Department Responsibles</h2>
          </div>
             <div className= {departmentsClass.section}>
          
          <div className={`${departmentsClass.results}`}>
            <div>
              Results({responsibles.length})
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
  {responsibles.map((r) => (
            <OneResponsible 
            name={r.full_name} 
            dep={r.department.full_name} 
            faculty ={r.department.faculty.name}
            univ ={r.department.faculty.university.full_name}
            email={r.email}
            phone={r.phone}
            fax= {r.fax}
            image =  {r.image}
            accepted = {r.accepted}
            rejected = {r.rejected}
            pending = {r.pending}
   id={r._id}/>
        ))}
  </tbody>
  
</table>
    </div>
       
</div>
<div className={departmentsClass.newResponsible}>
        <Button content="Create Department Responsible Account" color="dark" dataBsToggle="modal" dataBsTarget="#depResponsible"/>
      </div>
      <CreateDepartmentResponsibleAccount modalId="depResponsible"/>

</div></>
        )
}
export default DepartmentResponsibles
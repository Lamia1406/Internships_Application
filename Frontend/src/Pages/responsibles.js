import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '../partials/button';
import { Helmet } from 'react-helmet';
import axios from "axios";
import { useState,useEffect } from 'react';
import departmentsClass from '../Styles/usersDatabase.module.css';
import OneDataSet from '../partials/Database/oneDataSet';
import CreateOneDataRecord from '../partials/Database/createOneDataRecord';
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
      <th scope="col">University</th>
      <th>Faculty</th>
      <th>Department</th>
      <th scope="col">Profil</th>
    </tr>
  </thead>
  <tbody>
  {responsibles.map((r) => (
   
            <OneDataSet 
            full_name={r.full_name} 
            {...(r.department ? { dep: r.department.full_name } : {})}
            {...(r.department && r.department.faculty ? { faculty: r.department.faculty.full_name } : {})}
            {...(r.department && r.department.faculty && r.department.faculty.university ? { university: r.department.faculty.university.full_name } : {})}
            profil = {`responsible${r._id}`}
             email={r.email}
             phone={r.phone}
             fax= {r.fax}
             image =  {r.image}
             accepted = {r.accepted}
             rejected = {r.rejected}
             pending = {r.pending}
             length={Object.keys(r).length}
             user ="responsible"
   />
        ))}
  </tbody>
  
</table>
    </div>
       
</div>
<div className={departmentsClass.newResponsible}>
        <Button content="Create Department Responsible Account" color="dark" dataBsToggle="modal" dataBsTarget="#depResponsible"/>
      </div>
      <CreateOneDataRecord table="Responsibles" id="depResponsible"  
              />

</div></>
        )
}
export default DepartmentResponsibles
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '../partials/button';
import axios from "axios";
import { useState,useEffect } from 'react';
import departmentsClass from '../Styles/main/usersDatabase.module.css';
import OneDataSet from '../partials/Database/oneDataSet';
import CreateOneDataRecord from '../partials/Database/createOneDataRecord';
import Layout from '../features/Layout';
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
      
      <Layout pageTitle = "Department Responsibles" header ="Department Responsibles" content = {
        <>
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
             id= {r._id}
             table = "Responsibles"
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
        </>
      }/>
         
        
     


        )
}
export default DepartmentResponsibles
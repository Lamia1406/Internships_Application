import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Button from '../partials/button';
import OneDepartment from '../partials/oneDepartment';
import { Helmet } from 'react-helmet';
import axios from "axios";
import { useState,useEffect } from 'react';
import departmentsClass from '../Styles/departments.module.css';
import CreateDepartmentResponsibleAccount from '../partials/createDepartmentResponsibleAccount';
import CreateFaculty from '../partials/createFaculty';
import CreateUniversity from '../partials/createUniversity';
function Departments(){  
  const getAllDepartmentsUrl = 'http://localhost:4000/v1/university/allResponsibles';
  const [responsibles, setResponsibles] = useState([]);
  const fetchResponsibles = async () => {
    const res = await axios.get(`${getAllDepartmentsUrl}`);
   if(res.data){
    setResponsibles(res.data.responsibles);
    console.log(responsibles)
   }
  }
  useEffect(()=>{
    fetchResponsibles();
  },[]);
        return(
      <>
          <Helmet>
    <title>ConnectU | Departments</title>
    <meta name='description' content='Departments'/>
   </Helmet>
            <div className={`${departmentsClass.page} container-fluid`}>
            <div className={departmentsClass.section}>
            <h2 className={departmentsClass.h2}>Departments</h2>
          </div>
             <div className= {departmentsClass.section}>
          
          <div className={`${departmentsClass.results}`}>
            <div>
              Results({responsibles.length})
            </div>
            <div className={`dropdown  ${departmentsClass.sortBy}`}>
  <button className={`dropdown-toggle ${departmentsClass.sortBtn}`} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
   Sort by 
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li className={departmentsClass.category}><button classname={`dropdown-item`} onClick={()=>setResponsibles(responsibles)}>Any</button></li>
    <li className='dropdown-divider'></li>
    <li className={departmentsClass.category}><button classname={`dropdown-item `}  onClick={() => setResponsibles([...responsibles].sort((a, b) => a.department.faculty.localeCompare(b.department.faculty)))} >Faculty</button></li>
    <li className={departmentsClass.category}><button classname={`dropdown-item `} >University</button></li>
    <li className={departmentsClass.category}><button classname={`dropdown-item `} >Address</button></li>
  </ul>
</div>
        </div>
         
    <div className={departmentsClass.database}>
    <table className={`table  table-borderless `} >
  <thead>
    <tr>
      <th scope="col">Department Name</th>
      <th >Faculty</th>
      <th>University</th>
      <th scope="col">Address</th>
      <th scope="col">Department Responsible</th>
    </tr>
  </thead>
  <tbody>
  {responsibles.map((r) => (
            <OneDepartment 
            depname={r.dep_name} 
            faculty ={r.faculty.name}
            univ ={r.faculty.university.full_name}
            address ={r.faculty.address}
            depResponsible ={r.full_name}
            email={r.email}
            phone={r.phone}
            image =  {r.image}
   fax={r.fax}
   id={r._id}/>
  
        ))}
  {responsibles.map((r) => (
           console.log(r)
        ))}
  </tbody>
  {/* <tbody>
    {
 responsibles.forEach(responsible => {
  console.log(responsible.department.faculty._id) 
 })

    
    // 
    // phone={responsible.phone}
    // fax={responsible.fax}
    // id={responsible._id}/>
  //  />
  
 }
 {
   Object.values(responsibles).map(responsible => (
    <OneDepartment 
    depname={responsible.department.name}
    // faculty={responsible.department.faculty.name} 
    // univ= {responsible.department.faculty.university.name}
    // address={responsible.department.faculty.address} 
    />
  ))
 }
</tbody> */}
</table>
    </div>
       
</div>
<div className={departmentsClass.newResponsible}>
        <Button content="Create Department Responsible Account" color="dark" dataBsToggle="modal" dataBsTarget="#depResponsible"/>
      </div>
      <CreateDepartmentResponsibleAccount modalId="depResponsible"/>
      <CreateFaculty modalId="faculty"/>
      <CreateUniversity modalId = "university"/>

</div></>
        )
}
export default Departments
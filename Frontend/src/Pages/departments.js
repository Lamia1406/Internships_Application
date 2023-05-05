import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Button from '../partials/button';
import OneDepartment from '../partials/oneDepartment';
import { Helmet } from 'react-helmet';
import axios from "axios";
import { useState,useEffect } from 'react';
import departmentsClass from '../Styles/departments.module.css';
import CreateDepartmentResponsibleAccount from '../partials/createDepartmentResponsibleAccount';
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
              {/* Results({departments.length}) */}
            </div>
            <div className={`dropdown  ${departmentsClass.sortBy}`}>
  <button className={`dropdown-toggle ${departmentsClass.sortBtn}`} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
   Sort by 
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    {/* <li className={departmentsClass.category}><button classname={`dropdown-item`} onClick={()=>setDepartments(departments)}>Any</button></li> */}
    <li className='dropdown-divider'></li>
    <li className={departmentsClass.category}><button classname={`dropdown-item `} >Faculty</button></li>
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
  {/* <tbody>
    {
 responsibles.forEach(responsible => {
  console.log(responsible.department.faculty._id) 
 })

    
    //   depname={responsible.department.name} 
    // 
    // email={responsible.email}
    // depResponsible={responsible.full_name} 
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

</div></>
        )
}
export default Departments
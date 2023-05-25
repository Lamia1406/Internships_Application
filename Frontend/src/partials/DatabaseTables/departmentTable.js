import OneFaculty from "../DatabasePartials/oneFaculty";
import Button from "../button";
import { useState,useEffect} from "react";
import axios from "axios";
import OneDepartment from "../DatabasePartials/OneDepartment";
import tableClass from '../../Styles/partials/DatabaseTables/UniversityTable.module.css'
import CreateFaculty from "../CreateDatabase/createFaculty";
import CreateDepartment from "../CreateDatabase/createDeparment";
function DepartmentTable(props){
    const allDepartmentsURL="http://localhost:4000/university/allDepartments"
    const [departments, setDepartments] = useState([]);
    const fetchDepartments = async () => {
      const res = await axios.get(`${allDepartmentsURL}`);
      if(res.data){
        setDepartments(res.data.departments)
      }
    }
    useEffect(()=>{
      fetchDepartments();
    },[]);
 return  ( <div className={`accordion-item ${tableClass.FAQ}`}>
   <button className={`collapsed text-center ${tableClass.btn}`} id={props.header} type="button" data-bs-toggle="collapse" data-bs-target={`#${props.collapse}`} aria-expanded="true" aria-controls={props.collapse}>
   <div> {props.table}({departments.length})</div>
   </button>
 <div id={props.collapse} className={`accordion-collapse collapse`} aria-labelledby={props.header} data-bs-parent="#accordionparent">
   <div className={`accordion-body`}>
      <div className={tableClass.database}>
      <div className={tableClass.newUniversity}>
<Button content="Create Department" color="white" dataBsToggle="modal" dataBsTarget="#createDep"/>
<CreateDepartment/>
</div>
    <table className={`table  table-borderless `} >
  <thead>
    <tr>
      <th >Department Name</th>
      <th>Belongs to Faculty</th>
    </tr>
  </thead>
  <tbody>
  {
   Object.values(departments).map(department => (
    <OneDepartment name={department.full_name}
     faculty={department.faculty.name}
    />
    
  ))
}
</tbody>

</table>
</div>
   </div>

 </div>
</div>)
}
export default DepartmentTable
import OneFaculty from "../DatabasePartials/oneFaculty";
import Button from "../button";
import { useState,useEffect} from "react";
import axios from "axios";
import tableClass from '../../Styles/partials/DatabaseTables/UniversityTable.module.css'
function FacultyTable(props){
    const allFacultiesURL="http://localhost:4000/university/allFaculties"
    const [faculties, setFaculties] = useState([]);
    const fetchFaculties = async () => {
      const res = await axios.get(`${allFacultiesURL}`);
      if(res.data){
        setFaculties(res.data.faculties)
      }
    }
    useEffect(()=>{
      fetchFaculties();
    },[]);
 return  ( <div className={`accordion-item ${tableClass.FAQ}`}>
   <button className={`collapsed text-center ${tableClass.btn}`} id={props.header} type="button" data-bs-toggle="collapse" data-bs-target={`#${props.collapse}`} aria-expanded="true" aria-controls={props.collapse}>
   <div> {props.table}({faculties.length})</div>
   </button>
 <div id={props.collapse} className={`accordion-collapse collapse`} aria-labelledby={props.header} data-bs-parent="#accordionparent">
   <div className={`accordion-body`}>
      <div className={tableClass.database}>
      <div className={tableClass.newUniversity}>
<Button content="Create Faculty" color="white" dataBsToggle="modal" dataBsTarget="#createFac"/>

</div>
    <table className={`table  table-borderless `} >
  <thead>
    <tr>
      <th >Faculty Name</th>
      <th>Address</th>
      <th>Belongs to University</th>
    </tr>
  </thead>
  <tbody>
  {
   Object.values(faculties).map(faculty => (
    <OneFaculty name={faculty.name}
    address={faculty.address}
     university={faculty.university.full_name}
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
export default FacultyTable
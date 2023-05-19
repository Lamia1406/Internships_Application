import tableClass from '../../Styles/partials/DatabaseTables/UniversityTable.module.css'
import OneUniversity from '../DatabasePartials/oneUniversity'
import { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { toast } from 'react-toastify';
import axios from 'axios';
import Button from '../button';
import CreateUniversity from '../CreateDatabase/createUniversity';
function UniversityTable (props){
    const allUniversitiesUrl="http://localhost:4000/university/allUniversities"
    const [universities, setUniversities] = useState([]);
    const fetchUniversities = async () => {
      const res = await axios.get(`${allUniversitiesUrl}`);
      if(res.data){
        setUniversities(res.data.universities)
      }
    }
    useEffect(()=>{
      fetchUniversities();
    },[]);
 return  ( <div className={`accordion-item ${tableClass.FAQ}`}>
   <button className={`collapsed text-center ${tableClass.btn}`} id={props.header} type="button" data-bs-toggle="collapse" data-bs-target={`#${props.collapse}`} aria-expanded="true" aria-controls={props.collapse}>
   <div> {props.table}({universities.length})</div>
   </button>
 <div id={props.collapse} className={`accordion-collapse collapse`} aria-labelledby={props.header} data-bs-parent="#accordionparent">
   <div className={`accordion-body`}>
      <div className={tableClass.database}>
      <div className={tableClass.newUniversity}>
<Button content="Create University" color="white" dataBsToggle="modal" dataBsTarget="#createUni"/>
<CreateUniversity/>
</div>
    <table className={`table  table-borderless `} >
  <thead>
    <tr>
      <th >University Name</th>
      <th>Address</th>
    </tr>
  </thead>
  <tbody>
  {
   Object.values(universities).map(university => (
    <OneUniversity name={university.full_name}
    address={university.address}
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

export default UniversityTable
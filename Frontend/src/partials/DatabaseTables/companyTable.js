import tableClass from '../../Styles/partials/DatabaseTables/UniversityTable.module.css'
import OneUniversity from '../DatabasePartials/oneUniversity'
import { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { toast } from 'react-toastify';
import OneCompany from '../DatabasePartials/oneCompany';
import axios from 'axios';
import Button from '../button';
import CreateUniversity from '../CreateDatabase/createUniversity';
import CreateCompany from '../CreateDatabase/createCompany';
function CompanyTable (props){
    const allCompaniesUrl="http://localhost:4000/post/allCompanies"
    const [companies, setCompanies] = useState([]);
    const fetchCompanies = async () => {
      const res = await axios.get(`${allCompaniesUrl}`);
      if(res.data){
        setCompanies(res.data.companies)
      }
    }
    useEffect(()=>{
      fetchCompanies();
    },[]);
 return  ( <div className={`accordion-item ${tableClass.FAQ}`}>
   <button className={`collapsed text-center ${tableClass.btn}`} id={props.header} type="button" data-bs-toggle="collapse" data-bs-target={`#${props.collapse}`} aria-expanded="true" aria-controls={props.collapse}>
   <div> {props.table}({companies.length})</div>
   </button>
 <div id={props.collapse} className={`accordion-collapse collapse`} aria-labelledby={props.header} data-bs-parent="#accordionparent">
   <div className={`accordion-body`}>
      <div className={tableClass.database}>
      <div className={tableClass.newUniversity}>
<Button content="Create Company" color="white" dataBsToggle="modal" dataBsTarget="#createComp"/>
<CreateCompany/>
</div>
    <table className={`table  table-borderless `} >
  <thead>
    <tr>
      <th >Company Name</th>
      <th>Address</th>
    </tr>
  </thead>
  <tbody>
  {
   Object.values(companies).map(company => (
    <OneCompany name={company.company_name}
    address={company.address}
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

export default CompanyTable
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Button from '../partials/button';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import CreateCompany from '../partials/createCompany';
import OneSupervisor from '../partials/oneSupervisor';
import supervisorsClass from '../Styles/internshipSupervisors.module.css';
import CreateSupervisorAccount from '../partials/createSupervisorAccount';
import { useEffect, useState } from 'react';
function Supervisors(){
  const getAllSupervisors = 'http://localhost:4000/v1/user/allSupervisors';
  const [supervisors, setSupervisors] = useState([]);
  const [filter, setFilter]= useState()
  const fetchSupervisors = async () => {
    const res = await axios.get(`${getAllSupervisors}`);
    setSupervisors(res.data.supervisors);

  }
  useEffect(()=>{
    fetchSupervisors();
  },[]);
        return(
      <>
          <Helmet>
    <title>ConnectU | Internship Supervisors</title>
    <meta name='description' content='Internship Supervisors'/>
   </Helmet>
            <div className={`${supervisorsClass.page} container-fluid`}>
            <div className={supervisorsClass.section}>
            <h2 className={supervisorsClass.h2}>Internship Supervisors</h2>
          </div>
             <div className= {supervisorsClass.section}>
          
          <div className={`${supervisorsClass.results}`}>
            <div>
            Results({supervisors.length})
            </div>
            <div className={`dropdown  ${supervisorsClass.sortBy}`}>
  <button className={`dropdown-toggle ${supervisorsClass.sortBtn}`} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
   Sort by 
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li className={supervisorsClass.category}><button classname={`dropdown-item`} onClick={()=>setSupervisors(supervisors)} >Any</button></li>
    <li className='dropdown-divider'></li>
    <li className={supervisorsClass.category}><button classname={`dropdown-item `} onClick={() => setSupervisors([...supervisors].sort((a, b) => a.company.localeCompare(b.department)))} >Company</button></li>
  </ul>
</div>
        </div>
         
    <div className={supervisorsClass.database}>
    <table className={`table  table-borderless `} >
  <thead>
    <tr>
      <th scope="col">Full Name</th>
      <th >Email</th>
      <th>Company</th>
      <th scope="col">Company Address</th>
      <th scope="col">Currently Supervising</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    {
      Object.values(supervisors).map(supervisor => (
        <OneSupervisor name={supervisor.full_name} 
        email={supervisor.email} 
        company= {supervisor.company.company_name}
        address={supervisor.company.address} 
        id={supervisor._id}
        />
      ))
    }
   
  </tbody>
</table>
    </div>
       
</div>
<div className={supervisorsClass.newResponsible}>
        <Button content="Create Internship Supervisor Account" color="dark" dataBsToggle="modal" dataBsTarget="#supervisor"/>
      </div>
      <CreateSupervisorAccount modalId="supervisor"/>
      <CreateCompany modalId="company" drop="supervisor"/>
</div></>
        )
}
export default Supervisors
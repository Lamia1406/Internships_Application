import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Button from '../partials/button';
import { Helmet } from 'react-helmet';
import OneSupervisor from 'partials/oneSupervisor';
import supervisorsClass from '../Styles/internshipSupervisors.module.css';
import CreateDepartmentResponsibleAccount from 'partials/createDepartmentResponsibleAccount';
import CreateSupervisorAccount from 'partials/createSupervisorAccount';
function Supervisors(){
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
              Results(120)
            </div>
            <div className={`dropdown  ${supervisorsClass.sortBy}`}>
  <button className={`dropdown-toggle ${supervisorsClass.sortBtn}`} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
   Sort by 
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li className={supervisorsClass.category}><button classname={`dropdown-item`} >Any</button></li>
    <li className='dropdown-divider'></li>
    <li className={supervisorsClass.category}><button classname={`dropdown-item `} >Company</button></li>
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
    <OneSupervisor name="Felix Yongbox" email ="leefelix@google.com" company="Google" address="USA" />
    <OneSupervisor name="Felix Yongbox" email ="leefelix@google.com" company="Google" address="USA" />
    <OneSupervisor name="Felix Yongbox" email ="leefelix@google.com" company="Google" address="USA" />
    <OneSupervisor name="Felix Yongbox" email ="leefelix@google.com" company="Google" address="USA" />
    <OneSupervisor name="Felix Yongbox" email ="leefelix@google.com" company="Google" address="USA" />
    <OneSupervisor name="Felix Yongbox" email ="leefelix@google.com" company="Google" address="USA" />
   
  </tbody>
</table>
    </div>
       
</div>
<div className={supervisorsClass.newResponsible}>
        <Button content="Create Internship Supervisor Account" color="dark" dataBsToggle="modal" dataBsTarget="#supervisor"/>
      </div>
      <CreateSupervisorAccount modalId="supervisor"/>

</div></>
        )
}
export default Supervisors
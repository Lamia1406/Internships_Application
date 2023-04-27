import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Button from '../partials/button';
import OneDepartment from '../partials/oneDepartment';
import { Helmet } from 'react-helmet';
import departmentsClass from '../Styles/departments.module.css';
import CreateDepartmentResponsibleAccount from 'partials/createDepartmentResponsibleAccount';
function Departments(){
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
              Results(120)
            </div>
            <div className={`dropdown  ${departmentsClass.sortBy}`}>
  <button className={`dropdown-toggle ${departmentsClass.sortBtn}`} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
   Sort by 
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li className={departmentsClass.category}><button classname={`dropdown-item`} >Any</button></li>
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
  <tbody>
    <OneDepartment depname="TI" faculty ="NTIC" univ="University Constantine 2" address="Ali Mendjli Constantine" depResponsible="Redouane Nouara"/>
    <OneDepartment depname="TI" faculty ="NTIC" univ="University Constantine 2" address="Ali Mendjli Constantine" depResponsible="Redouane Nouara"/>
    <OneDepartment depname="TI" faculty ="NTIC" univ="University Constantine 2" address="Ali Mendjli Constantine" depResponsible="Redouane Nouara"/>
    <OneDepartment depname="TI" faculty ="NTIC" univ="University Constantine 2" address="Ali Mendjli Constantine" depResponsible="Redouane Nouara"/>
    <OneDepartment depname="TI" faculty ="NTIC" univ="University Constantine 2" address="Ali Mendjli Constantine" depResponsible="Redouane Nouara"/>
    <OneDepartment depname="TI" faculty ="NTIC" univ="University Constantine 2" address="Ali Mendjli Constantine" depResponsible="Redouane Nouara"/>
    <OneDepartment depname="TI" faculty ="NTIC" univ="University Constantine 2" address="Ali Mendjli Constantine" depResponsible="Redouane Nouara"/>
  </tbody>
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
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '../partials/button';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import supervisorsClass from '../Styles/main/usersDatabase.module.css';
import { useEffect, useState } from 'react';
import OneDataSet from '../partials/Database/oneDataSet';
import CreateOneDataRecord from '../partials/Database/createOneDataRecord';
import Layout from '../features/Layout';
function Supervisors(){
  const getAllSupervisors = 'http://localhost:4000/user/allSupervisors';
  const [supervisors, setSupervisors] = useState([]);
  const fetchSupervisors = async () => {
    const res = await axios.get(`${getAllSupervisors}`);
    setSupervisors(res.data.supervisors);

  }
  useEffect(()=>{
    fetchSupervisors();
  },[]);
        return(
     
      <Layout pageTitle= " Internship Supervisors" header = "Internship Supervisors" content = {
            <>
                <div className= {supervisorsClass.section}>
          
          <div className={`${supervisorsClass.results}`}>
            <div>
            Results({supervisors.length})
            </div>
     
        </div>
         
    <div className={supervisorsClass.database}>
    <table className={`table  table-borderless `} >
  <thead>
    <tr>
      <th scope="col">Full Name</th>
      <th>Company</th>
      <th scope="col">Profil</th>
    </tr>
  </thead>
  <tbody>
    {
      Object.values(supervisors).map(supervisor => (
        <OneDataSet full_name={supervisor.full_name} 
        email={supervisor.email} 
        {...(supervisor.company ? { company: supervisor.company.full_name } : {})}
        profil = {`supervisor${supervisor._id}`}
        accepted = {supervisor.accepted}
        rejected = {supervisor.rejected}
        pending = {supervisor.pending}
        image = {supervisor.image}
        length={Object.keys(supervisor).length}
        user = "supervisor"
        table = "Supervisors"
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
      <CreateOneDataRecord table="Supervisors" id="supervisor"/>
            </>
      }/>            
         

        )
}
export default Supervisors
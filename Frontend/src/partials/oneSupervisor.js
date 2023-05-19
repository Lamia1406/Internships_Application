import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Button from '../partials/button';
import Profil from './profil'; 
import oneSupervisorClass from '../Styles/partials/oneSupervisor.module.css'
import axios from 'axios';
import { toast } from 'react-toastify';
function OneSupervisor(props){
  const deleteSupervisorURL= `http://localhost:4000/v1/user/deleteSupervisor/${props.id}`
  const deleteSupervisor = async(event) =>{
    console.log(deleteSupervisorURL)
    event.preventDefault();
          axios.delete(deleteSupervisorURL).then(
          res => {
            console.log(res)
            toast.success("Supervisor Account Deleted Successfully" )
            window.location.reload();
          }
         ).catch(err=>{
          toast.error(err)
          console.log(err)
         })

    
};
    return (
        <tr>
        <td>{props.name}</td>
        <td>{props.email}</td>
        <td>{props.company}</td>
        <td>{props.address}</td>
        <td><button className={oneSupervisorClass.view}>
          view</button></td>
          <td ><div className={oneSupervisorClass.profil}>
        <Button content="Delete" color="white" onClick={deleteSupervisor} /></div></td>

      </tr>
      
    )
}
export default OneSupervisor
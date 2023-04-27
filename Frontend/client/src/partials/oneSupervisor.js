import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Button from '../partials/button';
import Profil from './profil'; 
import oneSupervisorClass from '../Styles/partials/oneSupervisor.module.css'
function OneSupervisor(props){
    return (
        <tr>
        <td>{props.name}</td>
        <td>{props.email}</td>
        <td>{props.company}</td>
        <td>{props.address}</td>
        <td><button className={oneSupervisorClass.view}>
          view</button></td>
          <td ><div className={oneSupervisorClass.profil}>
        <Button content="Modify" color="white" /></div></td>

      </tr>
      
    )
}
export default OneSupervisor
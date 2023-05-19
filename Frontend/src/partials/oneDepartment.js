import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Button from '../partials/button';
import Profil from './profil'; 
import oneDepartmentClass from '../Styles/partials/oneDepartment.module.css'
function OneDepartment(props){
    return (
        <tr>
        <td>{props.depname}</td>
        <td>{props.faculty}</td>
        <td>{props.univ}</td>
        <td>{props.address}</td>
        <td><div  className={oneDepartmentClass.responsible}>
        <p>{props.depResponsible}</p>
        <div className={oneDepartmentClass.profil}>
        <Button content="Profil" color="white"  dataBsToggle="modal"  dataBsTarget={`#responsible${props.id}`} /></div></div></td>
        <Profil  profil="responsible" name={props.depResponsible} image={props.image} email={props.email}
    phone= {props.phone}
    fax={props.fax}

    modalId= {`responsible${props.id}`} footer= {`responsible${props.id}edit`}/>
      </tr>
      
    )
}
export default OneDepartment
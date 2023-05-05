import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Button from '../partials/button';
import Profil from '../partials/profil';
import EditProfil from '../partials/editProfil';
import oneStudent from '../Styles/partials/oneStudent.module.css'
import StudentHistory from './studentHistory';
function OneStudent(props){
    return (
        <tr>
        <td>{props.name}</td>
        <td>{props.faculty}</td>
        <td>{props.dep}</td>
        <td>{props.level}</td>
        <td>{props.enrolled}</td>
        <td><button className={oneStudent.view} data-bs-toggle="modal" data-bs-target={`#studentview${props.id}`}>
          view</button></td>
          <StudentHistory modalId= {`studentview${props.id}`}/>
        
        <td ><div className={oneStudent.profil}>
        <Button content="Profil" color="white" dataBsToggle="modal" dataBsTarget={`#student${props.id}`} /></div></td>
        <Profil  profil="student" name={props.name}  email={props.email}
    phone= {props.phone}
    card= {props.card}
    security= {props.security}
    modalId= {`student${props.id}`} footer= {`student${props.id}edit`}/>
        {/* <EditProfil  profil="student"
    modalId= {`student${props.id}edit`}/> */}
    


      </tr>
    )
}
export default OneStudent
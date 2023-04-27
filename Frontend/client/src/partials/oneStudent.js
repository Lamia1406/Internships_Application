import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Button from '../partials/button';
import Profil from '../partials/profil';
import oneStudent from '../Styles/partials/oneStudent.module.css'
function OneStudent(props){
    return (
        <tr>
        <td>{props.name}</td>
        <td>{props.faculty}</td>
        <td>{props.dep}</td>
        <td>{props.level}</td>
        <td>{props.enrolled}</td>
        <td><button className={oneStudent.view}>
          view</button></td>
        <td ><div className={oneStudent.profil}>
        <Button content="Profil" color="white" dataBsToggle="modal" dataBsTarget="#profilModal" /></div></td>
        <Profil modalId="profilModal" profil="student"/>


      </tr>
    )
}
export default OneStudent
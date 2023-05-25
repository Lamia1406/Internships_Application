import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '../button';
import Profil from './profil';
import { useState } from 'react';
import oneStudent from '../../Styles/partials/DatabasePartials/oneUser.module.css'
function OneStudent(props){
  const [displayBtns,setDisplayBtns]=useState(false)
  const displayProfile = () =>{
    setDisplayBtns(!displayBtns)
  
  }
    return (
        <tr onClick={displayProfile}>
        {
          !displayBtns && (
            <>
            <td>{props.name}</td>
        <td>{props.faculty}</td>
        <td>{props.dep}</td>
        <td>{props.univ}</td>
        <td ><div className={oneStudent.profil}>
        <Button content="Profil" color="white" dataBsToggle="modal" dataBsTarget={`#student${props.id}`} /></div></td>
        <Profil  profil="student" name={props.name}  email={props.email} enrolled={props.enrolled}
        image = {props.image}
    phone= {props.phone}
    card= {props.card}
    id={props.id}
    security= {props.security}
    modalId= {`student${props.id}`} footer= {`student${props.id}edit`}/>
       
    


            </>
          )
        }
  {
        displayBtns && (
          <>
          <td colSpan={5}>       
            <div style={{width:"fit-content"}}>
            <Button content="Delete" color="black" dataBsToggle="modal" />
              </div>
            </td>
          </>
        )
       }
      </tr>
    )
}
export default OneStudent
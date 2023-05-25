import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '../button';
import Profil from './profil';
import oneDepartmentClass from '../../Styles/partials/DatabasePartials/oneUser.module.css'
function OneResponsible(props){
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
        <td>{props.dep}</td>
        <td>{props.faculty}</td>
        <td>{props.univ}</td>
        <td>
        <div className={oneDepartmentClass.profil}>
        <Button content="Profil" color="white"  dataBsToggle="modal"  dataBsTarget={`#responsible${props.id}`} /></div></td>
        <Profil  profil="responsible"  image={props.image} email={props.email}
    phone= {props.phone}
    fax={props.fax}
    id= {props.id}
    accepted = {props.accepted}
    rejected = {props.rejected}
    pending = {props.pending}
    modalId= {`responsible${props.id}`} />
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
export default OneResponsible
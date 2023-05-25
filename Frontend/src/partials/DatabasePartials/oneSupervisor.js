import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Button from '../button';
import Profil from './profil'; 
import oneSupervisorClass from '../../Styles/partials/DatabasePartials/oneUser.module.css'
function OneSupervisor(props){
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
        <td>{props.company}</td>
          <td ><div className={oneSupervisorClass.profil}>
        <Button content="Profil" color="white" dataBsToggle="modal" dataBsTarget={`#supervisor${props.id}`} /></div></td>
        <Profil  profil="supervisor"   email={props.email}  image={props.image}
    modalId= {`supervisor${props.id}`}  accepted = {props.accepted}
    rejected = {props.rejected}
    pending = {props.pending}/>
            </>
          )
        }
      {
        displayBtns && (
          <>
          <td colSpan={3}>       
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
export default OneSupervisor
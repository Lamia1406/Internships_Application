import { useState } from "react"
import Button from "../button"
import Profil from "../DatabasePartials/profil"
import oneLine from '../../Styles/partials/DatabasePartials/oneUser.module.css'
function OneDataSet(props) {
  console.log(props)
  const changDateFormat = (d) => {
    let date = new Date(Date.UTC(
      parseInt(d.substring(0, 4)),  
      parseInt(d.substring(5, 7)) - 1,  
      parseInt(d.substring(8, 10)),  
      parseInt(d.substring(11, 13)), 
      parseInt(d.substring(14, 16)), 
      parseInt(d.substring(17, 19)), 
      parseInt(d.substring(20, 23))  
    ));
  
    date = date.toUTCString();
  
    const year = date.substring(12, 16);
    const month = date.substring(8, 11);
    const day = date.substring(5, 7);
  
    
  
  
    return `${year}/${month}/${day}`;
  };
  const [displayBtns, setDisplayBtns] = useState(false)
  const displayProfile = () => {
    setDisplayBtns(!displayBtns)
    if(props.mark_presence){
      setDisplayBtns(false)
    }
  }
  return (
    <tr onClick={displayProfile}>
      {!displayBtns && (
        <>
          {
            props.full_name ? (
              <td>{props.full_name}</td>
            ) :<td></td>
          }
          {
            props.address ? (
              <td>{props.address}</td>
            ):<td></td>
          }
          {
            props.university ? (
              <td>{props.university}</td>
            ) : <td></td>
          }
          {
            props.company ? (
              <td>{props.company}</td>
            ) : <td></td>
          }
          {
            props.faculty ? (
              <td>{props.faculty}</td>
            ): <td></td>
          }
          {
            props.dep ? (
              <td>{props.dep}</td>
            ) : <td></td>
          }
          {
            props.day ? (
              <td>{changDateFormat(props.day)}</td>
            ) : <td></td>
          }
          {
            props.present!= null ? (
              <td>{props.present== true ? "Yes" : "No"}</td>
            ) : <td></td>
          }
          {
            props.profil ? (
              <>
              <td>
                <div  className={oneLine.profil}>
        <Button content="Profil" color="white"  dataBsToggle="modal"  dataBsTarget={`#${props.profil}`} />
        </div>
              </td>
              <Profil modalId={props.profil}
              image={props.image} email={props.email}
              phone= {props.phone}
              fax={props.fax}
              accepted = {props.accepted}
              rejected = {props.rejected}
              pending = {props.pending}
              user = {props.user}
              card = {props.card}
              security= {props.security}
              enrolled ={props.enrolled}/>

              </>
            ) :<td></td>
          }
         
        </>
      )}
      {displayBtns && (
        <>
          <td colSpan={props.length}>
            <div>
              {
                !props.profil  && !props.day && !props.present && (
                  <div>
                <Button content="Modify" color="black" dataBsToggle="modal" />
              </div>
                )
              }
              {
                !props.day && !props.present &&(
                  <div>
                <Button content="Delete" color="clear" dataBsToggle="modal" />
              </div>
                )
              }
            </div>
          </td>
        </>
      )}
    </tr>
  )
}
export default OneDataSet
import { useState,useEffect } from "react"
import Button from "../button"
import Profil from "../DatabasePartials/profil"
import axios from "axios"
import { toast } from "react-toastify"
import changeDateFormat from "../../features/changeDateFormat"
import oneLine from '../../Styles/partials/DatabasePartials/oneUser.module.css'
function OneDataSet(props) {
  console.log(props)
  const [deleteDataURL,setDeleteDataURL]=useState("")
  const deleteData = async()=>{
          try{
            const res = await axios.delete(deleteDataURL);
          if(res.data.status){
            toast.success("Successfully Deleted")
            window.location.reload()
          }
          }
          catch(err){
            toast.error(err.response.data.error)
            console.log(err.response.data.error)
          }
  }
  useEffect(()=>{
    if(props.table == "Universities"){
        setDeleteDataURL(`http://localhost:4000/university/deleteUniversity/${props.id}`)
    }
    if(props.table == "Faculties"){
        setDeleteDataURL(`http://localhost:4000/university/deleteFaculty/${props.id}`)
    }
    if(props.table == "Departments"){
        setDeleteDataURL(`http://localhost:4000/university/deleteDepartment/${props.id}`)
    }
    if(props.table == "Companies"){
        setDeleteDataURL(`http://localhost:4000/post/deleteCompany/${props.id}`)
    }
    if(props.table == "Responsibles"){
        setDeleteDataURL(`http://localhost:4000/user/deleteResponsible/${props.id}`)
    }
    if(props.table == "Students"){
        setDeleteDataURL(`http://localhost:4000/user/deleteStudent/${props.id}`)
        
    }
    if(props.table == "Supervisors"){
        setDeleteDataURL(`http://localhost:4000/user/deleteSupervisor/${props.id}`)
        
    }
    
    

  },[deleteDataURL]);
  
  const [displayBtns, setDisplayBtns] = useState(false)
  const displayProfile = () => {
    if(props.table != "Presences"){
      setDisplayBtns(!displayBtns)
    }
  }
  return (
    <tr onClick={displayProfile}>
      {!displayBtns  && (
        <>
          {
            props.full_name && (
              <td>{props.full_name}</td>
            ) 
          }
          {
            props.address && (
              <td>{props.address}</td>
            )
          }
          {
            props.university && (
              <td>{props.university}</td>
            ) 
          }
          {
            props.company && (
              <td>{props.company}</td>
            ) 
          }
          {
            props.faculty && (
              <td>{props.faculty}</td>
            )
          }
          {
            props.dep &&(
              <td>{props.dep}</td>
            ) 
          }
          {
            props.day && (
              <td>{changeDateFormat(props.day)}</td>
            )
          }
          {
            props.present!= null && (
              <td>{props.present== true ? "Yes" : "No"}</td>
            ) 
          }
          {
            props.profil && (
              <>
              <td>
                <div  className={oneLine.profil}>
        <Button content="Profil" color="white"  dataBsToggle="modal"  dataBsTarget={`#${props.profil}`}  onMouseOut={()=>setDisplayBtns(false)}/>
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
            ) 
          }
         
        </>
      )}
      {displayBtns   &&(
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
                <Button content="Delete" color="clear"   onClick={deleteData}/>
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
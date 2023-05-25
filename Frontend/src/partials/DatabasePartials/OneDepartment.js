import { useState } from "react"
import Button from "../button"
function OneDepartment(props){
  const [displayBtns,setDisplayBtns]=useState(false)
  const displayProfile = () =>{
    setDisplayBtns(!displayBtns)
  }
    return (
        <tr onClick={displayProfile}>
        { !displayBtns && (
          <>
          <td>{props.name}</td>
          <td>{props.faculty}</td>
          </>
        )}
        {displayBtns && (
          <>
          <td colSpan={2}>   
            <div>
            <div>
            <Button content="Modify" color="black" dataBsToggle="modal" dataBsTarget={`#department${props.id}`} />
              </div>     
            <div>
            <Button content="Delete" color="clear" dataBsToggle="modal" dataBsTarget={`#department${props.id}`} />
              </div>
              </div>      
            </td>
          </>
        )}
      </tr>
    )
}
export default OneDepartment
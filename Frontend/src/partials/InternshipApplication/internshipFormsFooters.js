import Button from "../button"
import internshipClass from "../../Styles/partials/InternshipApplication/internshipFormsFooters.module.css"
import { toast } from "react-toastify"
import axios from "axios"
import TextArea from "../textarea"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
function InternshipFormsFooters(props){
  const [rejectInternshipURL,setRejectInternshipURL]=useState("")
 
  const [rejectionMessageClass,setRejectMessageClass] =useState(false)
const [rejectionMessage,setRejectionMessage]=useState("")
 
const rejectInternship = async(event) =>{
  console.log(rejectionMessage)
  console.log(rejectInternshipURL)
  event.preventDefault();
        const payload ={
            rejectionMessage
        } 
       
        try{
            const res = await axios.put(rejectInternshipURL,payload);
            
            if(res.data.status){
                
                  toast.success("Student has been rejected")
                  window.location.reload()
                  
            }
          }
          catch(err){
            console.log(err)
          }
    }
    
    const [deleteClass,setDeleteClass]=useState(false)
    const [acceptClass,setAcceptClass]=useState(false)
    
    const deleteAppURL = `http://localhost:4000/internship/deleteInternship/${props.internshipId}`
    
    
const deleteInternship = async (event) =>{
    event.preventDefault();
         try{
               const res = await axios.delete(deleteAppURL);
               if(res.data.status){
                     toast.success("Internship has been successfully deleted")
                     window.location.reload();         
               }
         }
         catch(err){
          console.log(err.response.data)
           toast.error(err.response.data.error)
         }
         
   }
   const acceptInternship = async(event) =>{
       event.preventDefault();
       try{
           const res = await axios.put(acceptInternshipURL);
           if(res.data.status){
                 toast.success("Student has been accepted")
                 window.location.reload()
           }
     }
     catch(err){
           console.log(err.response.data.error)
           toast.error(err.response.data.error)
     }

   }
//Manage Internship
const [acceptInternshipURL,setAcceptInternshipURL]=useState('')


const acceptNewInternshipURL = `http://localhost:4000/internship/acceptNewIntership/responsible/${props.internshipId}`
const acceptNewInternship = async(event) =>{
  console.log(acceptInternshipURL)
    event.preventDefault();
    try{
        const res = await axios.put(acceptNewInternshipURL);
        if(res.data.status){
              toast.success("internship successfully accepted")
              window.location.reload()
              
        }
  }
  catch(err){
    console.log(err.response.data.error)
    toast.error(err.response.data.error)
  }

}
useEffect(()=>{
if(props.type == "responsible"){
   setAcceptInternshipURL(`http://localhost:4000/internship/acceptInternship/responsible/${props.internshipId}`)
   setRejectInternshipURL(`http://localhost:4000/internship/rejectInternship/responsible/${props.internshipId}`)
}
if(props.type == "supervisor"){
  setAcceptInternshipURL(`http://localhost:4000/internship/acceptInternship/supervisor/${props.internshipId}`)
  setRejectInternshipURL( `http://localhost:4000/internship/rejectInternship/supervisor/${props.internshipId}`
  )
}
})
    return(
        <div>
              
{
  (props.approvedByResponsible === "pending" || props.approvedBySupervisor === "rejected") && props.type === "student" && (
    <>
      {!deleteClass && (
        <div className={internshipClass.modificationBtns}>
          <div>
            <Button content="Delete" color="clear" onClick={() => setDeleteClass(true)} />
          </div>
          <div>
            <Button content="Modify" color="black" onClick={() =>  props.setModifyClass((prevState) => !prevState)} />
          </div>
        </div>
      )}
      {deleteClass && (
        <div className={internshipClass.modificationBtns}>
          <div >Are you sure you want to delete this internship?</div>
          <div>
            <Button content="Yes" color="clear" onClick={deleteInternship} />
          </div>
          <div>
            <Button content="No" color="black" onClick={() => setDeleteClass(false)} />
          </div>
        </div>
      )}
    </>
  )
}
{
  props.type !== "student" && (
   ( (props.approvedBySupervisor == "pending" && props.type == "supervisor") || (props.approvedByResponsible == "pending" && props.type == "responsible"))&& (
      <>
       {
           props.rejectClass == false && acceptClass==false && rejectionMessageClass==false && (
               <div className={internshipClass.modificationBtns}>
               <div>
                     <Button content="Reject" color="clear" onClick={()=> props.setRejectClass(true)}/>
                   </div>
                   <div>
                   <Button content="Accept" color="black" onClick={()=>setAcceptClass(true)}/>
                   </div>
                
               </div>
           )
       }
      {
       props.rejectClass== true && (
           <div className={internshipClass.modificationBtns}>
               <div className={internshipClass.confirmDeletion}>Are you sure you want to reject this internship ?</div>
      <div>
            <Button content="Yes" color="clear" onClick={()=>{setRejectMessageClass(true)
           props.setRejectClass(false) }}/>
          </div>
          <div>
          <Button content="No" color="black" onClick={()=>props.setRejectClass(false)}/>
          </div>
      
      </div>
       )
      }
      {
       rejectionMessageClass == true && (
          <div className={internshipClass.rejectionDiv}>
           <div className={` row ${internshipClass.rejectionLabel}`}>
           <p className=" col-lg-5">
                    You can leave a message stating the reason :
                 </p>
           <div className={` col-lg-7 `}>
           <TextArea placeholder ="" value={props.rejectionMessage} onChange={e=>setRejectionMessage(e.target.value)} type="text"/>
           
           </div>
           </div>
           <div className={internshipClass.rejectionBtns}>
           <div>
                 <Button content="Validate" color="rejectionClear" onClick={rejectInternship}/>
               </div>
               <div>
               <Button content="Cancel" color="rejectionDark" onClick={()=>setRejectMessageClass(false)}/>
               </div>
               </div>
          </div>
       )
      }
      {
       acceptClass== true && (
           <div className={internshipClass.modificationBtns}>
               {
                   props.isOffer && (
                       <div className={internshipClass.confirmDeletion}>Are you sure you want to accept this internship ?</div>
                   )
               }
               {
                   props.isOffer == false && (
                       <div className={internshipClass.confirmDeletion}>This internship application does not have a supervisor,as a result it can't be accepted without their existance, do you want to create an account for them ?</div>
                   )
               }
      <div>
      {
        props.type == "responsible" &&
        (
          <Button content="Yes" color="clear" onClick={ props.isOffer == true ? acceptInternship : acceptNewInternship}/>
        )
      }
      {
        props.type == "supervisor" &&
        (
          <Button content="Yes" color="clear" onClick={ acceptInternship}/>
        )
      }

          </div>
          <div>
          <Button content="No" color="black" onClick={()=>setAcceptClass(false)}/>
          </div>
      
      </div>
       )
      }
      </>
    )
  )
}
        </div>
    )
}

export default InternshipFormsFooters
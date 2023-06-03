import { toast } from "react-toastify";
import internshipClass from "../../Styles/partials/InternshipApplication/internshipFormsHeaders.module.css"
import Button from "../button"
import { useNavigate } from "react-router-dom"
import axios from "axios";
function InternshipFormsHeaders(props) {
    const chooseInternshipURL = `http://localhost:4000/internship/chooseInternship/student/${props.internshipId}`
    const navigate = useNavigate();
    const chooseInternship =async () =>{
           try{
            const res = await axios.put(chooseInternshipURL);
            if(res.data.status){
                toast.success("Operation Successful")
                window.location.reload()
            }
            else{
                toast.warn("Failed Operation")
            }
           }
           catch(err){
            toast.error(err.response.data.error)
            console.log(err.response.data.error)
           }
    }
    return (
        <div className={internshipClass.title}>
            {
                props.approvedBySupervisor == "pending" && props.approvedByResponsible == "pending" && (<div className={`alert alert-secondary ${internshipClass.alert}`} role="alert">
                    Pending
                </div>)
            }
            {
                props.approvedByResponsible == "accepted" && props.approvedBySupervisor == "pending" && (<div className={`alert alert-warning ${internshipClass.alert}`} role="alert">
                    Accepted By Department Responsible
                </div>)
            }
            {
                ((props.approvedBySupervisor == "rejected")) && (
                    <>
                        <div className={`alert alert-danger ${internshipClass.alert}`} role="alert">
                            Rejected {
                                props.type != 'supervisor' ? "By Supervisor" : ""
                            }
                        </div>
                        {
                            props.message !== "" && (
                                <div className={internshipClass.reason}>Reason : {props.message}</div>
                            )
                        }
                    </>
                )
            }
            {
                props.approvedByResponsible == "accepted" && props.approvedBySupervisor == "accepted" && (<div className={`alert alert-success ${internshipClass.alert}`} role="alert">
                    {props.type != "student" ? "Waiting For Student Confirmation!" : "Accepted by Internship Supervisor"}
                </div>)
            }
            {
                (props.approvedByResponsible == "rejected") && (
                    <>
                        <div className={`alert alert-danger ${internshipClass.alert}`} role="alert">
                            Rejected {
                                props.type == 'student' ? "By Responsible" : ""
                            }
                        </div>
                        {
                            props.message !== "" && (
                                <div className={internshipClass.reason}>Reason : {props.message}</div>
                            )
                        }
                    </>
                )
            }
            {
                props.approvedByResponsible == "rejectedByStudent" && props.approvedBySupervisor == "rejectedByStudent" && (props.type == "supervisor" || props.type == "responsible") && (<div className={`alert alert-danger ${internshipClass.alert}`} role="alert">
                    rejected By Student
                </div>)
            }
            {
                props.approvedByResponsible == "ongoing" && props.approvedBySupervisor == "ongoing" && (
                    <div className={`alert alert-primary ${internshipClass.alert}`} role="alert">
                        {
                            new Date(props.startingDate) > new Date() && (
                                <div> {Math.floor((new Date(props.startingDate) - new Date()) / (1000 * 60 * 60 * 24))} days left to the start of the internship</div>
                            )
                        }
                        {
                            new Date(props.startingDate) < new Date() && new Date(props.endingDate) > new Date() && (

                                <div>
                                    {props.type !== "student" ? (
                                        <>
                                            student just started{" "}
                                            {Math.floor((new Date() - new Date(props.startingDate)) / (1000 * 60 * 60 * 24))}{" "}
                                            days ago!
                                        </>
                                    ) : (
                                        <>
                                            You just started {Math.floor((new Date() - new Date(props.startingDate)) / (1000 * 60 * 60 * 24))} days ago! we hope everything's going well
                                        </>
                                    )}
                                </div>
                            )
                        }
                        {
                            new Date(props.endingDate) <= new Date() && (
                                <div>
                                    {props.type !== "student" ? (
                                        <>
                                            Student just completed their internship
                                        </>
                                    ) : (
                                        <>
                                            Congrats , you've just completed your internship
                                        </>
                                    )}
                                </div>

                            )
                        }
                    </div>)
            }
            {
                props.approvedByResponsible == "ongoing" && props.approvedBySupervisor == "ongoing"  && (
                   <div className={internshipClass.controlDiv}>
                     <div className={` ${internshipClass.presenceDiv}`}>
                            <Button content="View Presence" color="black" onClick={() => navigate('/presence', { state: { studentId: props.studentId,internshipId:props.internshipId, startingDate: props.startingDate, endingDate: props.endingDate } })} />      
                            </div>
                    {
                        new Date(props.endingDate) <= new Date() && props.type == "supervisor"&& (
                            
                            <div className={internshipClass.presenceDiv}>
                                <Button content="Evaluate Student" color="black" onClick={() => navigate('/evaluation', { state: { studentId: props.studentId, internshipId:props.internshipId } })} />  
                            </div>    
                        )
                    }
                   </div>
                  
                )
            }
                {
 
 props.approvedBySupervisor === "accepted" && props.type === "student" && (
     <div className={internshipClass.presenceDiv}>
       <Button content="Choose Internship" color="black"  onClick={chooseInternship}/>
     </div>
   
 ) 
}
        </div>
    )
}
export default InternshipFormsHeaders
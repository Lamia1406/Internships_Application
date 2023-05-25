import internshipClass from "../../Styles/partials/InternshipApplication.js/internshipFormsHeaders.module.css"
import Button from "../button"
import { useNavigate } from "react-router-dom"
function InternshipFormsHeaders(props) {
    const navigate = useNavigate();
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
                            new Date(props.endingDate) == new Date() && (
                                <div>
                                    {props.type !== "student" ? (
                                        <>
                                            Student just finished their internship , you can find the button that takes you to the certificate in the internship details
                                        </>
                                    ) : (
                                        <>
                                            Congrats , you've just completed your internship, you can go and consult your certificate
                                        </>
                                    )}
                                </div>

                            )
                        }
                    </div>)
            }
            {
                props.approvedByResponsible == "ongoing" && props.approvedBySupervisor == "ongoing" && (
                    <div className={` ${internshipClass.presenceDiv}`}>
                        <Button content="View Presence" color="black" onClick={() => navigate('/presence', { state: { studentId: props.studentId, startingDate: props.startingDate, endingDate: props.endingDate } })} />
                    </div>
                )
            }
        </div>
    )
}
export default InternshipFormsHeaders
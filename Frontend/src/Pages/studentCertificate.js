import { useLocation } from "react-router-dom"
import generatePDF from "../features/generatePdf"
import Button from "../partials/button"
import jwtDecode from "jwt-decode"
import certificateClass from "../Styles/partials/Forms/certificateForm.module.css"
import changeDateFormat from '../features/changeDateFormat'
function StudentCertificate (){
    const user = jwtDecode(localStorage.getItem("token"))
    const location = useLocation()
    const certificate = location.state.certificate
console.log(location.state.certificate)

    return (
        <>
        <div className={`pdf ${certificateClass.main}`}>
            <div className={certificateClass.header}>
                <div className={certificateClass.republic}> People's Democratic Republic of Algeria</div>
                <div className={certificateClass.title}> INTERNSHIP CERTIFICATE</div>
            </div>
            <div className={certificateClass.content}>
            I, the undersigned <span className={certificateClass.data}> {user.full_name} </span>, internship supervisor at <span className={certificateClass.data}>{certificate.theme}</span>,
certify that the student <span className={certificateClass.data}> {certificate.studentFullName}</span> enrolled at the <span className={certificateClass.data}>{certificate.company}</span> establishment,
has completed a training internship
During the period from <span className={certificateClass.data}>{changeDateFormat(certificate.startingDate)}</span> to <span className={certificateClass.data}>{changeDateFormat(certificate.endingDate)}</span>
            </div>
            
                <div className={certificateClass.date}>
                Done at Constantine on <span className={certificateClass.data}>{changeDateFormat(new Date())}</span>
                </div>
                <div className={certificateClass.footer}>
                    <div>Representative of {certificate.company} establishment
</div>
<div>
Internship Supervisor or Hosting Institution/Administration
</div>

                </div>
                <div className={certificateClass.rights}>
This certificate is issued to serve and assert its legal purposes.
</div>
        </div>
        <div className={certificateClass.download}>
            <Button  content = "Download" color= "loginDark" onClick= {() => generatePDF(certificate , user)}/>
        </div>
        </>


    )

}

export default StudentCertificate
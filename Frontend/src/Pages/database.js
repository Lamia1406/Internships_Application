import React,{useState , useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Button from '../partials/button';
import OneStudent from '../partials/DatabasePartials/oneStudent';
import studentsClass from '../Styles/students.module.css';
import UniversityTable from '../partials/DatabaseTables/universityTable';
import Account from '../Images/account.png'
import Accepted from '../Images/accepted.png';
import Pending from '../Images/pending.png';
import Rejected from '../Images/rejected.png';
import Search from "../Images/search.png"
import Input from '../partials/input';
import CompanyTable from '../partials/DatabaseTables/companyTable';
import { Helmet } from 'react-helmet';
import axios from 'axios'
import CreateStudentAccount from '../partials/CreateDatabase/createStudentAccount';
import CreateUniversity from '../partials/CreateDatabase/createUniversity';
import FacultyTable from '../partials/DatabaseTables/FacultyTable';
import DepartmentTable from '../partials/DatabaseTables/departmentTable';
function Database()
  {
    const getAllStudentsUrl = 'http://localhost:4000/v1/user/allStudents';
    const [students, setStudents] = useState([]);
    const fetchStudents = async () => {
      const res = await axios.get(`${getAllStudentsUrl}`);
      if(res.data){
        setStudents(res.data.students)
      }
    }
    useEffect(()=>{
      fetchStudents();
    },[]);
  
  
    return (
     <>
      <Helmet>
      <title>ConnectU | Database</title>
      <meta name='description' content='Database'/>
     </Helmet>
        <div className={`${studentsClass.page} container-fluid`}>
          <div className={studentsClass.section}>
            <h2 className={studentsClass.h2}>Database</h2>
          </div>
          <div  className={`${studentsClass.section}`}>
         <UniversityTable table="Universities" header="university" collapse="uni"/>
         <FacultyTable table="Faculties" header="faculty" collapse="fac"/>
         <DepartmentTable table="Departments" header="department" collapse="dep" />
         <CompanyTable table="Companies" header="company" collapse="comp" />
          </div>
          {/* <div className={`${studentsClass.section} `}>
           <div className={` row ${studentsClass.accountStatistics}`}>
            <div className={`col-lg-4 ${studentsClass.accounts}`}>
                <div className={`${studentsClass.accountsTitle}`}> Total Accounts </div>
                <div className={`${studentsClass.accountsNumber}`}>
                  <img src={Account} alt='account'/>
                  <div>{students.length}</div>
                </div>
            </div>
            <div className={`col-lg-8`}>
                <div className={studentsClass.enrolled}>
                <div className={`${studentsClass.enrolledTitle}`}> Enrolled </div>
                <div className={`${studentsClass.enrolledNumber}`}>
                  <img src={Account} alt='account'/>
                  <div>10</div>
                </div>
                </div>
                <div className={`row ${studentsClass.statistics}`}>
                  <div className='col'> <img src={Accepted}/> Accepted(12)</div>
                  <div className='col'> <img src={Pending}/> Pending(17)</div>
                  <div className='col'> <img src={Rejected}/> Rejected(6)</div>
                </div>
            </div>
            </div>
           

          </div>
             <div className= {studentsClass.section}>

    <div>
      <div className={`row ${studentsClass.classification}`}>
        <div className={`col-lg-7 ${studentsClass.results}`}>
            <div>
              Results({students.length})
            </div>
            <div className={`dropdown  ${studentsClass.sortBy}`}>
  <button className={`dropdown-toggle ${studentsClass.sortBtn}`} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
   Sort by 
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li className={studentsClass.category}><button classname={`dropdown-item`} onClick={()=>setStudents(students)}>Any</button></li>
    <li className='dropdown-divider'></li>
    <li className={studentsClass.category}>
  <button className="dropdown-item" onClick={() => setStudents([...students].sort((a, b) => a.faculty.localeCompare(b.faculty)))}>
    Faculty
  </button>
</li>
    <li className={studentsClass.category}><button classname={`dropdown-item `}  onClick={() => setStudents([...students].sort((a, b) => a.department.localeCompare(b.department)))} >Department</button></li>
    <li className={studentsClass.category}><button classname={`dropdown-item `}  onClick={() => setStudents([...students].sort((a, b) => a.level_of_study.localeCompare(b.level_of_study)))}>Level of study</button></li>
  </ul>
</div>
        </div>
        <div className='col-lg-5'>
        <form className={`${studentsClass.inputDiv} d-flex`}>
  <Input placeholder="search for student..."/>
  <button className={studentsClass.searchIcon} type="submit"><img src={Search} alt='search icon' /></button>
  </form>
        </div>
      </div>
      <div className={studentsClass.database}>
    <table className={`table  table-borderless `} >
  <thead>
    <tr>
      <th >Full Name</th>
      <th>Faculty</th>
      <th scope="col">Department</th>
      <th scope="col">Level Of Study</th>
      <th scope="col">Current Intern</th>
      <th scope="col">History</th>
      <th scope="col"> <div style={{width:"80px"}}></div></th>
    </tr>
  </thead>
  <tbody>
  {
   Object.values(students).map(student => (
    <OneStudent name={student.full_name} 
    faculty={student.department.faculty.name}  //we'll go back later
    dep= {student.department.dep_name} 
    phone={`${student.phone}`}
    email={student.email}
    level={student.level_of_study} 
    image = {student.image}
    //depResponsible={student.responsible_name}  //we'll go back later
    enrolled = {student.enrolled}
    card={`${student.student_card_number}`}
    id={student._id}
    security={`${student.social_security_number}`}
    />
  ))
}
  </tbody>
</table>
</div>
    </div>
       
</div>
<div className={studentsClass.newStudent}>
        <Button content="Create Student Account" color="dark" dataBsToggle="modal" dataBsTarget="#student"/>
      </div>
      <CreateStudentAccount modalId="student" /> */}
</div>
</>
    )
}
export default Database 
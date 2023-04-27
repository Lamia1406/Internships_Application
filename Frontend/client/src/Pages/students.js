import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Button from '../partials/button';
import OneStudent from '../partials/oneStudent';
import studentsClass from '../Styles/students.module.css';
import Account from '../Images/account.png'
import Accepted from '../Images/accepted.png';
import Pending from '../Images/pending.png';
import Rejected from '../Images/rejected.png';
import Search from "../Images/search.png"
import Input from '../partials/input';
import { Helmet } from 'react-helmet';
import CreateStudentAccount from 'partials/createStudentAccount';

function Students()
{
    return (
     <>
      <Helmet>
      <title>ConnectU | Students</title>
      <meta name='description' content='Students'/>
     </Helmet>
        <div className={`${studentsClass.page} container-fluid`}>
          <div className={studentsClass.section}>
            <h2 className={studentsClass.h2}>Students</h2>
          </div>
          <div className={`${studentsClass.section} `}>
           <div className={` row ${studentsClass.accountStatistics}`}>
            <div className={`col-lg-4 ${studentsClass.accounts}`}>
                <div className={`${studentsClass.accountsTitle}`}> Total Accounts </div>
                <div className={`${studentsClass.accountsNumber}`}>
                  <img src={Account} alt='account'/>
                  <div>120</div>
                </div>
            </div>
            <div className={`col-lg-8`}>
                <div className={studentsClass.enrolled}>
                <div className={`${studentsClass.enrolledTitle}`}> Enrolled </div>
                <div className={`${studentsClass.enrolledNumber}`}>
                  <img src={Account} alt='account'/>
                  <div>35</div>
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
              Results(120)
            </div>
            <div className={`dropdown  ${studentsClass.sortBy}`}>
  <button className={`dropdown-toggle ${studentsClass.sortBtn}`} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
   Sort by 
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li className={studentsClass.category}><button classname={`dropdown-item`} >Any</button></li>
    <li className='dropdown-divider'></li>
    <li className={studentsClass.category}><button classname={`dropdown-item `} >Faculty</button></li>
    <li className={studentsClass.category}><button classname={`dropdown-item `} >Department</button></li>
    <li className={studentsClass.category}><button classname={`dropdown-item `} >Level of study</button></li>
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
      <th scope="col">Currently Enrolled</th>
      <th scope="col">History</th>
      <th scope="col"> <div style={{width:"80px"}}></div></th>
    </tr>
  </thead>
  <tbody>
    <OneStudent name="Lamia" faculty="NTIC" dep="TI" level="L3" enrolled="Yes"/>
    <OneStudent name="Lamia" faculty="NTIC" dep="TI" level="L3" enrolled="Yes"/>
    <OneStudent name="Lamia" faculty="NTIC" dep="TI" level="L3" enrolled="Yes"/>
    <OneStudent name="Lamia" faculty="NTIC" dep="TI" level="L3" enrolled="Yes"/>
    <OneStudent name="Lamia" faculty="NTIC" dep="TI" level="L3" enrolled="Yes"/>
    <OneStudent name="Lamia" faculty="NTIC" dep="TI" level="L3" enrolled="Yes"/>
  </tbody>
</table>
</div>
    </div>
       
</div>
<div className={studentsClass.newStudent}>
        <Button content="Create Student Account" color="dark" dataBsToggle="modal" dataBsTarget="#student"/>
      </div>
      <CreateStudentAccount modalId="student"/>
</div></>
    )
}
export default Students 
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Button from '../partials/button';
import OneStudent from '../partials/oneStudent';
import studentsClass from '../Styles/students.module.css'
function Students()
{
    return (
        <div className={`${studentsClass.page} container-fluid`}>
             <div className= {studentsClass.section}>

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
    )
}
export default Students 
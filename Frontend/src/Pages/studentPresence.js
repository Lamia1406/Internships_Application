import presenceClass from '../Styles/studentPresence.module.css'
import { Helmet } from 'react-helmet';
import Button from '../partials/button';
import { NavLink, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import OneDataSet from '../partials/Database/oneDataSet';

import CreateOneDataRecord from '../partials/Database/createOneDataRecord';
 import axios from 'axios';
 import { useState,useEffect } from 'react';
 import jwtDecode from "jwt-decode";
 
function Presence(props){
  const location = useLocation()
 
    const student= location.state.studentId
    const internship= location.state.internshipId
    const user = jwtDecode(localStorage.getItem("token"))
    const presenceURL=`http://localhost:4000/internship/getStudentPresence/${student}/${internship}`
    
    console.log(presenceURL)
    const [presences, setPresences] = useState([]);
    const fetchPresence = async () => {
      const res = await axios.get(`${presenceURL}`);
      if(res.data){
        setPresences(res.data.studentPresence)
      }
    }
    useEffect(()=>{
      fetchPresence();
    },[]);
    
 
    
   return ( 
            <>
                <Helmet>
          <title>ConnectU | Student Presence </title>
          <meta name='description' content='Student Presence'/>
         </Helmet>
                  <div className={`${presenceClass.page} container-fluid`}>
                  <div className={presenceClass.section}>
                 
                  <h2 className={presenceClass.h2}>Student Presence </h2>
                </div>
                   <div className= {presenceClass.section}>
                   <NavLink to="/studentProgress"><div className={presenceClass.newResponsible}>
                      <Button content="Cancel" color="white" />
                    </div></NavLink>
                   <div className={`${presenceClass.results}`}>
                  <div>
                  This Internship is ({presences.length}) Days Long
                  </div>
                  <div>
                  { presences.length!= 0 ? `${((presences.filter(p => p.is_present === true).length / presences.length) * 100).toFixed(2)}% of attendance so far` : "0% of attendance so far"}
                  </div>
                  
         
              </div>
                    {
                      user.userType == "supervisor" && (
                        <div className={presenceClass.newResponsible}>
                        <Button content="Mark Student Presence" color="black" dataBsToggle="modal" dataBsTarget="#presences"/>
                      </div>
                      )
                    }
                    <CreateOneDataRecord table="Presences" id="presences" student={student} supervisor={user._id} endingDate={location.state.endingDate} startingDate={new Date(location.state.startingDate)} internshipId={location.state.internshipId}/>
                    
               
               
          <div className={presenceClass.database}>
          <table className={`table  table-borderless `} >
        <thead>
          <tr>
            <th >Day </th>
            <th >Presence</th>
          </tr>
        </thead>
        <tbody>
        {
      Object.values(presences).map(presence => (
        
        <OneDataSet 
        day={presence.day}
        present={presence.is_present}
        length={Object.keys(presence).length}
        table = "Presences"

        />
      ))
    }
       
        </tbody>
        
      </table>
          </div>
             
      </div>
      
      </div>
      </>
              
      
  
   )
}
export default Presence




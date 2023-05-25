import tableClass from '../../Styles/partials/DatabaseTables/UniversityTable.module.css'
import OneUniversity from './oneUniversity'
import { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';



function OnePresence (props){
    const changDateFormat = (d) => {
        let date = new Date(Date.UTC(
          parseInt(d.substring(0, 4)),  
          parseInt(d.substring(5, 7)) - 1,  
          parseInt(d.substring(8, 10)),  
          parseInt(d.substring(11, 13)), 
          parseInt(d.substring(14, 16)), 
          parseInt(d.substring(17, 19)), 
          parseInt(d.substring(20, 23))  
        ));
      
        date = date.toUTCString();
      
        const year = date.substring(12, 16);
        const month = date.substring(8, 11);
        const day = date.substring(5, 7);
      
        
      
      
        return `${year}/${month}/${day}`;
      };
    
 return  ( 
  <tr>
 
    
    <td>{changDateFormat(props.day)}</td>
    <td>{props.present == true ? "Yes" : "No"}</td>
   
    
  
  
</tr>

 

)
}

export default OnePresence
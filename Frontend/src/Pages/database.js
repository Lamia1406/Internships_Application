import React,{useState , useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import databaseClass from '../Styles/database.module.css';
import { Helmet } from 'react-helmet';
import axios from 'axios'
import DatabaseTable from '../partials/Database/databaseTable';
function Database()
  {
    const allDatabaseURL="http://localhost:4000/university/allDatabase"
    const [universities, setUniversities] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [companies, setCompanies] = useState([]);
    const fetchDatabase = async () => {
      const res = await axios.get(`${allDatabaseURL}`);
      if(res.data){
        setUniversities(res.data.universities)
        setFaculties(res.data.faculties)
        setDepartments(res.data.departments)
        setCompanies(res.data.companies)

      }
    }
  
    useEffect(()=>{
      fetchDatabase();
    },[]);
  
   
    return (
     <>
      <Helmet>
      <title>ConnectU | Database</title>
      <meta name='description' content='Database'/>
     </Helmet>
        <div className={`${databaseClass.page} container-fluid`}>
          <div className={databaseClass.section}>
            <h2 className={databaseClass.h2}>Database</h2>
          </div>
          <div  className={`${databaseClass.section}`}>
            {
              universities && (
                <DatabaseTable table= "Universities" header = "university" collapse="uni" data={universities}/>
              )
            }
        {
           faculties && (
            <DatabaseTable table= "Faculties" header = "faculty" collapse="fac" data={faculties} universities={universities}/>
           
          )
        }
        {
           departments && (
            <DatabaseTable table= "Departments" header = "department" collapse="dep" data={departments} faculties= {faculties}/>
           
          )
        }
        {
           companies && (
            <DatabaseTable table= "Companies" header = "company" collapse="comp" data={companies}/> 
           
          )
        }

       
          </div>
         
</div>
</>
    )
}
export default Database 
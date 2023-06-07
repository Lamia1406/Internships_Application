import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import databaseClass from '../Styles/main/database.module.css';
import axios from 'axios'
import DatabaseTable from '../partials/Database/databaseTable';
import Layout from '../features/Layout';
function Database() {
  const allDatabaseURL = "http://localhost:4000/university/allDatabase"
  const [universities, setUniversities] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [companies, setCompanies] = useState([]);
  const fetchDatabase = async () => {
    const res = await axios.get(`${allDatabaseURL}`);
    if (res.data) {
      setUniversities(res.data.universities)
      setFaculties(res.data.faculties)
      setDepartments(res.data.departments)
      setCompanies(res.data.companies)

    }
  }

  useEffect(() => {
    fetchDatabase();
  }, []);


  return (

    <Layout pageTitle="Database" header="Database" content={
      <div className={`${databaseClass.section}`}>
        {
          universities && (
            <DatabaseTable table="Universities" header="university" collapse="uni" data={universities} />
          )
        }
        {
          faculties && (
            <DatabaseTable table="Faculties" header="faculty" collapse="fac" data={faculties} universities={universities} />

          )
        }
        {
          departments && (
            <DatabaseTable table="Departments" header="department" collapse="dep" data={departments} faculties={faculties} />

          )
        }
        {
          companies && (
            <DatabaseTable table="Companies" header="company" collapse="comp" data={companies} />

          )
        }
      </div>
    } />
  )
}
export default Database 
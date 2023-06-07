import tableClass from '../../Styles/partials/Database/databaseTable.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '../button';
import OneDataSet from './oneDataSet';
import CreateOneDataRecord from './createOneDataRecord';
function DatabaseTable(props) {
  return (
  <div className={tableClass.oneTable}>
     <div className={tableClass.newRecord}>
            {
              props.table === "Universities" ? <Button content="Create University" color="black" dataBsToggle="modal" dataBsTarget="#createUni" />
                :
                props.table === "Faculties" ? <Button content="Create Faculty" color="black" dataBsToggle="modal" dataBsTarget="#createFac" />
                  :
                  props.table === "Departments" ? <Button content="Create Department" color="black" dataBsToggle="modal" dataBsTarget="#createDep" />
                    :
                    props.table === "Companies" ? <Button content="Create Company" color="black" dataBsToggle="modal" dataBsTarget="#createComp" />

                      : ""
            }
            <CreateOneDataRecord table={props.table} id={

              props.table === "Universities" ? "createUni"
                :
                props.table === "Faculties" ? "createFac"
                  :
                  props.table === "Departments" ? "createDep"
                    :
                    props.table === "Companies" ? "createComp"
                      : ""

            }
              universities={
                props.table === "Faculties" ? props.universities : null
              }
              faculties={
                props.table === "Departments" ? props.faculties : null
              }
            />
            
          </div>
    <div className={`accordion-item`}>
    <button className={`collapsed text-center ${tableClass.btn}`} id={props.header} type="button" data-bs-toggle="collapse" data-bs-target={`#${props.collapse}`} aria-expanded="true" aria-controls={props.collapse}>
      <div className={tableClass.name}> {props.table}({props.data.length})</div>
    </button>
    <div id={props.collapse} className={`accordion-collapse collapse`} aria-labelledby={props.header} data-bs-parent="#accordionparent">
      <div className={`accordion-body`}>
        <div className={tableClass.database}>
         
          <table className={`table  table-borderless `} >
            <thead>
              <tr>
               
                  <th>
                    {
                      props.table === "Universities" ? "University Name"
                        :
                        props.table === "Faculties" ? "Faculty Name"
                          :
                          props.table === "Departments" ? "Department Name"
                            :
                            props.table === "Companies" ? "Company Name"
                              : ""
                    }
                  </th>

               
                {
                  (props.table === "Universities" || props.table === "Faculties" || props.table == "Companies") && (
                    <th>
                      Address
                    </th>
                  )
                }
                {
                  props.table === "Faculties" && (
                    <th>
                      Belongs to University
                    </th>
                  )
                }
                {
                  props.table === "Departments" && (
                    <th>
                      Belongs to Faculty
                    </th>
                  )
                }
              </tr>
            </thead>
            <tbody>
              {
                props.data && props.data.map(data => (
                  <OneDataSet
                  table={props.table}
                  length= {Object.keys(data).length}
                    full_name={data.full_name}
                    id={data._id}
                    {...(props.table === "Universities" || props.table === "Faculties" || props.table == "Companies" ? { address: data.address } : {})}
                    {...(props.table === "Faculties" && data.university ? { university: data.university.full_name } : {})}
                    {...(props.table === "Departments" && data.faculty ? { faculty: data.faculty.full_name } : {})}
                    {...(props.table === "Faculties" && data.university ? { universities: props.data } : {})}

                  />
                ))
              }
            </tbody>

          </table>
        </div>
      </div>

    </div>
  </div>
  </div>
  )
}

export default DatabaseTable
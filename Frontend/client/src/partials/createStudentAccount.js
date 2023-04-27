import createStudentClass from '../Styles/partials/createStudentAccount.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Input from './input';
import Button from '../partials/button'
function CreateStudentAccount(props)
{
return (
    <div className={`modal fade `} id={props.modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className={`modal-dialog modal-dialog-centered modal-lg `}>
        <div className={`modal-content ${createStudentClass.main}`}>
        <button type="button" className={`btn-close ${createStudentClass.close}`} data-bs-dismiss="modal"aria-label="Close"></button>
        <div className={createStudentClass.body}>
           <div className={createStudentClass.information}>
           <div className={` ${createStudentClass.profilDetails}`}>
            <div className={`${createStudentClass.title}`}>Full Name</div>
            <div className={`${createStudentClass.description}`}>
                <Input placeholder="fill this input" />
            </div>
            </div>
           <div className={` ${createStudentClass.profilDetails}`}>
            <div className={`${createStudentClass.title}`}>Email</div>
            <div className={`${createStudentClass.description}`}>
                <Input placeholder="fill this input" />
            </div>
            </div>
           <div className={` ${createStudentClass.profilDetails}`}>
            <div className={`${createStudentClass.title}`}>Phone Number</div>
            <div className={`${createStudentClass.description}`}>
                <Input placeholder="fill this input" />
            </div>
            </div>
           <div className={` ${createStudentClass.profilDetails}`}>
            <div className={`${createStudentClass.title}`}>Student Card Number</div>
            <div className={`${createStudentClass.description}`}>
                <Input placeholder="fill this input" />
            </div>
            </div>
           <div className={` ${createStudentClass.profilDetails}`}>
            <div className={`${createStudentClass.title}`}>Social Security Number</div>
            <div className={`${createStudentClass.description}`}>
                <Input placeholder="fill this input" />
            </div>
            </div>
           <div className={` ${createStudentClass.profilDetails}`}>
            <div className={`${createStudentClass.title}`}>Department</div>
            <div className={`${createStudentClass.description}`}>
                <Input placeholder="fill this input" />
            </div>
            </div>
           <div className={` ${createStudentClass.profilDetails}`}>
            <div className={`${createStudentClass.title}`}>Study Level</div>
            <div className={`${createStudentClass.description}`}>
                <Input placeholder="fill this input" />
            </div>
            </div>
          
           </div>
           <div className={createStudentClass.inputDiv} >
            <div className={createStudentClass.navigationBtn}>
                <Button content="Validate" color="dark"/>
            </div>
            <div className={createStudentClass.navigationBtn}>
                <Button content="Cancel" color="white"/>
            </div>
      </div>
          </div>
         
        </div>
        
      </div>
       
    
    </div>
)
}
export default CreateStudentAccount
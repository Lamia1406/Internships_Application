import createDepAccountClass from '../Styles/partials/createDepResAccount.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Input from './input';
import Button from '../partials/button'
function CreateDepartmentResponsibleAccount(props)
{
return (
    <div className={`modal fade `} id={props.modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className={`modal-dialog modal-dialog-centered modal-lg `}>
        <div className={`modal-content ${createDepAccountClass.main}`}>
        <button type="button" className={`btn-close ${createDepAccountClass.close}`} data-bs-dismiss="modal"aria-label="Close"></button>
        <div className={createDepAccountClass.body}>
           <div className={createDepAccountClass.information}>
           <div className={` ${createDepAccountClass.profilDetails}`}>
            <div className={`${createDepAccountClass.title}`}>Full Name</div>
            <div className={`${createDepAccountClass.description}`}>
                <Input placeholder="fill this input" />
            </div>
            </div>
           <div className={` ${createDepAccountClass.profilDetails}`}>
            <div className={`${createDepAccountClass.title}`}>Email</div>
            <div className={`${createDepAccountClass.description}`}>
                <Input placeholder="fill this input" />
            </div>
            </div>
           <div className={` ${createDepAccountClass.profilDetails}`}>
            <div className={`${createDepAccountClass.title}`}>Phone Number</div>
            <div className={`${createDepAccountClass.description}`}>
                <Input placeholder="fill this input" />
            </div>
            </div>
           <div className={` ${createDepAccountClass.profilDetails}`}>
            <div className={`${createDepAccountClass.title}`}>Fax Number</div>
            <div className={`${createDepAccountClass.description}`}>
                <Input placeholder="fill this input" />
            </div>
            </div>
           <div className={` ${createDepAccountClass.profilDetails}`}>
            <div className={`${createDepAccountClass.title}`}>Department</div>
            <div className={`${createDepAccountClass.description}`}>
                <Input placeholder="fill this input" />
            </div>
            </div>
           <div className={` ${createDepAccountClass.profilDetails}`}>
            <div className={`${createDepAccountClass.title}`}>Faculty</div>
            <div className={`${createDepAccountClass.description}`}>
                <Input placeholder="fill this input" />
            </div>
            </div>
          
           </div>
           <div className={createDepAccountClass.inputDiv} >
            <div className={createDepAccountClass.navigationBtn}>
                <Button content="Validate" color="dark"/>
            </div>
            <div className={createDepAccountClass.navigationBtn}>
                <Button content="Cancel" color="white"/>
            </div>
      </div>
          </div>
         
        </div>
        
      </div>
       
    
    </div>
)
}
export default CreateDepartmentResponsibleAccount
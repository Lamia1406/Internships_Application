import createAccount from '../Styles/partials/createSupervisorAccount.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Input from './input';
import Button from '../partials/button'
function CreateSupervisorAccount(props)
{
return (
    <div className={`modal fade `} id={props.modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className={`modal-dialog modal-dialog-centered modal-lg `}>
        <div className={`modal-content ${createAccount.main}`}>
        <button type="button" className={`btn-close ${createAccount.close}`} data-bs-dismiss="modal"aria-label="Close"></button>
        <div className={createAccount.body}>
           <div className={createAccount.information}>
           <div className={` ${createAccount.profilDetails}`}>
            <div className={`${createAccount.title}`}>Full Name</div>
            <div className={`${createAccount.description}`}>
                <Input placeholder="fill this input" />
            </div>
            </div>
           <div className={` ${createAccount.profilDetails}`}>
            <div className={`${createAccount.title}`}>Email</div>
            <div className={`${createAccount.description}`}>
                <Input placeholder="fill this input" />
            </div>
            </div>
           <div className={` ${createAccount.profilDetails}`}>
            <div className={`${createAccount.title}`}>Company</div>
            <div className={`${createAccount.description}`}>
                <Input placeholder="fill this input" />
            </div>
            </div>
           <div className={` ${createAccount.profilDetails}`}>
            <div className={`${createAccount.title}`}>Company Address</div>
            <div className={`${createAccount.description}`}>
                <Input placeholder="fill this input" />
            </div>
            </div>
           
          
          
           </div>
           <div className={createAccount.inputDiv} >
            <div className={createAccount.navigationBtn}>
                <Button content="Validate" color="dark"/>
            </div>
            <div className={createAccount.navigationBtn}>
                <Button content="Cancel" color="white"/>
            </div>
      </div>
          </div>
         
        </div>
        
      </div>
       
    
    </div>
)
}
export default CreateSupervisorAccount
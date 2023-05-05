import historyClass from '../Styles/partials/studentHistory.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
function StudentHistory(props)
{
return (
    <div className={`modal fade `} id={props.modalId} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className={`modal-dialog modal-dialog-centered modal-lg `}>
        <div className={`modal-content ${historyClass.main}`}>
        <button type="button" className={`btn-close ${historyClass.close}`} data-bs-dismiss="modal"aria-label="Close"></button>
        <div className={historyClass.body}>
        kdjfkdjh
          </div>
         
        </div>
        
      </div>
       
    
    </div>
)
}
export default StudentHistory
import notAvailableClass from "../Styles/partials/notAvailable.module.css"
import notAvailable from '../Images/not_available.svg' 
function NotAvailable (props){
    return (
        <div className={notAvailableClass.main}>
            {
                props.warning  && (
                    <img src={notAvailable} className={notAvailableClass.notAvailableImg}/>
                )
            }
             <div className={notAvailableClass.message}> {props.message}</div>
        </div>
    )
}
export default NotAvailable
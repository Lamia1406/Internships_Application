import 'bootstrap/dist/css/bootstrap.min.css';
import dayClass from '../../Styles/partials/DatabasePartials/oneDayNotification.module.css'
function OneDayNotification (props){
    
    return (
        <fieldset className={`${dayClass.connection}`}>
        <legend  className="float-none w-auto">{props.date}</legend>
        <div className={`row row-cols-lg-2 ${dayClass.notifications}`}>
              {props.notifications}
              
        </div>
  </fieldset>
    )
}
export default OneDayNotification
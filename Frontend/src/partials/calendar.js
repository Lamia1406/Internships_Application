import Calendar from 'react-calendar';
import requestClass from '../Styles/partials/calendar.module.css'
function CalendarDiv(props) {
    return (
        <div className="modal fade" id={props.id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className={`modal-content ${requestClass.calendarDiv}`}>
                    <div className={`modal-body `}>
                        <Calendar onChange = {props.onChange} className={requestClass.calendar} calendarType='Arabic' minDate={props.minDate} maxDate = {props.maxDate} value={props.value} />
                        <button className={requestClass.chosenDateBtn} data-bs-target = {props.footer ? `#${props.footer}` :null } data-bs-toggle = {props.footer ?  "modal"  :null } data-bs-dismiss = {!props.footer ?  "modal"  :null } > Submit</button>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default CalendarDiv
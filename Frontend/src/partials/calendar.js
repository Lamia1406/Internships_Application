import Calendar from 'react-calendar';
import requestClass from '../Styles/partials/calendar.module.css'
function CalendarDiv(props) {
    return (
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className={`modal-content ${requestClass.calendarDiv}`}>
                    <div className={`modal-body `}>
                        <Calendar onChange = {props.onChange} className={requestClass.calendar} calendarType='Arabic' minDate={props.startingDate} maxDate = {props.endingDate} value={props.startingDate} />
                        <button className={requestClass.chosenDateBtn} data-bs-dismiss="modal" > Submit</button>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default CalendarDiv
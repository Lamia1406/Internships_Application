import oneNotificationClass from '../../Styles/partials/DatabasePartials/oneNotification.module.css'
import Bell from '../../Images/bell.svg';

function OneNotification(props)
{
    return (
        <div className={`col`}>
              <div className={`${oneNotificationClass.oneNotification}`}>
                     <img src={Bell}/>
                      <div className={oneNotificationClass.notif}>{props.notif}</div>
                      {
                        props.time && (
                            <small className={oneNotificationClass.time}>{props.time}</small>
                        )
                      }
                      </div>
                     </div>
    )
}
export default OneNotification
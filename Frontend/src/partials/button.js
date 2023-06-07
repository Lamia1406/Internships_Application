import buttonClass from '../Styles/partials/button.module.css'
function Button(props){
    const displayIcon =() =>{
        return props.icon ? `${buttonClass.icon}` : `${buttonClass.displayIcon}`
    }
    const flex = () => {
        return props.icon ? `${buttonClass.flexContent}` : ""
    }
    const btnColor = () => {
        if (props.color === 'dark') {
            return buttonClass.dark;
        } else if (props.color === 'clear') {
            return buttonClass.clear;
        } else if (props.color === 'black') {
            return buttonClass.black;
        } 
        else if(props.color === 'white')
        {
            return buttonClass.white
        }
        else if (props.color ==="signupDark")
        {
            return buttonClass.signupDark
        }
        else if (props.color =="signupLight")
        {
            return buttonClass.signupLight
        }
        else if (props.color =="loginDark")
        {
            return buttonClass.loginDark
        }
        else if (props.color =="loginLight")
        {
            return buttonClass.loginLight
        }
        else if (props.color =="grey")
        {
            return buttonClass.grey
        }
        else if (props.color =="blackColor")
        {
            return buttonClass.blackColor
        }
        else if (props.color =="rejectionClear")
        {
            return buttonClass.rejectionClear
        }
        else if (props.color =="rejectionDark")
        {
            return buttonClass.rejectionDark
        }
    };
    return (
        <button  data-bs-toggle={props.dataBsToggle} data-bs-target={props.dataBsTarget} data-bs-dismiss={props.dataBsDismiss} className={`${btnColor()} ${buttonClass.defBtn} ${flex()} `} src={props.icon} onClick={props.onClick}  onMouseOut={props.onMouseOut}
        type={props.type} value={props.value} disabled={props.disabled}>
            <img className={displayIcon()} src={props.icon} alt='icon'/>{props.content}
            </button>
    );
}
export default Button
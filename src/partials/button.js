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
    };
    return (
        <button className={`${btnColor()} ${buttonClass.defBtn} ${flex()} `}src={props.icon} onClick={props.onClick}>
            <img className={displayIcon()} src={props.icon} alt='icon'/>{props.content}
            </button>
    );
}
export default Button
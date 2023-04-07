import '../Styles/button.css'
function Button(props){
    return (
        <button className={props.className} onClick={props.onClick}><img className='icon' src={props.icon}/>{props.content}</button>
    );
}
export default Button
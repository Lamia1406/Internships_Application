import inputClass from "../Styles/partials/input.module.css";
function Input(props){
    return(
        <input className={`form-control me-4 ${inputClass.input}`} type={props.type} placeholder={props.placeholder} aria-label="Search"  value ={props.value} onChange={props.onChange} disabled={props.disabled}/>      
    );
}
export default Input;
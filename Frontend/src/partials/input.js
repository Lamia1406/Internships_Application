import inputClass from "../Styles/partials/input.module.css";
function Input(props){
    return(
        <input className={`form-control me-4 ${inputClass.input}`} type="search" placeholder={props.placeholder} aria-label="Search" />      
    );
}
export default Input;
import textClass from "../Styles/partials/textarea.module.css"
function TextArea(props){
    return(
        <textarea className={`form-control ${textClass.textarea}`}    type="text" maxLength={props.maxLength} placeholder={props.placeholder}/>
    );
}
export default TextArea;
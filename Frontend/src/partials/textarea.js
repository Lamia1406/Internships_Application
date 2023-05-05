import textClass from "../Styles/partials/textarea.module.css"
function TextArea(props){
    return(
        <textarea className={`form-control ${textClass.textarea}`}   value={props.value} type="text" maxLength={props.maxLength} placeholder={props.placeholder} onChange={props.onChange}/>
    );
}
export default TextArea;
import  FAQclass from '../Styles/partials/FAQ.module.css'
function FAQ(props){
    return(
  <div className={`accordion-item ${FAQclass.FAQ}`}>
    <h2 className="accordion-header" id={props.header}>
      <button className={`accordion-button collapsed ${FAQclass.btn}`} type="button" data-bs-toggle="collapse" data-bs-target={`#${props.collapse}`} aria-expanded="true" aria-controls={props.collapse}>
       <p className={FAQclass.q}>{props.question}</p>
      </button>
    </h2>
    <div id={props.collapse} className="accordion-collapse collapse" aria-labelledby={props.header} data-bs-parent="#accordionparent">
      <div className="accordion-body">
        <p className={FAQclass.a}>{props.answer}</p>
      </div>
    </div>
  </div>
    );    
}
export default FAQ
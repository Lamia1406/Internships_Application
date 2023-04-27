import TestimonialPic from '../Images/userBig.png'
import testimonialClass from'../Styles/partials/testimonial.module.css'
function Testimonial(props){
   
    return(
        <div className={`${testimonialClass.testimonial} row`}>
            <div className={`col-lg-6 ${testimonialClass.testimonialPic} ${props.orderlg2}`}>
              <img src={TestimonialPic}  alt='user pic'/>
          </div>
             <div className={`col-lg-6  ${props.orderlg1}`}>
             <p className={testimonialClass.bodys}> Testimonial </p>
              <h3 className={testimonialClass.h3}>{props.name}</h3>
              <p className={testimonialClass.p}>“{props.testimonial}”</p>
          </div>
          
        </div>
    )
}
export default Testimonial;
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ApplyImage from '../Images/apply.png';
import Collab from '../Images/collaboration.png';
import '../partials/features';
import Feature1 from '../Images/feature1.png';
import Feature2 from '../Images/feature2.png';
import Feature3 from '../Images/feature3.png';
import Feature4 from '../Images/feature4.png';
import Google from '../Images/google.png'
import Linkedin from '../Images/linkedin.png'
import Microsoft from '../Images/microsoft.png'
import Oracle from '../Images/oracle.png'
import Ibm from '../Images/ibm.png'
import productClass from '../Styles/product.module.css';
import Feature from '../partials/features';
import Button from '../partials/button';
import Testimonial from '../partials/testimonial';
import FAQ from '../partials/FAQ';
import TextArea from '../partials/textarea';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
function Product()
{

  return ( 
  <>
    <Helmet>
    <title>ConnectU | Product</title>
    <meta name='description' content='Product'/>
   </Helmet>
    <div className={`${productClass.page} container-fluid`}>
        <div className={`row ${productClass.section} gx-5`}>
          <div className={`col-lg-7  ${productClass.hero}`}>
             <h1 className={productClass.h1}> Manage your internship with ConnectU </h1>
             <p className={productClass.bodyl}>
We know how daunting it can be to navigate the internship search process,
which is why we created our platform to simplify things for you</p>
             <div className={productClass.applyBtn}>
             <Button color="black" content="Apply Now!" icon={ApplyImage}/>

             </div>
             
          </div>
          
          <div className={`col-lg-5 ${productClass.heroImg}`} >
              <img src={Collab}  alt='hero'/>
          </div>
        </div>
     <div className={productClass.section}>
           <h3 className={productClass.h3}> Our special features!</h3>    
         <div className={`row row-cols-2 ${productClass.featureList}`}>
         <Feature icon={Feature1} title=" Application Management" description="Students can easily manage their internship applications through our app, including submitting applications, tracking their status, and receiving updates about any changes or updates."/>
         <Feature icon={Feature2} title=" Application Submission" description=" With our easy-to-use application form, students can apply for internships directly through our app, saving time and streamlining the application process."/>
        <Feature icon={Feature3} title=" Application Review" description="Throughout the internship, the supervisor tracks and assesses the intern's performance, including attendance and participation, and assigns marks accordingly at the end of the internship"/>
         <Feature icon={Feature4} title=" Progress Tracking" description="Our website allows students to track the progress of their internship applications, from initial submission to final decision, so they always know where they stand in the application process."/>
    </div>
      <div>
      </div>
</div>
     
     <div className={productClass.section}>
          <Testimonial name="Sara T." testimonial="I love this app! It made finding an internship so easy. Thanks, ConnectU"/>         
          <Testimonial name="Michael R." testimonial="ConnectU helped me secure an amazing internship that I wouldn't have found otherwise. Highly recommended!" orderlg1="order-lg-1" orderlg2="order-lg-2"/>         
          <Testimonial name="Lisa K." testimonial="The interface is user-friendly and easy to navigate. Plus, the customer service team was very helpful and responsive."/>         
        </div>
        <div className={productClass.section}>
          <div className='row' >
          <div className={`col-lg-5 ${productClass.testimonialTitle}`}>
          <p className> FAQ </p>
          <h3 className='h3' style={{textAlign:"left"}}>Frequently Asked Questions</h3>
          </div>
          <div className='col-lg-7'>
          <div className="accordion" id="accordionparent">
           <FAQ 
           question="How will I know if my internship application has been accepted or rejected?
"
            answer="You will receive a notification through the app informing you of the status of your internship application. If your application has been accepted, you will receive further instructions on how to proceed. If it has been rejected, you will receive feedback on why your application was not accepted.
            "
            collapse="collapseOne"
            header="headingOne" 
            />
           <FAQ 
           question=" How do I track the progress of my internship application and my internship experience through the app?"

            answer="Once you've submitted your application, you can check the status of your application through the app and receive notifications on any updates or changes to your application status. Additionally, you can track your internship progress through the app and receive feedback from your internship supervisor."
            collapse="collapseTwo"
            header="headingTwo"
            />
            <FAQ question="Can I apply for multiple internships?"
            answer="No, students can only apply for one internship at a time through the application."
            collapse="CollapseThree"
            header="headingThree"
            />
            <FAQ question="How do I communicate with the internship supervisor or department responsible"
            answer="Currently, there is no messaging feature on the website. However, we are continuously working to improve the application and hope to include a messaging feature in future updates. In the meantime, students can contact their internship supervisors or department responsibles through email provided in their profile."
            collapse="collapseFour"
            header="headingFour"
            /> 
            </div>
  </div>
          </div>
          <div className={`row ${productClass.feedback}`}>
          <div className='col-lg-6'>
          <p className={productClass.feedbackTitle}> If you have any further questions or feedback, please do not hesitate to share them with us: </p>
          </div>
          <div className={`col-lg-6 ${productClass.field}`} >
          <TextArea maxLength="500" placeholder="Fill this input"/>
          <div className={productClass.submitDiv}>
          <div className={productClass.submitBtn}>
          <Button color ="dark" content="submit"/>

          </div>
          </div>
          </div>
</div>
        

    
    

      </div>
      <div className={productClass.section}>
         <div className={`row gy-4 ${productClass.brandLogo}`}>
              <div  className={`col-4 ${productClass.brands}`}>
              <img src={Oracle} alt='oracle logo'/>
              </div>
             <div  className={`col-4 ${productClass.brands}`}>
             <img src={Google} alt='google logo'/>
             </div>
             <div className={`col-4 ${productClass.brands}`}> 
             <img src={Linkedin} alt='linkedin logo'/>
             </div>
             <div className={`col-6 ${productClass.brands}`}> 
             <img src={Microsoft} alt='microsoft logo' />
             </div>
             <div className={`col-6 ${productClass.brands}`}> 
             <img src={Ibm} alt='ibm logo'/>
             </div>

</div>
     </div>

    </div></>
  );
}
export default Product;
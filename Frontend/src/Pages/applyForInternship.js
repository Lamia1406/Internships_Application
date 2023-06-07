import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import requestClass from '../Styles/main/applyForInternship.module.css'
import FormSample from '../partials/Forms/FormSample';
import Layout from '../features/Layout';
function ApplyForInternship() {
  return (
    <Layout pageTitle = "Application Form" header = "Internship Application" content ={
      <div className={requestClass.section}>
      <FormSample destination= "/internships" isOffer={false} formType="application" />
       </div>
    }/>
  );
}
export default ApplyForInternship; 
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import requestClass from '../Styles/applyForInternship.module.css'
import FormSample from '../partials/Forms/FormSample';
function ApplyForInternship() {
  return (
    <div className={`${requestClass.page} container-fluid`}>
      <div className={requestClass.main}>
        <div className={requestClass.section}>
          <h2 className={requestClass.pageTitle}>Internship Application</h2>
        </div>
        <div className={requestClass.section}>
         <FormSample destination= "/internships" isOffer={false} formType="application" />
          </div>
        </div>


      </div>

  );
}
export default ApplyForInternship; 
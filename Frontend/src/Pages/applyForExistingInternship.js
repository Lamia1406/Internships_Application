import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import requestClass from '../Styles/applyForInternship.module.css'
import FormSample from '../partials/Forms/FormSample';
import { useLocation } from 'react-router-dom';
function ApplyForExistingInternship(props) {
  const location = useLocation();
  return (
    <div className={`${requestClass.page} container-fluid`}>
      <div className={requestClass.main}>
        <div className={requestClass.section}>
          <h2 className={requestClass.pageTitle}>Internship Application</h2>
        </div>
        <div className={requestClass.section}>
        <FormSample destination= "/internships" isOffer={true} formType="application" company= {location.state.company} post ={location.state.post} />
        </div>


      </div>

    </div>
  );
}
export default ApplyForExistingInternship; 
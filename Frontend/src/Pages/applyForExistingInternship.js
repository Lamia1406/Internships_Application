import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import requestClass from '../Styles/main/applyForInternship.module.css'
import FormSample from '../partials/Forms/FormSample';
import { useLocation } from 'react-router-dom';
import Layout from '../features/Layout'
function ApplyForExistingInternship() {
  const location = useLocation();
  return (
    <Layout pageTitle = "Application Form" header = "Internship Application" content ={   <div className={requestClass.section}>
    <FormSample destination= "/internships" isOffer={true} formType="application" company= {location.state.company} post ={location.state.post} />
    </div>}/>
  );
}
export default ApplyForExistingInternship; 
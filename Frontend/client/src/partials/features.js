import featureClass from '../Styles/partials/feature.module.css';
import React from 'react';
function Feature(props){
    return(
        <div className={`${featureClass.feature} col`}>
        <div className={featureClass.featureIcon}>
          <img src={props.icon} alt='icon'/>
        </div>
        <p className={featureClass.h6}> {props.title}</p>
        <p className={featureClass.p}>{props.description} </p>
        </div>
    );
}
export default Feature;
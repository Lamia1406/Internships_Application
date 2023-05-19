import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import progressbarClass from'../Styles/partials/progress.module.css';
function ProgressBar(props)
{
  const progress = ()=>{
    if (props.width == '0' ){
      return `${progressbarClass.justApplied}`
    }
  }
  return ( 
    <div>
       <div className={progressbarClass.progressDiv}>
       <div className='progress'>
        <div className={progress()} role='progressbar'> </div>
        </div>
       </div>

    </div>
  );
}
export default ProgressBar; 

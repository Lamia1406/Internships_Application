import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import progressbarClass from'../Styles/partials/progress.module.css';
function ProgressBar()
{
  return ( 
    <div>
       <div className={progressbarClass.progressDiv}>
       <div className='progress'>
        <div className={progressbarClass.progressBar} role='progressbar'> </div>
        </div>
       </div>

    </div>
  );
}
export default ProgressBar; 

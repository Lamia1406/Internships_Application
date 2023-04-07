import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import '../Styles/progress.css';
function ProgressBar()
{
  return ( 
    <div>
       <div className='progress-div'>
       <div className='progress'>
        <div className='progress-bar' role='progressbar' style={{width:'50%'}}> </div>
        </div>
       </div>

    </div>
  );
}
export default ProgressBar; 

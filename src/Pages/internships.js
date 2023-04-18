import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import internshipsClass from '../Styles/internships.module.css';
import Button from '../partials/button';
import Post1 from '../Images/post1.png';
import Post2 from '../Images/post2.png';
import Post3 from '../Images/post3.png';
import Post4 from '../Images/post4.png';
import Post5 from '../Images/post5.png';
import ArrowR from '../Images/right-arrow.png';
import ArrowL from '../Images/left-arrow.png';
import Sort from '../Images/sort.png';
import Search from "../Images/search.png"

import Internship from '../partials/internship_post';
import Input from '../partials/input.js';

function Internships()
{
   
  return ( 
    <div className={internshipsClass.page}>
<div className={`${internshipsClass.section} row`}>
  <div className={`col-lg-6 ${internshipsClass.left}`}>
  <h3 className={internshipsClass.h3}> Internships</h3>
   <div className={internshipsClass.sorting}>
    <span className={internshipsClass.allPosts}>All Post</span>
    <div className={`dropdown ${internshipsClass.sortBy}`}>
  <button className={`dropdown-toggle ${internshipsClass.sortBtn}`} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
   Sort by Year <img className={internshipsClass.icon} src={Sort} alt='sort icon'/>
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li className={internshipsClass.year}><button classname={`dropdown-item ${internshipsClass.year}`} >Any</button></li>
    <li className='dropdown-divider'></li>
    <li className={internshipsClass.year}><button classname={`dropdown-item `} >2023</button></li>
    <li className={internshipsClass.year}><button classname={`dropdown-item `} >2022</button></li>
    <li className={internshipsClass.year}><button classname={`dropdown-item `} >2020</button></li>
  </ul>
</div>


   </div>
  </div>
  <div className={`col-lg-6 ${internshipsClass.right}`}>
  <form className={`${internshipsClass.inputDiv} d-flex`}>
  <Input placeholder="search by keyword..."/>
  <button className={internshipsClass.searchIcon} type="submit"><img src={Search} alt='search icon' /></button>
  </form>

  </div>

     </div>
<div className={internshipsClass.section}>
        <Internship company="Google" image={Post1} title="Software Engineering Intern
" description="We are seeking a motivated software engineering intern to work on the development of our cutting-edge software products. The ideal candidate will have a strong foundation in software engineering principles and experience with one or more programming languages such as Python, Java, or C++. You will work closely with our team of experienced software engineers to develop new features, fix bugs, and ensure the high quality of our software products.

" published="Published at: March 10, 2023
" />
        <Internship company="Microsoft" image={Post2} title="Marketing Intern
" description="Our marketing team is seeking a talented and creative marketing intern to help with a variety of marketing initiatives. In this role, you will work closely with our marketing team to help execute marketing campaigns, develop content, and conduct market research. The ideal candidate will have excellent communication skills, a strong attention to detail, and a passion for marketing.
" published="Published at: February 28, 2023
" />
        <Internship company="Oracle" image={Post3} title="Data Science Intern
" description="We are looking for a data science intern to join our team and help us build innovative data-driven solutions. The ideal candidate will have experience with data analysis, machine learning, and programming in languages such as Python or R. You will work closely with our team of data scientists to analyze data, develop models, and create data visualizations. 
" published="Published at: January 15, 2023
" />
        <Internship company="Facebook" image={Post4} title="Graphic Design Intern
" description="Our creative team is seeking a talented graphic design intern to help with a variety of design projects. In this role, you will work closely with our team of designers to develop graphics, logos, and marketing materials for our brand. The ideal candidate will have experience with Adobe Creative Suite, excellent design skills, and a strong attention to detail. 
" published="Published at: April 1, 2023
" />
        <Internship company="Linkedin" image={Post5} title="Human Resources Intern
" description="We are seeking a human resources intern to assist with a variety of HR initiatives, including recruitment, onboarding, and employee relations. The ideal candidate will have excellent communication skills, strong organizational skills, and a passion for human resources. You will work closely with our HR team to help create a positive and productive work environment. 
" published="Published at: March 20, 2023
" />
<ul className="pagination justify-content-center">
    <li className="page-item"><button className="page-link" ><img src={ArrowL} alt='arrow icon'/></button></li>
    <li className="page-item"><button className="page-link" >1</button></li>
    <li className="page-item active"><button className="page-link" >2</button></li>
    <li className="page-item"><button className="page-link" >3</button></li>
    <li className="page-item disabled"><span className="page-link" >...</span></li>
    <li className="page-item"><button className="page-link" >12</button></li>
    <li className="page-item"><button className="page-link"><img src={ArrowR} alt='arrow icon'/></button></li>
  </ul>
     </div>
    <div className={`${internshipsClass.section} row ${internshipsClass.newCompany}`}>
          <div className='col-lg-6'>
          <p> Did you contact an unlisted establishment? If yes, please apply here </p>
          </div>
          <div className={`col-lg-2 ${internshipsClass.apply}`} >
          <Button color="dark" content="Apply"/>
  </div>
          </div>
   
    


    </div>
  );
}
export default Internships;
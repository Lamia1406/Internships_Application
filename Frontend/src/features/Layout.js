import { Helmet } from "react-helmet"
import LayoutClass from "../Styles/layout.module.css"
function Layout(props){
    return (
        <>
   <Helmet>
    <title>ConnectU | {props.pageTitle}</title>
    <meta name='description' content={`${props.pageTitle}`}/>
   </Helmet>
     <div className={`${LayoutClass.page} container-fluid`}>
        <div className= {LayoutClass.section}>
        <h2 className={LayoutClass.h2}>
     {props.header}
  </h2>
        </div>
        {props.content}
        </div>

</>
)}
export default Layout
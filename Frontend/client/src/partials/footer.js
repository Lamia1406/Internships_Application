import logo from '../Images/logo.png';
import fax from '../Images/fax.png';
import phone from '../Images/phone.png';
import pin from '../Images/pin.png';
import mail from '../Images/mail.png';
import facebook from '../Images/facebook.png'; 
import twitter from '../Images/twitter.png';
import ntic from '../Images/ntic.png'; 
import footerClass from '../Styles/partials/footer.module.css';

function Footer (){
    return(
        <div className={`row ${footerClass.footer}`}>
     <div className={`${footerClass.slogan} col-lg-5`}>
            <img src={logo} alt='logo'/>
            <p> Effortlessly apply for your dream internship</p>
            <div className={footerClass.socials}>
            <img src={facebook} alt='facebook logo'/>
            <img src={twitter} alt='twitter logo'/>
            <img src={ntic} alt='ntic logo'/>
              </div>
              </div> 
              <div className={`col-lg-2 ${footerClass.footerInfo}`}>
                <p className={footerClass.bodyl}>Product</p>
                <p className={footerClass.bodys}>About</p>
                <p className={footerClass.bodys}>FAQ</p>
                </div>
              <div className={`col-lg-5 ${footerClass.footerInfo}`}>
                <p className={footerClass.bodyl}>Contact</p>
                <p className={footerClass.bodys}><img src={pin}  className={footerClass.contact} alt='icon'/>Université Constantine 2 Abdelhamid Mehri – Nouvelle ville Ali Mendjeli</p>
                <p className={footerClass.bodys}><img src={mail} className={footerClass.contact} alt='icon'/>info@connectu.com</p>
                <p className={footerClass.bodys}><img src={phone} className={footerClass.contact} alt='icon'/>+213123456789</p>
                <p className={footerClass.bodys}><img src={fax} className={footerClass.contact} alt='icon'/>+213123456780</p>
                </div>

     </div>
    
    );
}
export default Footer;
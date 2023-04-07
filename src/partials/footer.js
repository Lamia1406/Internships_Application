import logo from '../Images/logo.png';
import fax from '../Images/fax.png';
import phone from '../Images/phone.png';
import pin from '../Images/pin.png';
import mail from '../Images/mail.png';
import facebook from '../Images/facebook.png'; 
import twitter from '../Images/twitter.png';
import ntic from '../Images/ntic.png'; 
import '../Styles/footer.css';

function Footer (){
    return(
        <div className='row'>
     <div className='slogan col-lg-5'>
            <img src={logo}/>
            <p> Effortlessly apply for your dream internship</p>
            <div className='socials'>
            <img src={facebook}/>
            <img src={twitter}/>
            <img src={ntic}/>
              </div>
              </div> 
              <div className='col-lg-2 product'>
                <p className='bodyl'>Product</p>
                <p className='bodys'>About</p>
                <p className='bodys'>FAQ</p>
                </div>
              <div className='col-lg-5 -us'>
                <p className='bodyl'>Contact</p>
                <p className='bodys'><img src={pin}  className='contact'/>Université Constantine 2 Abdelhamid Mehri – Nouvelle ville Ali Mendjeli</p>
                <p className='bodys'><img src={mail} className='contact'/>info@connectu.com</p>
                <p className='bodys'><img src={phone} className='contact'/>+213123456789</p>
                <p className='bodys'><img src={fax} className='contact'/>+213123456780</p>
                </div>

     </div>
    
    );
}
export default Footer;
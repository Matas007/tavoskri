import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone } from 'react-icons/fa';
import MagnetLines from './MagnetLines';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-magnet-bg">
        <MagnetLines
          rows={8}
          columns={10}
          containerSize="50vmax"
          lineColor="rgba(201, 168, 130, 0.3)"
          lineWidth="2px"
          lineHeight="30px"
          baseAngle={0}
        />
      </div>

      <div className="footer-content">
        <div className="footer-left">
          <Link to="/" className="footer-logo">
            <img src="/Untitled_design__10_-removebg-preview.png" alt="Tavo Skriptas Logo" />
            <span className="footer-logo-text">Tavo Skriptas</span>
          </Link>
        </div>

        <div className="footer-center">
          <a href="mailto:info@tavoskriptas.lt" className="footer-contact-item">
            <FaEnvelope className="footer-contact-icon" />
            <span>info@tavoskriptas.lt</span>
          </a>
          <a href="tel:+37063792154" className="footer-contact-item">
            <FaPhone className="footer-contact-icon" />
            <span>+370 637 92 154</span>
          </a>
        </div>

        <div className="footer-right">
          <a 
            href="https://www.facebook.com/people/Tavo-skriptas/61579459390586/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-social-link"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a 
            href="https://www.instagram.com/tavoskriptas/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-social-link"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a 
            href="https://www.linkedin.com/in/matas-kornelijus-vanagas/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-social-link"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Tavo Skriptas. Visos teisės saugomos.
          {' '}
          <Link to="/privacy" className="footer-policy-link">Slapukų ir privatumo politika</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;


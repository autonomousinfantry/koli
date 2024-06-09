import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Privacy Policy | Terms of Service | Contact: info@koli.com | Phone: +123 456 789</p>
        <div className="social-media">
          <a href="https://facebook.com">Facebook</a>
          <a href="https://twitter.com">Twitter</a>
          <a href="https://instagram.com">Instagram</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

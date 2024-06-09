import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Koli</Link>
      </div>
      <nav className="nav">
        <ul>
          <li><Link to="/pricing">Pricing</Link></li>
          <li><Link to="/testimonials">Testimonials</Link></li>
          <li><Link to="/resources">Resources</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/signin">Sign In</Link></li>
          <li><Link to="/signup" className="signup-btn">Sign Up</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

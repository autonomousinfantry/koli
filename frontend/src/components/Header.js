import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header>
      <div className="logo">Koli</div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/features">Features</Link></li>
          <li><Link to="/how-it-works">How It Works</Link></li>
          <li><Link to="/pricing">Pricing</Link></li>
          <li><Link to="/login">Sign In</Link></li>
          <li><Link to="/register">Sign Up</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

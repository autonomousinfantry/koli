import React from 'react';
import './Pricing.css';

const Pricing = () => {
  return (
    <section className="pricing">
      <h2>Pricing Plans</h2>
      <div className="pricing-plans">
        <div className="plan">
          <h3>Basic</h3>
          <p>$9.99/month</p>
          <ul>
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
          <button className="cta-btn">Sign Up</button>
        </div>
        <div className="plan">
          <h3>Pro</h3>
          <p>$19.99/month</p>
          <ul>
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
          <button className="cta-btn">Sign Up</button>
        </div>
        <div className="plan">
          <h3>Enterprise</h3>
          <p>$49.99/month</p>
          <ul>
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
          <button className="cta-btn">Sign Up</button>
        </div>
      </div>
    </section>
  );
}

export default Pricing;

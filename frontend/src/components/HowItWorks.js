import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <h2>How It Works</h2>
      <div className="steps">
        <div className="step">
          <h3>Step 1</h3>
          <p>Sign up and create an account.</p>
        </div>
        <div className="step">
          <h3>Step 2</h3>
          <p>Upload your video projects.</p>
        </div>
        <div className="step">
          <h3>Step 3</h3>
          <p>Collaborate with your team and get feedback.</p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;

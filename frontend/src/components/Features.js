import React from 'react';
import './Features.css';

const Features = () => {
  return (
    <section className="features">
      <h2>Main Features</h2>
      <div className="feature-list">
        <div className="feature-item">
          <h3>Video Collaboration</h3>
          <p>Work together on video projects with your team seamlessly.</p>
        </div>
        <div className="feature-item">
          <h3>Secure Storage</h3>
          <p>Keep your video files safe with secure cloud storage.</p>
        </div>
        <div className="feature-item">
          <h3>Integration</h3>
          <p>Easily integrate with popular editing tools.</p>
        </div>
      </div>
    </section>
  );
}

export default Features;

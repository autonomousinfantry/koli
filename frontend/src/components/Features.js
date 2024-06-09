import React from 'react';
import './Features.css';

const Features = () => {
  return (
    <div className="features">
      <h2>Özellikler</h2>
      <div className="feature-list">
        <div className="feature-item">
          <h3>Özellik 1</h3>
          <p>Özellik 1 açıklaması</p>
        </div>
        <div className="feature-item">
          <h3>Özellik 2</h3>
          <p>Özellik 2 açıklaması</p>
        </div>
      </div>
    </div>
  );
};

export default Features;

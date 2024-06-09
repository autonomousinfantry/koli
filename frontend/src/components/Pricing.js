import React from 'react';
import './Pricing.css';

const Pricing = () => {
  return (
    <div className="pricing">
      <h2>Fiyatlandırma</h2>
      <div className="pricing-plans">
        <div className="plan">
          <h3>Plan 1</h3>
          <p>Plan 1 açıklaması</p>
          <button>Plan 1'i Seç</button>
        </div>
        <div className="plan">
          <h3>Plan 2</h3>
          <p>Plan 2 açıklaması</p>
          <button>Plan 2'yi Seç</button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

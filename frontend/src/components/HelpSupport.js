import React from 'react';
import './HelpSupport.css';

const HelpSupport = () => {
  return (
    <div className="help-support">
      <h2>Help and Support</h2>
      <p>If you have any questions or need assistance, please contact our support team at support@koli.com.</p>
      <div className="faq">
        <h3>Frequently Asked Questions</h3>
        <ul>
          <li>
            <strong>How do I reset my password?</strong>
            <p>You can reset your password by clicking on the "Forgot Password" link on the sign-in page.</p>
          </li>
          <li>
            <strong>How do I invite team members?</strong>
            <p>You can invite team members from the "Team Management" section in your dashboard.</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HelpSupport;

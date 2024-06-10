import React from 'react';

const HelpPage = () => {
  return (
    <div>
      <h1>Help and Support</h1>
      <h2>Frequently Asked Questions</h2>
      <ul>
        <li>
          <strong>How do I upload a video?</strong>
          <p>You can upload a video by navigating to the Dashboard and using the upload form.</p>
        </li>
        <li>
          <strong>How do I create a project?</strong>
          <p>You can create a project by navigating to the Dashboard and using the create project form.</p>
        </li>
        <li>
          <strong>How do I invite team members?</strong>
          <p>You can invite team members by entering their email addresses in the project settings.</p>
        </li>
      </ul>
      <h2>Contact Support</h2>
      <p>If you need further assistance, please contact our support team.</p>
    </div>
  );
};

export default HelpPage;

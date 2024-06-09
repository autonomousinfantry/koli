import React from 'react';
import './Notifications.css';

const Notifications = () => {
  const notifications = [
    { id: 1, message: 'New comment on your video.' },
    { id: 2, message: 'Project "X" has been updated.' },
  ];

  return (
    <div className="notifications">
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;

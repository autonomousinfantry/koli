import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get('/api/notifications', {
          headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` }
        });
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <ListGroup>
      {notifications.map(notification => (
        <ListGroupItem
          key={notification._id}
          onClick={() => navigate(notification.url)}
        >
          {notification.message}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default Notifications;

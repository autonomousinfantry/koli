import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notifications = ({ userId }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        axios.get(`/api/notifications/${userId}`).then((response) => {
            setNotifications(response.data);
        });
    }, [userId]);

    const markAsRead = (id) => {
        axios.post(`/api/notifications/read/${id}`).then(() => {
            setNotifications(notifications.map(notification => 
                notification._id === id ? { ...notification, read: true } : notification
            ));
        });
    };

    return (
        <div className="notifications">
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification) => (
                    <li key={notification._id} className={notification.read ? 'read' : 'unread'}>
                        <span>{notification.message}</span>
                        <span className="timestamp">{new Date(notification.date).toLocaleString()}</span>
                        {!notification.read && (
                            <button onClick={() => markAsRead(notification._id)}>Mark as Read</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;

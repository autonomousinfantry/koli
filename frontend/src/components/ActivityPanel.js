import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActivityPanel = ({ projectId }) => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        axios.get(`/api/projects/${projectId}/activities`).then((response) => {
            setActivities(response.data);
        });
    }, [projectId]);

    return (
        <div className="activity-panel">
            <h3>Recent Activities</h3>
            <ul>
                {activities.map((activity) => (
                    <li key={activity._id}>
                        <span>{activity.description}</span>
                        <span className="timestamp">{new Date(activity.date).toLocaleString()}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActivityPanel;

import React from 'react';
import axios from 'axios';

const StatusDropdown = ({ projectId, status, setStatus }) => {
    const handleChange = (e) => {
        const newStatus = e.target.value;
        axios.post(`/api/projects/${projectId}/status`, { status: newStatus }).then(() => {
            setStatus(newStatus);
        });
    };

    return (
        <select value={status} onChange={handleChange}>
            <option value="In Progress">In Progress</option>
            <option value="Needs Review">Needs Review</option>
            <option value="Approved">Approved</option>
            <option value="Completed">Completed</option>
        </select>
    );
};

export default StatusDropdown;

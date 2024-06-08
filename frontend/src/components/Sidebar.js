import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Menu</h2>
            <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/projects">Projects</Link></li>
                <li><Link to="/teams">Teams</Link></li>
                <li><Link to="/notifications">Notifications</Link></li>
                <li><Link to="/settings">Settings</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;

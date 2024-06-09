import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectList.css';

const ProjectList = () => {
  return (
    <div className="project-list">
      <h2>Your Projects</h2>
      <ul>
        <li><Link to="/project/1">Project 1</Link></li>
        <li><Link to="/project/2">Project 2</Link></li>
      </ul>
      <button className="new-project-btn">Create New Project</button>
    </div>
  );
}

export default ProjectList;

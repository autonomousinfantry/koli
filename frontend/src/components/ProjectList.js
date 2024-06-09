import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProjectList.css';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/projects', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(response.data);
    };

    fetchProjects();
  }, []);

  return (
    <div className="project-list">
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;

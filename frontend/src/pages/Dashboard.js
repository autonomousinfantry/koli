import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ProjectDetails from '../components/ProjectDetails';
import ProjectSearch from '../components/ProjectSearch';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        axios.get('/api/projects').then((response) => {
            setProjects(response.data);
        });
    }, []);

    const selectProject = (project) => {
        setSelectedProject(project);
    };

    return (
        <div className="dashboard">
            <Header />
            <div className="content">
                <Sidebar projects={projects} selectProject={selectProject} />
                <main>
                    <ProjectSearch setProjects={setProjects} />
                    {selectedProject ? (
                        <ProjectDetails project={selectedProject} />
                    ) : (
                        <p>Select a project to view details</p>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;

import React from 'react';
import Sidebar from './Sidebar';
import ProjectList from './ProjectList';
import FileUpload from './FileUpload';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <h1>Dashboard</h1>
        <ProjectList />
        <FileUpload />
      </div>
    </div>
  );
}

export default Dashboard;

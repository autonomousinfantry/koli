import React from 'react';
import { useParams } from 'react-router-dom';
import FileUpload from './FileUpload';
import './ProjectDetails.css';

const ProjectDetails = () => {
  const { projectId } = useParams();

  return (
    <div className="project-details">
      <h2>Project {projectId}</h2>
      <FileUpload />
      <div className="file-list">
        {/* Dummy file list */}
        <ul>
          <li>Video1.mp4</li>
          <li>Video2.mp4</li>
        </ul>
      </div>
    </div>
  );
}

export default ProjectDetails;

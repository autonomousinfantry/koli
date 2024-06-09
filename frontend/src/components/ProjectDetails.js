import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProjectDetails.css';
import VideoReview from './VideoReview';
import ShareVideo from './ShareVideo';
import FileVersioning from './FileVersioning';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProject(response.data);
    };

    fetchProject();
  }, [projectId]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="project-details">
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      {project.videos.map((video) => (
        <div key={video._id} className="video-section">
          <h3>{video.name}</h3>
          <VideoReview videoId={video._id} />
          <ShareVideo videoId={video._id} />
          <FileVersioning fileId={video._id} />
        </div>
      ))}
    </div>
  );
};

export default ProjectDetails;

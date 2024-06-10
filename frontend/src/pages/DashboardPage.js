import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Form } from 'react-bootstrap';
import CommentList from '../components/CommentList';
import Notifications from '../components/Notifications';
import SearchBar from '../components/SearchBar';
import VersionList from '../components/VersionList';
import ShareProject from '../components/ShareProject';
import TaskList from '../components/TaskList';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackList from '../components/FeedbackList';
import FileUpload from '../components/FileUpload';
import ContextMenu, { showContextMenu } from '../components/ContextMenu';
import VideoPlayerWithComments from '../components/VideoPlayerWithComments';
import VideoVersionComparison from '../components/VideoVersionComparison';

const DashboardPage = () => {
  const [videos, setVideos] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [versionName, setVersionName] = useState('');
  const [versionFile, setVersionFile] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get('/api/projects', {
          headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` }
        });
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    const fetchVideos = async () => {
      try {
        const { data } = await axios.get('/api/videos', {
          headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` }
        });
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchProjects();
    fetchVideos();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/api/projects', { name: projectName }, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` }
      });

      setProjects([...projects, data]);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleUploadVersion = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('video', versionFile);

    try {
      const { data } = await axios.post('/api/versions', {
        name: versionName,
        url: URL.createObjectURL(versionFile),
        videoId: selectedVideo,
      }, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}` }
      });

      setVideos(videos.map(video => video._id === selectedVideo ? { ...video, versions: [...video.versions, data] } : video));
      setVersionName('');
      setVersionFile(null);
    } catch (error) {
      console.error('Error uploading video version:', error);
    }
  };

  return (
    <Container onContextMenu={showContextMenu}>
      <h1>Dashboard</h1>
      <FileUpload setVideos={setVideos} />
      <Form onSubmit={handleCreateProject}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Create Project</Button>
      </Form>
      <Notifications />
      <SearchBar setSearchResults={setSearchResults} />
      {searchResults.length > 0 && (
        <div>
          <h2>Search Results</h2>
          {searchResults.map(video => (
            <div key={video._id}>
              <VideoPlayerWithComments video={video} />
              {selectedVideo === video._id && <CommentList videoId={video._id} />}
            </div>
          ))}
        </div>
      )}
      <h2>Projects</h2>
      {projects.map(project => (
        <div key={project._id}>
          <h3>{project.name}</h3>
          <ShareProject projectId={project._id} />
          <TaskList projectId={project._id} />
          <FeedbackForm projectId={project._id} />
          <FeedbackList projectId={project._id} />
          {project.videos.map(video => (
            <div key={video._id}>
              <VideoPlayerWithComments video={video} />
              {selectedVideo === video._id && <CommentList videoId={video._id} />}
              {selectedVideo === video._id && <VersionList videoId={video._id} />}
              <VideoVersionComparison versions={video.versions} />
            </div>
          ))}
        </div>
      ))}
      <h2>Videos</h2>
      {videos.map(video => (
        <div key={video._id}>
          <VideoPlayerWithComments video={video} />
          {selectedVideo === video._id && <CommentList videoId={video._id} />}
          {selectedVideo === video._id && <VersionList videoId={video._id} />}
          <Form onSubmit={handleUploadVersion}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Version Name"
                value={versionName}
                onChange={(e) => setVersionName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.File
                label="Upload Version"
                accept="video/mp4"
                onChange={(e) => setVersionFile(e.target.files[0])}
              />
            </Form.Group>
            <Button type="submit">Upload Version</Button>
          </Form>
        </div>
      ))}
      <ContextMenu
        onNewFolder={() => console.log('New Folder')}
        onNewPrivateFolder={() => console.log('New Private Folder')}
        onDownloadAll={() => console.log('Download All')}
        onRecentlyDeleted={() => console.log('Recently Deleted')}
        onProjectSettings={() => console.log('Project Settings')}
        onShare={() => console.log('Share')}
        onRename={() => console.log('Rename')}
        onMoveTo={() => console.log('Move to...')}
        onCopyTo={() => console.log('Copy to...')}
        onDuplicate={() => console.log('Duplicate')}
        onMakePrivate={() => console.log('Make Private')}
        onDownload={() => console.log('Download')}
        onDelete={() => console.log('Delete')}
      />
    </Container>
  );
};

export default DashboardPage;

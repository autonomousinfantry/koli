import React, { useState, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';
import StatusDropdown from './StatusDropdown';
import FileUpload from './FileUpload';
import FileList from './FileList';
import VideoPlayer from './VideoPlayer';
const Comments = lazy(() => import('./Comments'));
const ShareVideo = lazy(() => import('./ShareVideo'));
const Team = lazy(() => import('./Team'));
const ActivityPanel = lazy(() => import('./ActivityPanel'));

const ProjectDetails = ({ project }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        axios.get(`/api/files/${project._id}`).then((response) => {
            setSelectedFile(response.data[0]);
        });
    }, [project._id]);

    return (
        <div className="project-details">
            <h2>{project.name}</h2>
            <StatusDropdown projectId={project._id} />
            <FileUpload projectId={project._id} />
            <div className="main-content">
                <FileList projectId={project._id} onSelectFile={setSelectedFile} />
                {selectedFile && (
                    <>
                        <VideoPlayer file={selectedFile} />
                        <Suspense fallback={<div>Loading...</div>}>
                            <Comments fileId={selectedFile._id} />
                        </Suspense>
                    </>
                )}
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <ShareVideo projectId={project._id} />
                <Team projectId={project._id} />
                <ActivityPanel projectId={project._id} />
            </Suspense>
        </div>
    );
};

export default ProjectDetails;

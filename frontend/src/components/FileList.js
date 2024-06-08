import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileList = ({ projectId, onSelectFile }) => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        axios.get(`/api/files/${projectId}`).then((response) => {
            setFiles(response.data);
        });
    }, [projectId]);

    return (
        <div className="file-list">
            <h2>Files</h2>
            <div className="file-grid">
                {files.map((file) => (
                    <div key={file._id} className="file-item" onClick={() => onSelectFile(file)}>
                        <img src={file.thumbnailUrl} alt={file.name} />
                        <span>{file.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileList;

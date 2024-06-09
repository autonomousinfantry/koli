import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FileList.css';

const FileList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios.get('/api/files')
      .then(response => setFiles(response.data))
      .catch(error => console.error('Error fetching files:', error));
  }, []);

  return (
    <div className="file-list">
      <h3>Files</h3>
      <ul>
        {files.map(file => (
          <li key={file._id}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;

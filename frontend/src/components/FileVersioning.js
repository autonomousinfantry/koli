import React, { useState } from 'react';
import axios from 'axios';
import './FileVersioning.css';

const FileVersioning = ({ fileId }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadVersion = async () => {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('token');

    try {
      await axios.post(`http://localhost:5000/files/version/${fileId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File version uploaded successfully');
    } catch (error) {
      console.error('Error uploading file version:', error);
    }
  };

  return (
    <div className="file-versioning">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUploadVersion}>Upload New Version</button>
    </div>
  );
};

export default FileVersioning;

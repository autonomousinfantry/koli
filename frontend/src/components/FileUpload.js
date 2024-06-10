import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ setVideos }) => {
  const [files, setFiles] = useState([]);
  const [token, setToken] = useState('');

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  // useEffect ile token'ı alıyoruz
  React.useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.post('/api/users/login', { email: 'your-email@example.com', password: 'your-password' }); // Kendi kullanıcı bilgilerinizi kullanın
        setToken(response.data.token);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('video', file);
    });

    try {
      const { data } = await axios.post('/api/videos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setVideos(videos => [...videos, ...data]);
      setFiles([]);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;

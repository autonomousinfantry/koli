import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VersionList = ({ videoId }) => {
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    const fetchVersions = async () => {
      const { data } = await axios.get(`/api/versions/${videoId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('userInfo').token}` }
      });
      setVersions(data);
    };

    fetchVersions();
  }, [videoId]);

  return (
    <div>
      <h3>Versions</h3>
      {versions.map(version => (
        <div key={version._id}>
          <p>Version {version.versionNumber}: {version.name}</p>
          <video src={version.url} controls width="300" />
        </div>
      ))}
    </div>
  );
};

export default VersionList;

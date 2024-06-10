import React, { useState } from 'react';
import axios from 'axios';

const ShareProject = ({ projectId }) => {
  const [email, setEmail] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const handleShare = async (e) => {
    e.preventDefault();
    await axios.put('/api/projects/share', { projectId, userEmail: email }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('userInfo').token}` }
    });
    setEmail('');
  };

  const handlePublicToggle = async () => {
    await axios.put('/api/projects/share', { projectId, isPublic: !isPublic }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('userInfo').token}` }
    });
    setIsPublic(!isPublic);
  };

  return (
    <div>
      <form onSubmit={handleShare}>
        <input
          type="email"
          placeholder="User Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Share Project</button>
      </form>
      <button onClick={handlePublicToggle}>
        {isPublic ? 'Make Private' : 'Make Public'}
      </button>
    </div>
  );
};

export default ShareProject;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VideoSharePage = ({ match }) => {
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const { data } = await axios.get(`/api/videos/public/${match.params.videoId}`);
      setVideo(data);
    };

    fetchVideo();
  }, [match.params.videoId]);

  return (
    <div>
      {video ? (
        <div>
          <h1>{video.name}</h1>
          <video src={video.url} controls width="600" />
        </div>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default VideoSharePage;

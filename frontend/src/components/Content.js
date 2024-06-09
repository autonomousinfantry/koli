import React from 'react';
import VideoPlayer from './VideoPlayer';
import CommentSection from './CommentSection';
import './Content.css';

const Content = () => {
  return (
    <div className="content">
      <VideoPlayer videoId="sample-video" />
      <CommentSection videoId="sample-video" />
    </div>
  );
};

export default Content;

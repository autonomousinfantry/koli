import React, { useRef } from 'react';

const VideoPlayer = ({ file }) => {
    const videoRef = useRef(null);

    return (
        <div className="video-player">
            <video ref={videoRef} controls>
                <source src={file.url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoPlayer;

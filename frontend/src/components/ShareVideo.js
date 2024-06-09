import React, { useState } from 'react';

const ShareVideo = ({ projectId }) => {
    const [link, setLink] = useState('');

    const handleShare = () => {
        const shareLink = `${window.location.origin}/share/${projectId}`;
        setLink(shareLink);
    };

    return (
        <div className="share-video">
            <button onClick={handleShare}>Share Video</button>
            {link && (
                <div>
                    <p>Share this link:</p>
                    <input type="text" value={link} readOnly />
                </div>
            )}
        </div>
    );
};

export default ShareVideo;

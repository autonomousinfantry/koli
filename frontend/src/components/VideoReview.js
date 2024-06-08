import React, { useState, useRef } from 'react';
import axios from 'axios';

const VideoReview = ({ file }) => {
    const videoRef = useRef(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const timestamp = videoRef.current.currentTime;

        const newComment = {
            text: commentText,
            timestamp: timestamp,
        };

        axios.post(`/api/files/${file._id}/comments`, newComment)
        .then(response => {
            setComments([...comments, response.data]);
            setCommentText('');
        })
        .catch(error => {
            console.error('There was an error submitting the comment:', error);
        });
    };

    return (
        <div className="video-review">
            <video ref={videoRef} controls>
                <source src={file.url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <ul className="comment-list">
                {comments.map((comment) => (
                    <li key={comment._id}>
                        <span>{comment.timestamp}s: </span>{comment.text}
                    </li>
                ))}
            </ul>
            <form className="comment-form" onSubmit={handleCommentSubmit}>
                <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    required
                ></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default VideoReview;

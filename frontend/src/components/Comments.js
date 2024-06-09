import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Comments = ({ fileId }) => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        axios.get(`/api/files/${fileId}/comments`).then((response) => {
            setComments(response.data);
        });
    }, [fileId]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const newComment = { text: commentText };

        axios.post(`/api/files/${fileId}/comments`, newComment).then((response) => {
            setComments([...comments, response.data]);
            setCommentText('');
        });
    };

    return (
        <div className="comments">
            <h2>Comments</h2>
            <ul>
                {comments.map((comment) => (
                    <li key={comment._id} className="comment-item">
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

export default Comments;

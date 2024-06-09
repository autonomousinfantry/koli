import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommentSection.css';

const CommentSection = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editComment, setEditComment] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/comments/${videoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(response.data);
    };

    fetchComments();
  }, [videoId]);

  const handleAddComment = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.post('/api/comments', { videoId, text: newComment }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setComments([...comments, response.data]);
    setNewComment('');
  };

  const handleDeleteComment = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`/api/comments/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setComments(comments.filter(comment => comment._id !== id));
  };

  const handleEditComment = (comment) => {
    setEditComment(comment);
    setEditText(comment.text);
  };

  const handleUpdateComment = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`/api/comments/${editComment._id}`, { text: editText }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setComments(comments.map(comment => (comment._id === editComment._id ? response.data : comment)));
    setEditComment(null);
    setEditText('');
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment._id}>
            {editComment && editComment._id === comment._id ? (
              <>
                <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} />
                <button onClick={handleUpdateComment}>Update</button>
              </>
            ) : (
              <>
                {comment.text}
                <button onClick={() => handleEditComment(comment)}>Edit</button>
                <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <input 
        type="text" 
        value={newComment} 
        onChange={(e) => setNewComment(e.target.value)} 
      />
      <button onClick={handleAddComment}>Add Comment</button>
    </div>
  );
};

export default CommentSection;

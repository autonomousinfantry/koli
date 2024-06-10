import React, { useEffect, useState } from 'react';
import axios from 'axios';
import socket from '../services/socket';

const CommentList = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [timestamp, setTimestamp] = useState(0);

  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await axios.get(`/api/comments/${videoId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('userInfo').token}` }
      });
      setComments(data);
    };

    fetchComments();

    socket.emit('join', { videoId });

    socket.on('newComment', (comment) => {
      setComments((prevComments) => [...prevComments, comment]);
    });

    return () => {
      socket.off('newComment');
    };
  }, [videoId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('/api/comments', { text, videoId, timestamp }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('userInfo').token}` }
    });
    socket.emit('comment', data);
    setText('');
  };

  return (
    <div>
      <form onSubmit={handleAddComment}>
        <input
          type="text"
          placeholder="Add a comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="number"
          placeholder="Timestamp"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
        />
        <button type="submit">Add Comment</button>
      </form>
      <ul>
        {comments.map(comment => (
          <li key={comment._id}>
            <strong>{comment.user.name}</strong>: {comment.text} at {comment.timestamp}s
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;

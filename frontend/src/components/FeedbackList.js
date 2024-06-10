import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListGroup } from 'react-bootstrap';

const FeedbackList = ({ projectId }) => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const { data } = await axios.get(`/api/feedback/${projectId}`);
      setFeedbacks(data);
    };

    fetchFeedbacks();
  }, [projectId]);

  return (
    <ListGroup>
      {feedbacks.map(feedback => (
        <ListGroup.Item key={feedback._id}>
          <strong>{feedback.user.name}</strong>: {feedback.rating}/5 - {feedback.comment}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default FeedbackList;

import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import CommentList from './CommentList';
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Stage, Layer, Line } from 'react-konva';

const VideoPlayerWithComments = ({ video }) => {
  const videoRef = useRef(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [timestamp, setTimestamp] = useState(0);
  const [drawMode, setDrawMode] = useState(false);
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await axios.get(`/api/comments/${video._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('userInfo').token}` }
      });
      setComments(data);
    };

    fetchComments();
  }, [video._id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('/api/comments', { text: commentText, videoId: video._id, timestamp }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('userInfo').token}` }
    });
    setComments([...comments, data]);
    setCommentText('');
  };

  const handleTimeUpdate = () => {
    setTimestamp(videoRef.current.currentTime);
  };

  const handleMouseDown = (e) => {
    if (!drawMode) return;
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div>
      <video
        ref={videoRef}
        src={video.url}
        controls
        width="600"
        onTimeUpdate={handleTimeUpdate}
      />
      <Form onSubmit={handleAddComment}>
        <Form.Group>
          <Form.Label>Yorumunuz</Form.Label>
          <Form.Control
            type="text"
            placeholder="Yorumunuzu yazın"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </Form.Group>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="tooltip-top">Çizim Modunu Aç</Tooltip>}
        >
          <Button variant={drawMode ? 'danger' : 'secondary'} onClick={() => setDrawMode(!drawMode)}>
            {drawMode ? 'Çizim Modunu Kapat' : 'Çizim Modunu Aç'}
          </Button>
        </OverlayTrigger>
        <Button type="submit">Yorumu Ekle</Button>
      </Form>
      <Stage
        width={600}
        height={400}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="black"
              strokeWidth={2}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation="source-over"
            />
          ))}
        </Layer>
      </Stage>
      <CommentList comments={comments} />
    </div>
  );
};

export default VideoPlayerWithComments;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, Form, Button } from 'react-bootstrap';

const TaskList = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');

  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await axios.get(`/api/tasks/${projectId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('userInfo').token}` }
      });
      setTasks(data);
    };

    fetchTasks();
  }, [projectId]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('/api/tasks', { title, description, project: projectId, assignedTo, dueDate, priority }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('userInfo').token}` }
    });
    setTasks([...tasks, data]);
    setTitle('');
    setDescription('');
    setAssignedTo('');
    setDueDate('');
    setPriority('Medium');
  };

  const handleUpdateTaskDetails = async (taskId, updatedTask) => {
    const { data } = await axios.put('/api/tasks/details', { taskId, ...updatedTask }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('userInfo').token}` }
    });
    setTasks(tasks.map(task => task._id === taskId ? data : task));
  };

  return (
    <div>
      <Form onSubmit={handleAddTask}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Assigned To"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            as="select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Form.Control>
        </Form.Group>
        <Button type="submit">Add Task</Button>
      </Form>
      <ListGroup>
        {tasks.map(task => (
          <ListGroup.Item key={task._id}>
            <strong>{task.title}</strong>
            <p>{task.description}</p>
            <p>Assigned to: {task.assignedTo ? task.assignedTo.name : 'Unassigned'}</p>
            <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
            <p>Priority: {task.priority}</p>
            <Form>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Update Title"
                  defaultValue={task.title}
                  onBlur={(e) => handleUpdateTaskDetails(task._id, { title: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Update Description"
                  defaultValue={task.description}
                  onBlur={(e) => handleUpdateTaskDetails(task._id, { description: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="date"
                  defaultValue={new Date(task.dueDate).toISOString().split('T')[0]}
                  onBlur={(e) => handleUpdateTaskDetails(task._id, { dueDate: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  as="select"
                  defaultValue={task.priority}
                  onBlur={(e) => handleUpdateTaskDetails(task._id, { priority: e.target.value })}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default TaskList;

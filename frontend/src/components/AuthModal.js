import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ show, handleClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const { data } = await axios.post('/api/users/login', { email, password });
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate('/dashboard');
        handleClose();
      } catch (error) {
        console.error('Login error:', error);
      }
    } else {
      try {
        const { data } = await axios.post('/api/users/register', { name, email, password });
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate('/dashboard');
        handleClose();
      } catch (error) {
        console.error('Register error:', error);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isLogin ? 'Giriş Yap' : 'Kayıt Ol'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <Form.Group controlId="formName">
              <Form.Label>İsim</Form.Label>
              <Form.Control
                type="text"
                placeholder="İsminizi girin"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          )}
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email adresinizi girin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Şifre</Form.Label>
            <Form.Control
              type="password"
              placeholder="Şifrenizi girin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {isLogin ? 'Giriş Yap' : 'Kayıt Ol'}
          </Button>
        </Form>
        <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Hesabınız yok mu? Kayıt olun' : 'Zaten hesabınız var mı? Giriş yapın'}
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;

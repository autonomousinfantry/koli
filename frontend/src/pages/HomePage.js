import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import AuthModal from '../components/AuthModal';

const HomePage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleShow = () => setShowAuthModal(true);
  const handleClose = () => setShowAuthModal(false);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Hoşgeldiniz</h1>
          <p>Videolarınızı yönetin ve ekibinizle işbirliği yapın.</p>
          <Button variant="primary" onClick={handleShow}>
            Giriş Yap / Kayıt Ol
          </Button>
        </Col>
      </Row>
      <AuthModal show={showAuthModal} handleClose={handleClose} />
    </Container>
  );
};

export default HomePage;

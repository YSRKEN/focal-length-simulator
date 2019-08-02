import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { Button, Container, Row, Col } from 'react-bootstrap';

const App: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Button>テスト</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default App;

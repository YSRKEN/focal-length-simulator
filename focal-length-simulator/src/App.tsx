import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import useStore from './ApplicationStore';
import StateContext from './context';
import CalcForm from './CalcForm';

const App: React.FC = () => {
  const context = useStore();

  return (
    <StateContext.Provider value={context}>
      <Container>
        <Row>
          <Col className="mx-auto my-3" xs={12} md={6}>
            <h2 className="text-center">画角シミュレーター</h2>
            <CalcForm />
          </Col>
        </Row>
      </Container>
    </StateContext.Provider>
  );
};

export default App;

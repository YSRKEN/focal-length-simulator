import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import useStore from './ApplicationStore';
import StateContext from './context';
import CalcForm from './CalcForm';
import { VERSION, TWITTER_URL, GITHUB_URL } from './env';

const App: React.FC = () => {
  const context = useStore();

  return (
    <StateContext.Provider value={context}>
      <Container>
        <Row>
          <Col className="mx-auto my-3" xs={12} md={6}>
            <h2 className="text-center">画角シミュレーター</h2>
            <div className="text-center">
              <span>
                Ver.{VERSION}　<a href={TWITTER_URL}>作者Twitter</a>　
                <a href={GITHUB_URL}>GitHub</a>
              </span>
            </div>
            <CalcForm />
          </Col>
        </Row>
      </Container>
    </StateContext.Provider>
  );
};

export default App;

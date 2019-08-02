import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { Container, Row, Col, Form } from 'react-bootstrap';

const App: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col className="mx-auto my-3" xs={12} md={6}>
          <h2 className="text-center">画角シミュレーター</h2>
          <Form>
            <Form.Group>
              <Form.Label>センサーサイズ</Form.Label>
              <Form.Control as="select" defaultValue="MFT">
                <option value="Full">フルサイズ</option>
                <option value="APSC1">APS-C(Canon)</option>
                <option value="APSC2">APS-C(FUJIFILM)</option>
                <option value="MFT">マイクロフォーサーズ</option>
                <option value="11">1型</option>
                <option value="117">1/1.7型</option>
                <option value="123">1/2.3型</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>焦点距離[mm]</Form.Label>
              <Form.Control type="number" defaultValue="50" />
            </Form.Group>
            <Form.Group>
              <Form.Label>対象との距離[m]</Form.Label>
              <Form.Control type="text" defaultValue="2.0" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Fナンバー</Form.Label>
              <Form.Control type="text" defaultValue="1.7" />
            </Form.Group>
            <Form.Group>
              <Form.Label>画面の比率</Form.Label>
              <Form.Control as="select" defaultValue="43">
                <option value="169">16：9</option>
                <option value="32">3：2</option>
                <option value="43">4：3</option>
                <option value="11">1：1</option>
                <option value="34">4：3(縦)</option>
                <option value="22">3：2(縦)</option>
                <option value="916">16：9(縦)</option>
              </Form.Control>
            </Form.Group>
          </Form>
          <Form.Group>
            <Form.Label>計算結果</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              readOnly
              value="撮影範囲：0.692×0.520[m]\n被写界深度：前方1.694[m] 後方2.563[m] 合計4.257[m]"
            />
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};

export default App;

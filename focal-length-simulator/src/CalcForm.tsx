import React from 'react';
import { Form } from 'react-bootstrap';
import StateContext from './context';
import { SENSOR_SIZE_DICT } from './constant';

const CalcForm: React.FC = () => {
  const context = React.useContext(StateContext);

  const setSensorSize = (e: React.FormEvent<any>) => {
    context.dispatch({ type: 'setSensorSize', message: e.currentTarget.value });
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>センサーサイズ</Form.Label>
        <Form.Control
          as="select"
          value={context.sensorSize}
          onChange={setSensorSize}
        >
          {Object.keys(SENSOR_SIZE_DICT).map((value, key) => (
            <option value={value} key={key}>
              {SENSOR_SIZE_DICT[value]}
            </option>
          ))}
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
      <Form.Group>
        <Form.Label>計算結果</Form.Label>
        <Form.Control as="textarea" rows="3" readOnly value={context.result} />
      </Form.Group>
    </Form>
  );
};

export default CalcForm;

import React from 'react';
import { Form } from 'react-bootstrap';
import StateContext from './context';
import { SENSOR_SIZE_DICT, ASPECT_RATIO_DICT } from './constant';

const CalcForm: React.FC = () => {
  const context = React.useContext(StateContext);

  const setSensorSize = (e: React.FormEvent<any>) => {
    context.dispatch({ type: 'setSensorSize', message: e.currentTarget.value });
  };

  const setFocalLength = (e: React.FormEvent<any>) => {
    context.dispatch({
      type: 'setFocalLength',
      message: e.currentTarget.value,
    });
  };

  const setDistance = (e: React.FormEvent<any>) => {
    context.dispatch({ type: 'setDistance', message: e.currentTarget.value });
  };

  const setFNumber = (e: React.FormEvent<any>) => {
    context.dispatch({ type: 'setFNumber', message: e.currentTarget.value });
  };

  const setAspectRatio = (e: React.FormEvent<any>) => {
    context.dispatch({
      type: 'setAspectRatio',
      message: e.currentTarget.value,
    });
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
              {SENSOR_SIZE_DICT[value].name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>焦点距離[mm]</Form.Label>
        <Form.Control
          type="text"
          value={context.focalLength}
          onChange={setFocalLength}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>対象との距離[m]</Form.Label>
        <Form.Control
          type="text"
          value={context.distance}
          onChange={setDistance}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Fナンバー</Form.Label>
        <Form.Control
          type="text"
          value={context.fNumber}
          onChange={setFNumber}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>画面の比率</Form.Label>
        <Form.Control
          as="select"
          value={context.aspectRatio}
          onChange={setAspectRatio}
        >
          {Object.keys(ASPECT_RATIO_DICT).map((value, key) => (
            <option value={value} key={key}>
              {ASPECT_RATIO_DICT[value].name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>計算結果</Form.Label>
        <Form.Control as="textarea" rows="5" readOnly value={context.result} />
      </Form.Group>
    </Form>
  );
};

export default CalcForm;

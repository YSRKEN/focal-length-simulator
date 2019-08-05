import React from 'react';
import { Action, SENSOR_SIZE_DICT } from './constant';

const useStore = () => {
  const [sensorSize, setSensorSize] = React.useState('4.MFT');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(calcResultText(sensorSize));
  }, []);

  const dispatch = (action: Action) => {
    switch (action.type) {
      case 'setSensorSize':
        setSensorSize(action.message);
        setResult(calcResultText(action.message));
        break;
    }
  };

  const calcResultText = (sensorSize: string) => {
    return `センサーサイズ：${SENSOR_SIZE_DICT[sensorSize]}`;
  };

  return { sensorSize, result, dispatch };
};

export default useStore;

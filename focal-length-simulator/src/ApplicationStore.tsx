import React from 'react';
import { Action, SENSOR_SIZE_DICT, ASPECT_RATIO_DICT } from './constant';

const useStore = () => {
  const [sensorSize, setSensorSize] = React.useState('4.MFT');
  const [focalLength, setFocalLength] = React.useState('50');
  const [distance, setDistance] = React.useState('2.0');
  const [fNumber, setFNumber] = React.useState('1.7');
  const [aspectRatio, setAspectRatio] = React.useState('3.43');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(
      calcResultText(sensorSize, focalLength, distance, fNumber, aspectRatio),
    );
  }, []);

  const dispatch = (action: Action) => {
    switch (action.type) {
      case 'setSensorSize':
        setSensorSize(action.message);
        setResult(
          calcResultText(
            action.message,
            focalLength,
            distance,
            fNumber,
            aspectRatio,
          ),
        );
        break;
      case 'setFocalLength':
        setFocalLength(action.message);
        setResult(
          calcResultText(
            sensorSize,
            action.message,
            distance,
            fNumber,
            aspectRatio,
          ),
        );
        break;
      case 'setDistance':
        setDistance(action.message);
        setResult(
          calcResultText(
            sensorSize,
            focalLength,
            action.message,
            fNumber,
            aspectRatio,
          ),
        );
        break;
      case 'setFNumber':
        setFNumber(action.message);
        setResult(
          calcResultText(
            sensorSize,
            focalLength,
            distance,
            action.message,
            aspectRatio,
          ),
        );
        break;
      case 'setAspectRatio':
        setAspectRatio(action.message);
        setResult(
          calcResultText(
            sensorSize,
            focalLength,
            distance,
            fNumber,
            action.message,
          ),
        );
    }
  };

  const calcResultText = (
    sensorSize: string,
    focalLength: string,
    distance: string,
    fNumber: string,
    aspectRatio: string,
  ) => {
    let text = `センサーサイズ：${SENSOR_SIZE_DICT[sensorSize]}\n`;
    text += `焦点距離：${focalLength}[mm]\n`;
    text += `対象との距離：${distance}[m]\n`;
    text += `Fナンバー：${fNumber}\n`;
    text += `アスペクト比：${ASPECT_RATIO_DICT[aspectRatio]}\n`;
    return text;
  };

  return {
    sensorSize,
    focalLength,
    distance,
    fNumber,
    aspectRatio,
    result,
    dispatch,
  };
};

export default useStore;

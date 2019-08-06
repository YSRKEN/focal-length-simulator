import React from 'react';
import { Action, SENSOR_SIZE_DICT, ASPECT_RATIO_DICT } from './constant';
import { Decimal } from 'decimal.js';
import { calcActualSensorSize } from './utility';

const useStore = () => {
  const [sensorSize, setSensorSize] = React.useState('6');
  const [focalLength, setFocalLength] = React.useState('50');
  const [distance, setDistance] = React.useState('2.0');
  const [fNumber, setFNumber] = React.useState('1.7');
  const [aspectRatio, setAspectRatio] = React.useState('3');
  const [result, setResult] = React.useState('');

  React.useEffect(() => {
    setResult(
      calcResultText(sensorSize, focalLength, distance, fNumber, aspectRatio),
    );
  }, [sensorSize, focalLength, distance, fNumber, aspectRatio]);

  const dispatch = (action: Action) => {
    switch (action.type) {
      case 'setSensorSize':
        setSensorSize(action.message);
        break;
      case 'setFocalLength':
        setFocalLength(action.message);
        break;
      case 'setDistance':
        setDistance(action.message);
        break;
      case 'setFNumber':
        setFNumber(action.message);
        break;
      case 'setAspectRatio':
        setAspectRatio(action.message);
    }
  };

  const calcResultText = (
    sensorSize: string,
    focalLength: string,
    distance: string,
    fNumber: string,
    aspectRatio: string,
  ) => {
    // 入力チェック
    try {
      // データの読み取り
      const sensorWidth = new Decimal(SENSOR_SIZE_DICT[sensorSize].width);
      const sensorHeight = new Decimal(SENSOR_SIZE_DICT[sensorSize].height);
      const rawFocalLength = new Decimal(focalLength);
      const targetDistance = new Decimal(distance);
      const rawFNumber = new Decimal(fNumber);
      const aspectRatioWidth = new Decimal(
        ASPECT_RATIO_DICT[aspectRatio].width,
      );
      const aspectRatioHeight = new Decimal(
        ASPECT_RATIO_DICT[aspectRatio].height,
      );

      // 実際に撮影で使用している範囲を計算
      // (アスペクト比の情報から自動回転)
      const [actualSensorWidth, actualSensorHeight] = calcActualSensorSize(
        sensorWidth,
        sensorHeight,
        aspectRatioWidth,
        aspectRatioHeight,
      );

      let text = `センサーサイズ：${SENSOR_SIZE_DICT[sensorSize].name}(${SENSOR_SIZE_DICT[sensorSize].width}x${SENSOR_SIZE_DICT[sensorSize].height}mm)\n`;
      text += `有効センサーサイズ：${actualSensorWidth.toString()}x${actualSensorHeight.toString()}mm`;

      // チェック完了後の処理
      return text;
    } catch (e) {
      return 'エラー：入力値に数字ではない文字が含まれています';
    }
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

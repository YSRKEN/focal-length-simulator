import React from 'react';
import { Action, SENSOR_SIZE_DICT, ASPECT_RATIO_DICT } from './constant';
import { Decimal } from 'decimal.js';
import {
  calcActualSensorSize,
  calcAngleOfView,
  calcPhotoArea,
  calcFocalDepth,
  loadSetting,
  saveSetting,
  decimalMeterToString,
} from './utility';

const useStore = () => {
  const [sensorSize, setSensorSize] = React.useState(
    loadSetting('sensorSize', '6'),
  );
  const [focalLength, setFocalLength] = React.useState(
    loadSetting('focalLength', '50'),
  );
  const [distance, setDistance] = React.useState(
    loadSetting('distance', '2.0'),
  );
  const [fNumber, setFNumber] = React.useState(loadSetting('fNumber', '1.7'));
  const [aspectRatio, setAspectRatio] = React.useState(
    loadSetting('aspectRatio', '3'),
  );
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
        saveSetting('sensorSize', action.message);
        break;
      case 'setFocalLength':
        setFocalLength(action.message);
        saveSetting('focalLength', action.message);
        break;
      case 'setDistance':
        setDistance(action.message);
        saveSetting('distance', action.message);
        break;
      case 'setFNumber':
        setFNumber(action.message);
        saveSetting('fNumber', action.message);
        break;
      case 'setAspectRatio':
        setAspectRatio(action.message);
        saveSetting('aspectRatio', action.message);
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

      // 画角を計算
      const [angleWidth, angleHeight, angleDiagonal] = calcAngleOfView(
        actualSensorWidth,
        actualSensorHeight,
        rawFocalLength,
      );
      const radToDeg = new Decimal(180).div(Decimal.acos(-1));
      const angleWidth2 = angleWidth.mul(radToDeg);
      const angleHeight2 = angleHeight.mul(radToDeg);
      const angleDiagonal2 = angleDiagonal.mul(radToDeg);

      // 撮影可能範囲を計算
      const [
        photoAreaWidth,
        photoAreaHeight,
        photoAreaDiagonal,
      ] = calcPhotoArea(
        actualSensorWidth,
        actualSensorHeight,
        rawFocalLength,
        targetDistance,
      );

      // 被写界深度を計算
      // (許容錯乱円径は、フルサイズが1/30mm・マイクロフォーサーズを1/60mmとして、面積比の平方根に比例するようにする)
      const [
        circleDiameter,
        forwardFocalDepth,
        backFocalDepth,
        allFocalDepth,
      ] = calcFocalDepth(
        sensorWidth,
        sensorHeight,
        rawFocalLength,
        targetDistance,
        rawFNumber,
      );

      let text = `センサーサイズ：\n　${SENSOR_SIZE_DICT[sensorSize].name}(${SENSOR_SIZE_DICT[sensorSize].width}x${SENSOR_SIZE_DICT[sensorSize].height}mm)\n`;
      text += `有効センサーサイズ：\n　${actualSensorWidth.toPrecision(
        3,
      )}x${actualSensorHeight.toFixed(1)}mm\n`;
      text += `水平・垂直・対角画角：\n　${angleWidth2.toPrecision(
        3,
      )}°・${angleHeight2.toFixed(1)}°・${angleDiagonal2.toPrecision(3)}°\n`;
      text += `水平・垂直・対角撮影範囲：\n　${photoAreaWidth.toPrecision(
        3,
      )}m・${photoAreaHeight.toFixed(3)}m・${photoAreaDiagonal.toFixed(3)}m\n`;
      text += `許容錯乱円径：\n　${circleDiameter.toPrecision(3)}mm\n`;
      text += `前・後・合計被写界深度：\n　${decimalMeterToString(
        forwardFocalDepth,
      )}・${decimalMeterToString(backFocalDepth)}・${decimalMeterToString(
        allFocalDepth,
      )}`;

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

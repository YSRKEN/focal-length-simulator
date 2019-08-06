// 各種操作の種類
export type ActionType =
  | 'setSensorSize'
  | 'setFocalLength'
  | 'setDistance'
  | 'setFNumber'
  | 'setAspectRatio';

// センサーについての情報
export interface SensorInfo {
  name: string;
  width: string;
  height: string;
}

// センサーサイズの一覧
export const SENSOR_SIZE_DICT: { [key: string]: SensorInfo } = {
  '1': { name: '中判', width: '43.8', height: '32.8' },
  '2': { name: 'フルサイズ', width: '36', height: '24' },
  '3': { name: 'APS-C(Other)', width: '23.6', height: '15.8' },
  '4': { name: 'APS-C(Canon)', width: '22.3', height: '14.9' },
  '5': { name: '1.5型', width: '18.7', height: '14' },
  '6': { name: 'マイクロフォーサーズ', width: '17.3', height: '13' },
  '7': { name: '1型', width: '13.2', height: '8.8' },
  '8': { name: '2/3型', width: '8.8', height: '6.6' },
  '9': { name: '1/1.7型', width: '7.5', height: '5.6' },
  '10': { name: '1/1.8型', width: '7.1', height: '5.4' },
  '11': { name: '1/2.3型', width: '6.2', height: '4.7' },
  '12': { name: '1/2.5型', width: '5.7', height: '4.3' },
  '13': { name: '1/2.7型', width: '5.3', height: '4' },
  '14': { name: '1/3型', width: '4.8', height: '3.6' },
  '15': { name: '1/3.2型', width: '4.4', height: '3.3' },
  '16': { name: '1/3.6型', width: '4', height: '3' },
  '17': { name: '1/4.6型', width: '3.1', height: '2.3' },
};

// アスペクト比についての情報
export interface AspectRatioInfo {
  name: string;
  width: string;
  height: string;
}

// アスペクト比の一覧
export const ASPECT_RATIO_DICT: { [key: string]: AspectRatioInfo } = {
  '1': { name: '16：9', width: '16', height: '9' },
  '2': { name: '3：2', width: '3', height: '2' },
  '3': { name: '4：3', width: '4', height: '3' },
  '4': { name: '1：1', width: '1', height: '1' },
  '5': { name: '4：3(縦)', width: '3', height: '4' },
  '6': { name: '3：2(縦)', width: '2', height: '3' },
  '7': { name: '16：9(縦)', width: '9', height: '16' },
};

// ReduxにおけるAction
export interface Action {
  type: ActionType;
  message: string;
}

// ReduxにおけるStore
export interface Store {
  sensorSize: string;
  focalLength: string;
  distance: string;
  fNumber: string;
  aspectRatio: string;
  result: string;
  dispatch: (value: Action) => void;
}

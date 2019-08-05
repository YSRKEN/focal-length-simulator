export type ActionType =
  | 'setSensorSize'
  | 'setFocalLength'
  | 'setDistance'
  | 'setFNumber'
  | 'setAspectRatio';

export const SENSOR_SIZE_DICT: { [key: string]: string } = {
  '1.Full': 'フルサイズ',
  '2.APSC1': 'APS-C(Canon)',
  '3.APSC2': 'APS-C(FUJIFILM)',
  '4.MFT': 'マイクロフォーサーズ',
  '5.11': '1型',
  '6.117': '1/1.7型',
  '7.123': '1/2.3型',
};

export const ASPECT_RATIO_DICT: { [key: string]: string } = {
  '1.169': '16：9',
  '2.32': '3：2',
  '3.43': '4：3',
  '4.11': '1：1',
  '5.34': '4：3(縦)',
  '6.23': '3：2(縦)',
  '7.916': '16：9(縦)',
};

export interface Action {
  type: ActionType;
  message: string;
}

export interface Store {
  sensorSize: string;
  focalLength: string;
  distance: string;
  fNumber: string;
  aspectRatio: string;
  result: string;
  dispatch: (value: Action) => void;
}

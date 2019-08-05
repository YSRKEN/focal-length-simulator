export type ActionType = 'setSensorSize';

export const SENSOR_SIZE_DICT: { [key: string]: string } = {
  '1.Full': 'フルサイズ',
  '2.APSC1': 'APS-C(Canon)',
  '3.APSC2': 'APS-C(FUJIFILM)',
  '4.MFT': 'マイクロフォーサーズ',
  '5.11': '1型',
  '6.117': '1/1.7型',
  '7.123': '1/2.3型',
};

export interface Action {
  type: ActionType;
  message: string;
}

export interface Store {
  sensorSize: string;
  result: string;
  dispatch: (value: Action) => void;
}

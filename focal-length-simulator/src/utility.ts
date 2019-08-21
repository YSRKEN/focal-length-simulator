import Decimal from 'decimal.js';

/**
 * ローカルストレージから設定を読み込む
 * @param key キー
 * @param defaultValue デフォルト値
 */
export const loadSetting = (key: string, defaultValue: string) => {
  if (window.localStorage.getItem(key) === null) {
    return defaultValue;
  } else {
    return window.localStorage.getItem(key) as string;
  }
};

/**
 * ローカルストレージに設定を保存する
 * @param key キー
 * @param value 値
 */
export const saveSetting = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
};

/**
 * センサーサイズのうち、実際に使用されている大きさを算出する。なお、アスペクト比が縦向きの場合は自動回転する
 * @param sensorWidth センサーサイズ(長辺)
 * @param sensorHeight センサーサイズ(短辺)
 * @param aspectRatioWidth アスペクト比(横)
 * @param aspectRatioHeight アスペクト比(縦)
 */
export const calcActualSensorSize = (
  sensorWidth: Decimal,
  sensorHeight: Decimal,
  aspectRatioWidth: Decimal,
  aspectRatioHeight: Decimal,
) => {
  if (aspectRatioWidth.comparedTo(aspectRatioHeight) >= 0) {
    // aspectRatioWidthがaspectRatioHeight以上＝横長か正方形な時
    if (
      sensorWidth
        .mul(aspectRatioHeight)
        .comparedTo(sensorHeight.mul(aspectRatioWidth)) >= 0
    ) {
      // アスペクト比に比べてセンサーサイズが短辺方向に長いか正方形な時
      // 例：16x9mmに対して3:2
      return [
        sensorHeight.mul(aspectRatioWidth).div(aspectRatioHeight),
        sensorHeight,
      ];
    } else {
      // アスペクト比に比べてセンサーサイズが長辺方向に長い時
      // 例：40x30mmに対して3:2
      return [
        sensorWidth,
        sensorWidth.mul(aspectRatioHeight).div(aspectRatioWidth),
      ];
    }
  } else {
    // aspectRatioWidthがaspectRatioHeight未満＝縦長な時
    if (
      sensorWidth
        .mul(aspectRatioWidth)
        .comparedTo(sensorHeight.mul(aspectRatioHeight)) >= 0
    ) {
      // アスペクト比に比べてセンサーサイズが短辺方向に長いか正方形な時
      // 例：16x9mmに対して2:3
      return [
        sensorHeight,
        sensorHeight.mul(aspectRatioHeight).div(aspectRatioWidth),
      ];
    } else {
      // アスペクト比に比べてセンサーサイズが長辺方向に長い時
      // 例：40x30mmに対して2:3
      return [
        sensorWidth.mul(aspectRatioWidth).div(aspectRatioHeight),
        sensorWidth,
      ];
    }
  }
};

/**
 * 水平・垂直・対角画角を計算
 * @param actualSensorWidth 使用する水平センサーサイズ
 * @param actualSensorHeight 使用する垂直センサーサイズ
 * @param rawFocalLength 焦点距離
 */
export const calcAngleOfView = (
  actualSensorWidth: Decimal,
  actualSensorHeight: Decimal,
  rawFocalLength: Decimal,
) => {
  const angleWidth = actualSensorWidth
    .div(rawFocalLength.mul(2))
    .atan()
    .mul(2);
  const angleHeight = actualSensorHeight
    .div(rawFocalLength.mul(2))
    .atan()
    .mul(2);
  const actualSensorDiagonal = actualSensorWidth
    .mul(actualSensorWidth)
    .add(actualSensorHeight.mul(actualSensorHeight))
    .sqrt();
  const angleDiagonal = actualSensorDiagonal
    .div(rawFocalLength.mul(2))
    .atan()
    .mul(2);
  return [angleWidth, angleHeight, angleDiagonal];
};

/**
 * 水平・垂直・対角の撮影可能範囲を計算
 * @param actualSensorWidth 使用する水平センサーサイズ
 * @param actualSensorHeight 使用する垂直センサーサイズ
 * @param rawFocalLength 焦点距離
 * @param targetDistance 対象との距離
 */
export const calcPhotoArea = (
  actualSensorWidth: Decimal,
  actualSensorHeight: Decimal,
  rawFocalLength: Decimal,
  targetDistance: Decimal,
) => {
  const actualSensorDiagonal = actualSensorWidth
    .mul(actualSensorWidth)
    .add(actualSensorHeight.mul(actualSensorHeight))
    .sqrt();
  return [
    targetDistance.mul(actualSensorWidth).div(rawFocalLength),
    targetDistance.mul(actualSensorHeight).div(rawFocalLength),
    targetDistance.mul(actualSensorDiagonal).div(rawFocalLength),
  ];
};

/**
 * 前後・合計の被写界深度を計算
 * @param sensorWidth センサーサイズ(長辺)
 * @param sensorHeight センサーサイズ(短辺)
 * @param rawFocalLength 焦点距離
 * @param targetDistance 対象との距離
 * @param rawFNumber Fナンバー
 */
export const calcFocalDepth = (
  sensorWidth: Decimal,
  sensorHeight: Decimal,
  rawFocalLength: Decimal,
  targetDistance: Decimal,
  rawFNumber: Decimal,
) => {
  // 許容錯乱円径の計算
  // (許容錯乱円径は、フルサイズが1/30mm・マイクロフォーサーズを1/60mmとして、面積比の平方根に比例するようにする)
  const circleDiameter = new Decimal(1).div(30).mul(
    sensorWidth
      .mul(sensorHeight)
      .div(new Decimal(36 * 24))
      .sqrt(),
  );

  // 被写界深度を計算
  const a = targetDistance.mul(1000);
  const b = circleDiameter
    .mul(rawFNumber)
    .mul(a)
    .mul(a);
  const c = rawFocalLength.mul(rawFocalLength);
  const d = circleDiameter.mul(rawFNumber).mul(a);
  const forwardFocalDepth = b.div(c.add(d)).div(1000);
  const backFocalDepth = b.div(c.sub(d)).div(1000);

  return [
    circleDiameter,
    forwardFocalDepth,
    backFocalDepth,
    forwardFocalDepth.add(backFocalDepth),
  ];
};

/**
 * [m]単位の距離を文字列に変換
 * @param length 距離[m]
 */
export const decimalMeterToString = (length: Decimal) => {
  if (length.isNegative()) {
    return '∞m';
  }
  if (length.mul(1000).comparedTo(1) < 0) {
    return length.mul(1000000).toFixed(1) + 'μm';
  }
  if (length.mul(100).comparedTo(1) < 0) {
    return length.mul(1000).toFixed(1) + 'mm';
  }
  if (length.comparedTo(1) < 0) {
    return length.mul(100).toFixed(1) + 'cm';
  }
  return length.toFixed(1) + 'm';
};

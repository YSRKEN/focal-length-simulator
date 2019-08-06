import Decimal from 'decimal.js';

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

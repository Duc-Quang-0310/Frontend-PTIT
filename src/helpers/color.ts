import { ColorPalette } from 'constants/style.constant';

export const renderColorByType = (
  type: 'info' | 'success' | 'warning' | 'purple'
) => {
  if (type === 'info') {
    return ColorPalette.blue_3;
  }

  if (type === 'success') {
    return ColorPalette.green_2;
  }

  if (type === 'purple') {
    return '#7F56D9';
  }

  return ColorPalette.red_6;
};

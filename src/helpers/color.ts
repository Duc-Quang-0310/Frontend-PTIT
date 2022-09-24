import { ColorPalette } from 'constants/style.constant';

export const renderColorByType = (type: 'info' | 'success' | 'warning') => {
  if (type === 'info') {
    return ColorPalette.blue_3;
  }

  if (type === 'success') {
    return ColorPalette.green_2;
  }

  return ColorPalette.red_6;
};

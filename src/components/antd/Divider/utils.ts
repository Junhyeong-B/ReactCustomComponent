import { isNumber } from '@/utils/typeCheck';
import { Orientation } from './types';

export const getDividerWidth = (orientation: Orientation, margin?: string) => {
  switch (orientation) {
    case 'left':
      return [margin ?? '5%', '95%'];
    case 'right':
      return ['95%', margin ?? '5%'];
    case 'center':
    default:
      return ['50%', '50%'];
  }
};

export const getMargin = (orientationMargin?: string | number) => {
  return isNumber(orientationMargin)
    ? `${orientationMargin}px`
    : orientationMargin;
};

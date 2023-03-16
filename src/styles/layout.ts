import { Align } from '@/types/layout';
import { isNumber } from '@/utils/typeCheck';
import { css } from '@emotion/css';

export const gap = (size: string | number) => css`
  gap: ${isNumber(size) ? `${size}px` : size};
`;

export const alignItems = (align: Align) => css`
  align-items: ${align === 'center' || align === 'baseline'
    ? align
    : `flex-${align}`};
`;

export const width = (size: string | number) => css`
  width: ${isNumber(size) ? `${size}px` : size};
`;

export const height = (size: string | number) => css`
  height: ${isNumber(size) ? `${size}px` : size};
`;

export const opacity = (opacity: number) => css`
  opacity: ${opacity};
`;

export const flexDirection = (
  direction: 'row' | 'row-reverse' | 'column' | 'column-reverse'
) => css`
  flex-direction: ${direction};
`;

export const zIndex = (zIndex: number) => css`
  z-index: ${zIndex};
`;

export const flexGrow = (value: number) => css`
  flex-grow: ${value};
`;

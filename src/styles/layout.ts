import { Align } from '@/types/layout';
import { isNumber } from '@/utils/typeCheck';
import { css } from '@emotion/css';

export const gap = (size: string | number) => css`
  gap: ${isNumber(size) ? `${size}px` : size};
`;

export const alignItems = (align: Align) => css`
  align-items: ${align === 'center' || align === 'baseline' ? align : `flex-${align}`};
`;

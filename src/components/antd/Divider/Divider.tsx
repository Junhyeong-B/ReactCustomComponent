import React, { CSSProperties } from 'react';
import { css, cx } from '@emotion/css';

import { isNumber } from '@/utils/typeCheck';
import { Orientation } from './types';

interface Props {
  className?: string;
  dashed?: boolean;
  orientation?: Orientation;
  orientationMargin?: string | number;
  plane?: boolean;
  style?: CSSProperties;
}

const getDividerWidth = (orientation: Orientation, margin?: string) => {
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

const getMargin = (orientationMargin?: string | number) => {
  return isNumber(orientationMargin) ? `${orientationMargin}px` : orientationMargin;
};

const Divider = ({
  children,
  className,
  dashed,
  orientation = 'center',
  orientationMargin,
  plane,
  style,
}: React.PropsWithChildren<Props>) => {
  const margin = getMargin(orientationMargin);
  const [left, right] = getDividerWidth(orientation, margin);

  return (
    <div
      className={cx(
        className,
        rootCss({
          dashed,
          left,
          margin,
          orientation,
          right,
        }),
        {
          [planeTextCss]: plane,
        }
      )}
      style={style}
    >
      <span className={textCss}>{children}</span>
    </div>
  );
};

export default Divider;

const lineCss = css`
  border-block-end: 0;
  border-block-color: inherit;
  transform: translateY(50%);
`;

const rootCss = ({
  dashed,
  left,
  margin,
  orientation,
  right,
}: {
  dashed?: boolean;
  left: string;
  margin?: string;
  orientation: Orientation;
  right: string;
}) => css`
  display: flex;
  align-items: center;

  ::before {
    content: '';
    width: ${left};
    border-block-start: ${orientation === 'left' && margin ? '0' : '1px'} ${dashed ? 'dashed' : 'solid'};
    ${lineCss}
  }

  ::after {
    content: '';
    width: ${right};
    border-block-start: ${orientation === 'right' && margin ? '0' : '1px'} ${dashed ? 'dashed' : 'solid'};
    ${lineCss};
  }
`;

const textCss = css`
  padding: 0 10px;
  text-align: center;
  white-space: nowrap;
  font-size: 16px;
  font-weight: 500;
`;

const planeTextCss = css`
  font-weight: 400;
  font-size: 14px;
`;

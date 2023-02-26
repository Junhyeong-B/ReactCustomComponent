import React, { CSSProperties } from 'react';
import { css, cx } from '@emotion/css';

import { Orientation } from './types';
import { Direction } from '@/types/layout';
import { getDividerWidth, getMargin } from './utils';
import { has } from 'immer/dist/internal';

interface Props {
  className?: string;
  dashed?: boolean;
  orientation?: Orientation;
  orientationMargin?: string | number;
  plane?: boolean;
  style?: CSSProperties;
  type?: Direction;
}

const Divider = ({
  children,
  className,
  dashed,
  orientation = 'center',
  orientationMargin,
  plane,
  style,
  type = 'horizontal',
}: React.PropsWithChildren<Props>) => {
  const margin = getMargin(orientationMargin);
  const [left, right] = getDividerWidth(orientation, margin);
  const isHorizontal = type === 'horizontal';
  const isVertical = type === 'vertical';
  const borderType = dashed ? 'dashed' : 'solid';
  const hasChildren = !!children;

  return (
    <div
      className={cx(className, rootCss, {
        [lineWithChildrenCss({
          borderType,
          left,
          margin,
          orientation,
          right,
        })]: hasChildren && isHorizontal,
        [lineWithoutChildrenCss(borderType)]: !hasChildren && isHorizontal,
        [verticalLineCss]: isVertical,
        [planeTextCss]: plane,
      })}
      style={style}
    >
      {hasChildren && isHorizontal && (
        <span className={textCss(isHorizontal)}>{children}</span>
      )}
    </div>
  );
};

export default Divider;

const rootCss = css`
  display: flex;
  align-items: center;
  margin: 16px 0;
`;

const lineCss = css`
  border-block-end: 0;
  border-block-color: inherit;
`;

const lineWithChildrenCss = ({
  borderType,
  left,
  margin,
  orientation,
  right,
}: {
  borderType: 'dashed' | 'solid';
  left: string;
  margin?: string;
  orientation: Orientation;
  right: string;
}) => css`
  ::before {
    content: '';
    width: ${left};
    border-block-start: ${orientation === 'left' && margin ? '0' : '1px'}${' ' + borderType};
    ${lineCss};
  }

  ::after {
    content: '';
    width: ${right};
    border-block-start: ${orientation === 'right' && margin ? '0' : '1px'}${' ' + borderType};
    ${lineCss};
  }
`;

const lineWithoutChildrenCss = (borderType: 'dashed' | 'solid') => css`
  width: 100%;
  border-block-start: 1px ${borderType};
`;

const verticalLineCss = css`
  display: inline-block;
  height: 14px;
  margin: 0 8px;
  vertical-align: middle;
  border-top: 0;
  border-inline-start: 1px solid;
`;

const textCss = (hasChildren: boolean) => css`
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

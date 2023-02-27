import { alignItems, gap } from '@/styles/layout';
import { Align, Direction } from '@/types/layout';
import { css, cx } from '@emotion/css';
import React from 'react';
import { Size } from './types';

interface Props {
  align?: Align;
  direction?: Direction;
  size?: Size | Size[];
  split?: React.ReactNode;
  wrap?: boolean;
}

const getPxFromSize = (size: Size) => {
  switch (size) {
    case 'small':
      return '8px';
    case 'large':
      return '24px';
    case 'middle':
      return '16px';
    default:
      return `${size}px`;
  }
};

const getPxfromSizeArray = (size: Size[]) => {
  const pxArray = size.slice(0, 2).map((sz) => getPxFromSize(sz));
  return `${pxArray[1]} ${pxArray[0]}`;
};

const Space = ({
  align = 'center',
  children,
  direction = 'horizontal',
  size = 'middle',
  split,
  wrap,
}: React.PropsWithChildren<Props>) => {
  const gapSize = Array.isArray(size)
    ? getPxfromSizeArray(size)
    : getPxFromSize(size);
  const customChildren = !split
    ? children
    : React.Children.map(children, (child, i) =>
        i === 0 ? (
          child
        ) : (
          <React.Fragment key={child?.toString()}>
            <>{split}</>
            <>{child}</>
          </React.Fragment>
        )
      );
  return (
    <div
      className={cx(rootCss(direction, wrap), gap(gapSize), alignItems(align))}
    >
      {customChildren}
    </div>
  );
};

export default Space;

const rootCss = (direction: Direction, wrap?: boolean) => css`
  display: inline-flex;
  flex-direction: ${direction === 'horizontal' ? 'row' : 'column'};
  flex-wrap: ${wrap ? 'wrap' : 'initial'};
`;

import { colorCss } from '@/styles/color';
import { css, cx } from '@emotion/css';
import React from 'react';

interface Props {
  direction: 'up' | 'down';
  color?: string;
  className?: string;
}

const Arrow = ({ direction, className, color = 'black' }: Props) => {
  return (
    <div
      className={cx(rootCss, colorCss(color), className, {
        [borderTopCss]: direction === 'up',
        [borderBottomCss]: direction === 'down',
      })}
    />
  );
};

export default Arrow;

const rootCss = css`
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  cursor: pointer;
`;

const borderTopCss = css`
  border-top: 5px solid;
`;

const borderBottomCss = css`
  border-bottom: 5px solid;
`;

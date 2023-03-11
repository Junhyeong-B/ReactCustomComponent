import { flexDirection, opacity } from '@/styles/layout';
import { css, cx } from '@emotion/css';
import React, { useCallback } from 'react';
import { DotPosition } from './types';

interface Props {
  activeIndex: number;
  dotPosition: DotPosition;
  onClick: (index: number) => void;
}

const Dots = ({
  activeIndex,
  children,
  dotPosition,
  onClick,
}: React.PropsWithChildren<Props>) => {
  const onClickHandler = useCallback(
    (index: number) => {
      onClick?.(index);
    },
    [onClick]
  );

  const isVertical = dotPosition === 'left' || dotPosition === 'right';

  return (
    <div
      className={cx(dotsContainerCss, {
        [topPositionCss]: dotPosition === 'top',
        [bottomPositionCss]: dotPosition === 'bottom',
        [leftPositionCss]: dotPosition === 'left',
        [rightPositionCss]: dotPosition === 'right',
      })}
    >
      <ul
        className={cx(dotsUlCss, {
          [flexDirection('column')]: isVertical,
        })}
      >
        {React.Children.map(children, (_, index) => {
          const isSelected = activeIndex === index;
          return (
            <li
              className={cx(dotCss, {
                [opacity(1)]: isSelected,
                [verticalCss(isSelected)]: isVertical,
                [horizontalCss(isSelected)]: !isVertical,
              })}
              onClick={onClickHandler.bind(null, index)}
            >
              <button className={buttonCss} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dots;

const dotsContainerCss = css`
  position: absolute;
`;

const topPositionCss = css`
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
`;

const bottomPositionCss = css`
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
`;

const leftPositionCss = css`
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
`;

const rightPositionCss = css`
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
`;

const dotsUlCss = css`
  width: 100%;
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 12px 0;
`;

const dotCss = css`
  transition: all 0.3s;
  list-style: none;
  opacity: 0.75;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  cursor: pointer;

  :hover {
    opacity: 0.9;
  }
`;

const verticalCss = (isSelected: boolean) => css`
  width: 3px;
  height: ${isSelected ? '24' : '16'}px;
`;

const horizontalCss = (isSelected: boolean) => css`
  width: ${isSelected ? '24' : '16'}px;
  height: 3px;
`;

const buttonCss = css`
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 1px;
  background-color: #fff;
  outline: none;
  cursor: pointer;
  padding: 0;
`;

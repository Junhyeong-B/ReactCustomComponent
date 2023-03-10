import useResize from '@/hooks/useResize';
import { width as widthCss } from '@/styles/layout';
import { css, cx } from '@emotion/css';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import Dots from './Dots';
import { DotPosition } from './types';

interface Props {
  autoPlay?: boolean;
  dotPosition?: DotPosition;
  dots?: boolean;
  easing?: string;
  effect?: 'scrollx' | 'fade';
  afterChange?: (currentIndex: number) => void;
  beforeChange?: (from: number, to: number) => void;
}

const Carousel = ({
  autoPlay,
  dotPosition,
  dots,
  easing,
  effect = 'scrollx',
  afterChange,
  beforeChange,
  children,
}: React.PropsWithChildren<Props>) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimatied, setIsAnimatied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const containerSize = useResize(containerRef);
  const containerWidth = useMemo(
    () => containerSize.width * React.Children.count(children),
    [containerSize, children]
  );
  const transformWidth = useMemo(
    () => -activeIndex * containerSize.width,
    [activeIndex, containerSize]
  );

  const isSlideEffect = effect === 'scrollx';

  const onDotClickHandler = useCallback(
    (index: number) => {
      if (isAnimatied || index === activeIndex) {
        return;
      }
      setIsAnimatied(true);
      beforeChange?.(activeIndex, index);
      setActiveIndex(index);
      afterChange?.(index);

      setTimeout(() => {
        setIsAnimatied(false);
      }, 500);
    },
    [beforeChange, afterChange, activeIndex, isAnimatied]
  );

  return (
    <div className={rootCss} ref={containerRef}>
      <div className={slideWrapperCss}>
        <div
          className={cx(slideContainerCss, widthCss(containerWidth), {
            [slideTranslateCss(transformWidth)]: isSlideEffect,
            [slideFadeCss(transformWidth)]: !isSlideEffect,
            [fadeAnimation]: !isSlideEffect && isAnimatied,
          })}
        >
          {React.Children.map(children, (child) => (
            <div className={cx(slideCss, widthCss(containerSize.width))}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <Dots
        activeIndex={activeIndex}
        onClick={onDotClickHandler}
        children={children}
      />
    </div>
  );
};

export default Carousel;

const rootCss = css`
  position: relative;
  margin: 0;
  padding: 0;
`;

const slideWrapperCss = css`
  overflow: hidden;
`;

const slideContainerCss = css`
  display: flex;
`;

const slideTranslateCss = (width: number) => css`
  transition: transform 0.5s ease;
  transform: translateX(${width}px);
`;

const fadeAnimation = css`
  @keyframes fadeAnimation {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
    100% {
      opacity: 1;
    }
  }
  animation: fadeAnimation 0.4s linear;
`;

const slideFadeCss = (width: number) => css`
  transition: opacity 0.4s;
  transform: translateX(${width}px);
`;

const slideCss = css`
  display: block;
  width: 100%;
  padding: 4px;
`;

import useOnMount from '@/hooks/useOnMount';
import useResize from '@/hooks/useResize';
import { flexDirection, width as widthCss } from '@/styles/layout';
import { css, cx } from '@emotion/css';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
  autoPlay = false,
  dotPosition = 'bottom',
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
  const childrenCount = React.Children.count(children);

  const isScrollXEffect = effect === 'scrollx';
  const isVertical = dotPosition === 'left' || dotPosition === 'right';

  const containerSize = useResize(containerRef);

  const containerWidth = useMemo(
    () =>
      isVertical ? containerSize.width : containerSize.width * childrenCount,
    [containerSize, childrenCount, isVertical]
  );

  const translateSize = useMemo(
    () =>
      isVertical
        ? -activeIndex * (containerSize.height / childrenCount)
        : -activeIndex * containerSize.width,
    [activeIndex, containerSize, isVertical, childrenCount]
  );

  const triggerSlideAnimation = useCallback(() => {
    setIsAnimatied(true);
    setTimeout(() => {
      setIsAnimatied(false);
    }, 500);
  }, []);

  const onDotClickHandler = useCallback(
    (index: number) => {
      if (isAnimatied || index === activeIndex) {
        return;
      }
      triggerSlideAnimation();
      beforeChange?.(activeIndex, index);
      setActiveIndex(index);
      afterChange?.(index);
    },
    [beforeChange, afterChange, activeIndex, isAnimatied, triggerSlideAnimation]
  );

  useOnMount(() => {
    if (!autoPlay) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev === childrenCount - 1) {
          return 0;
        } else {
          return prev + 1;
        }
      });
      triggerSlideAnimation();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  });

  const sliderContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (
      !sliderContainerRef.current ||
      !isVertical ||
      (sliderContainerRef.current && sliderContainerRef.current.style.height)
    ) {
      return;
    }

    const { height } = sliderContainerRef.current.getClientRects()[0];
    sliderContainerRef.current.style.height = `${height / childrenCount}px`;
  }, [sliderContainerRef, isVertical, childrenCount]);

  return (
    <div className={rootCss}>
      <div className={slideWrapperCss} ref={containerRef}>
        <div
          className={cx(slideContainerCss, widthCss(containerWidth), {
            [slideFadeCss]: !isScrollXEffect,
            [fadeAnimation]: !isScrollXEffect && isAnimatied,
            [flexDirection('column')]: isVertical,
            [slideXCss(translateSize)]: !isVertical,
            [slideYCss(translateSize)]: isVertical,
          })}
          ref={sliderContainerRef}
        >
          {React.Children.map(children, (child) => (
            <div className={cx(widthCss(containerSize.width))}>{child}</div>
          ))}
        </div>
      </div>
      <Dots
        activeIndex={activeIndex}
        onClick={onDotClickHandler}
        dotPosition={dotPosition}
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
  transition: transform 0.5s ease;
`;

const slideXCss = (width: number) => css`
  transform: translateX(${width}px);
`;

const slideYCss = (height: number) => css`
  transform: translateY(${height}px);
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

const slideFadeCss = css`
  transition: opacity 0.4s;
`;

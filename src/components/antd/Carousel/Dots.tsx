import { opacity, width } from '@/styles/layout';
import { css, cx } from '@emotion/css';
import React, { useCallback } from 'react';

interface Props {
  activeIndex: number;
  onClick: (index: number) => void;
}

const Dots = ({
  activeIndex,
  children,
  onClick,
}: React.PropsWithChildren<Props>) => {
  const onClickHandler = useCallback(
    (index: number) => {
      onClick?.(index);
    },
    [onClick]
  );

  return (
    <div className={dotsContainerCss}>
      <ul className={dotsUlCss}>
        {React.Children.map(children, (_, index) => (
          <li
            className={cx(dotCss, {
              [width(24)]: activeIndex === index,
              [opacity(1)]: activeIndex === index,
            })}
            onClick={onClickHandler.bind(null, index)}
          >
            <button className={buttonCss} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dots;

const dotsContainerCss = css`
  position: absolute;
  left: 50%;
  bottom: 8px;
  transform: translate(-50%);
`;

const dotsUlCss = css`
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 12px 0;
  width: 100%;
`;

const dotCss = css`
  width: 16px;
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

const buttonCss = css`
  width: 100%;
  height: 3px;
  border: 0;
  border-radius: 1px;
  background-color: #fff;
  outline: none;
  cursor: pointer;
`;

import { css, cx } from '@emotion/css';
import React, { useState } from 'react';
import { width as widthCss, zIndex as zIndexCss } from '@/styles/layout';
import { backgroundColor } from '@/styles/color';
import { fadeIn, fadeOut } from '@/styles/animation';

type PlacementType = 'top' | 'right' | 'bottom' | 'left';

interface Props {
  onClose: () => void;
  open?: boolean;
  placement?: PlacementType;
  title?: string;
  width?: number;
  zIndex?: number;
}

const Drawer = ({
  children,
  onClose,
  open = false,
  placement = 'right',
  title,
  width = 378,
  zIndex = 1000,
}: React.PropsWithChildren<Props>) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const isVertical = placement === 'left' || placement === 'right';

  const handleClose = () => {
    if (isAnimated) {
      return;
    }

    onClose();
    setIsAnimated(true);
    setTimeout(() => {
      setIsAnimated(false);
    }, 280);
  };

  return (
    <div className={cx(rootCss, zIndexCss(zIndex))}>
      {(open || isAnimated) && (
        <div
          className={cx(maskCss, zIndexCss(zIndex), {
            [backgroundColor('rgba(0, 0, 0, 0.45)')]: open,
            [fadeOutCss]: isAnimated,
          })}
          onClick={handleClose}
        />
      )}
      <div
        className={cx(
          drawerSectionCss,
          translateCss(placement),
          zIndexCss(zIndex),
          {
            [widthCss(width)]: isVertical,
            [topPositionCss]: placement === 'top',
            [bottomPositionCss]: placement === 'bottom',
            [leftPositionCss]: placement === 'left',
            [rightPositionCss]: placement === 'right',
            [translateDefaultCss]: open,
          }
        )}
      >
        <div className={headerCss}>
          <button onClick={handleClose}>X</button>
          <div>{title}</div>
        </div>
        <div className={bodyCss}>{children}</div>
      </div>
    </div>
  );
};

export default Drawer;

const rootCss = css`
  position: fixed;
  inset: 0;
  pointer-events: none;
`;

const maskCss = css`
  position: absolute;
  inset: 0;
  pointer-events: auto;
  background-color: rgba(0, 0, 0, 0.45);
  animation: ${fadeIn} 0.3s ease;
`;

const fadeOutCss = css`
  animation: ${fadeOut} 0.3s ease;
`;

const topPositionCss = css`
  top: 0;
  left: 0;
  right: 0;
`;

const bottomPositionCss = css`
  bottom: 0;
  left: 0;
  right: 0;
`;

const leftPositionCss = css`
  top: 0;
  left: 0;
  bottom: 0;
`;

const rightPositionCss = css`
  top: 0;
  right: 0;
  bottom: 0;
`;

const translateDefaultCss = css`
  transform: translate(0, 0);
`;

const translateCss = (placement: PlacementType) => {
  let translate: string;
  switch (placement) {
    case 'top':
      translate = 'translateY(-100%)';
      break;
    case 'bottom':
      translate = 'translateY(100%)';
      break;
    case 'left':
      translate = 'translateX(-100%)';
      break;
    case 'right':
    default:
      translate = 'translateX(100%)';
      break;
  }
  return css`
    transform: ${translate};
  `;
};

const drawerSectionCss = css`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #fff;
  transition: all 0.3s;
  box-shadow: -6px 0 16px 0 rgba(0, 0, 0, 0.08),
    -3px 0 6px -4px rgba(0, 0, 0, 0.12), -9px 0 28px 8px rgba(0, 0, 0, 0.05);
  pointer-events: auto;
`;

const headerCss = css`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  font-size: 16px;
  border-bottom: 1px solid rgba(5, 5, 5, 0.06);
`;

const bodyCss = css`
  flex-grow: 1;
  overflow: auto;
  padding: 24px;
`;

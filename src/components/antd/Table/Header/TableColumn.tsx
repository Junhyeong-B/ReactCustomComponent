import { css, cx } from '@emotion/css';
import React from 'react';
import Arrow from '../../common/Arrow/Arrow';
import { SortingDirection } from '../types';

interface Props<T> {
  children: React.ReactElement | string;
  className?: string;
  id?: keyof T;
  isSortableHeader?: boolean;
  onSort?: (sortKey: keyof T) => T[];
  sortDir?: SortingDirection;
  sortKey?: keyof T;
}

const TableColumn = <T,>({
  children,
  className,
  id,
  isSortableHeader,
  onSort,
  sortDir,
  sortKey,
}: Props<T>) => {
  const isArrowVisible =
    isSortableHeader && sortKey === id && sortDir !== 'none';

  const onColumnHeaderClick = () => {
    id && onSort?.(id);
  };

  return (
    <th
      onClick={onColumnHeaderClick}
      className={cx(className, {
        [rootCss]: isSortableHeader,
      })}
    >
      {children}
      {isArrowVisible && (
        <>
          &nbsp;
          <Arrow direction={sortDir === 'asc' ? 'up' : 'down'} />
        </>
      )}
    </th>
  );
};

export default TableColumn;

const rootCss = css`
  cursor: pointer;
`;

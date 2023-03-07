import { css, cx } from '@emotion/css';
import React from 'react';
import Arrow from '../../common/Arrow/Arrow';
import { SortingDirection } from '../types';

interface Props<T> {
  id?: keyof T;
  onSort?: (sortKey: keyof T) => T[];
  sortKey?: keyof T;
  sortDir?: SortingDirection;
  isSortableHeader?: boolean;
  children: React.ReactElement | string;
  className?: string;
}

const TableColumn = <T,>({
  id,
  onSort,
  sortKey,
  sortDir,
  isSortableHeader,
  children,
  className,
}: Props<T>) => {
  const isArrowVisible =
    isSortableHeader && sortKey === id && sortDir !== 'none';

  const onColumnHeaderClick = () => {
    id && onSort?.(id);
  };

  return (
    <th onClick={onColumnHeaderClick} className={cx(rootCss, className)}>
      {children}
      &nbsp;
      {isArrowVisible && (
        <Arrow direction={sortDir === 'asc' ? 'up' : 'down'} />
      )}
    </th>
  );
};

export default TableColumn;

const rootCss = css`
  cursor: pointer;
`;

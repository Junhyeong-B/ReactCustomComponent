import React from 'react';
import { SortingDirection } from '../types';

interface Props<T> {
  children: React.ReactNode;
  className?: string;
  isSortableHeader: boolean;
  onSort: (sortKey: keyof T, sortDir?: SortingDirection) => void;
  rowClassName?: string;
  sortDir: SortingDirection;
  sortKey: keyof T;
}

const TableHeader = <T,>({
  children,
  className,
  isSortableHeader,
  onSort,
  rowClassName,
  sortDir,
  sortKey,
}: Props<T>) => {
  const headerChildrens = isSortableHeader
    ? React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement<Props<T>>, {
          onSort,
          isSortableHeader,
          sortKey,
          sortDir,
        })
      )
    : children;
  return (
    <thead className={className}>
      <tr className={rowClassName}>{headerChildrens}</tr>
    </thead>
  );
};

export default TableHeader;

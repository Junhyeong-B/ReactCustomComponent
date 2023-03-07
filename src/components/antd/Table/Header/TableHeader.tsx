import React from 'react';
import { SortingDirection } from '../types';

interface Props<T> {
  isSortableHeader: boolean;
  sortKey: keyof T;
  sortDir: SortingDirection;
  onSort: (sortKey: keyof T, sortDir?: SortingDirection) => void;
  children: React.ReactNode;
}

const TableHeader = <T,>({
  isSortableHeader,
  sortKey,
  sortDir,
  children,
  onSort,
}: Props<T>) => {
  const headerChildrens = isSortableHeader
    ? React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement, {
          onSort,
          isSortableHeader,
          sortKey,
          sortDir,
        })
      )
    : children;
  return (
    <thead>
      <tr>{headerChildrens}</tr>
    </thead>
  );
};

export default TableHeader;

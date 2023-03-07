import orderBy from '@/utils/orderBy';
import { useMemo, useRef, useState } from 'react';
import { SortingDirection } from './types';

interface Sorter<T> {
  sortKey: keyof T;
  sortDir: SortingDirection;
}

interface UseSortProps<T> {
  data: T[];
  customSorterFunc?: ({
    items,
    sortKey,
    sortDir,
  }: {
    items: T[];
    sortKey: keyof T;
    sortDir: SortingDirection;
  }) => T[];
}

const useSort = <T>({
  sortKey = '' as keyof T,
  sortDir = 'none',
  data,
  customSorterFunc = sortBySorting,
}: Partial<Sorter<T>> & UseSortProps<T>) => {
  const defaultSorter = useRef(customSorterFunc);
  const [sorter, setSorter] = useState<Sorter<T>>({
    sortKey,
    sortDir,
  });

  const onSort = (nextSortKey: keyof T, nextSortDir?: SortingDirection) => {
    const nextDirection =
      nextSortDir ??
      (sorter.sortKey !== nextSortKey
        ? 'asc'
        : getNextSortDirection(sorter.sortDir));

    setSorter({
      sortKey: nextSortKey,
      sortDir: nextDirection,
    });
  };

  const sortedItems = useMemo(
    () =>
      defaultSorter.current({
        items: data,
        sortKey: sorter.sortKey,
        sortDir: sorter.sortDir,
      }),
    [data, sorter]
  );

  return { onSort, sortedItems, ...sorter };
};

export default useSort;

const getNextSortDirection = (
  currentDirection: SortingDirection
): SortingDirection => {
  switch (currentDirection) {
    case 'asc':
      return 'desc';
    case 'desc':
      return 'none';
    case 'none':
    default:
      return 'asc';
  }
};

const sortBySorting = <T>({
  items,
  sortKey,
  sortDir,
}: {
  items: T[];
  sortKey: keyof T;
  sortDir: SortingDirection;
}): T[] => {
  switch (sortDir) {
    case 'asc':
    case 'desc':
      return orderBy(items, (item: T) => item[sortKey], sortDir);
    case 'none':
    default:
      return items;
  }
};

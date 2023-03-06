export default function orderBy<T>(
  arr: T[],
  props: ((obj: T) => T[keyof T]) | ((obj: T) => T[keyof T])[],
  orders: ('asc' | 'desc')[] | 'asc' | 'desc' = 'asc'
): T[] {
  const copiedArray = arr.slice();
  const order = Array.isArray(orders) ? orders : [orders];
  const sortProps = Array.isArray(props) ? props : [props];

  return copiedArray.sort((a, b) => {
    for (let i = 0; i < sortProps.length; i++) {
      const prop = sortProps[i];
      const aVal = prop(a);
      const bVal = prop(b);
      const comparison =
        (aVal < bVal ? -1 : aVal > bVal ? 1 : 0) *
        (order[i] === 'desc' ? -1 : 1);
      if (comparison !== 0) {
        return comparison;
      }
    }
    return 0;
  });
}

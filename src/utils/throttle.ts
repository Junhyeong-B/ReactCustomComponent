export default function throttle<T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
): (...args: T) => void {
  let timer: null | ReturnType<typeof setTimeout> = null;
  return function (...args: T) {
    if (timer != null) {
      return;
    }

    callback(...args);
    timer = setTimeout(() => {
      clearTimeout(timer as ReturnType<typeof setTimeout>);
      timer = null;
    }, delay);
  };
}

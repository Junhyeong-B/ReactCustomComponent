import React, { useLayoutEffect, useState } from 'react';

function useResize<T extends HTMLDivElement>(ref: React.RefObject<T>) {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    const targetElement = ref.current;
    if (targetElement == null) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      });
    });

    observer.observe(targetElement);

    return () => {
      observer.unobserve(targetElement);
    };
  }, [ref]);

  return size;
}

export default useResize;

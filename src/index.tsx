import React, { useState } from 'react';
import { useEffect } from 'react';

function debounce(cb: Function, delay = 100) {
  let timer: NodeJS.Timeout;
  return function(...args: any) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb.apply(_this, args);
    }, delay);
  };
}

export enum Direction {
  X = 'x',
  Y = 'y',
}

export type UseSmoothScrollType = {
  /** the container dom RefObject which use `overflow:scroll` */
  ref: React.RefObject<HTMLElement>;
  /** distance per frame, reflects to speed while scrolling */
  speed?: number;
  /** scroll direction, you can use 'x` for vertical, 'y` for horizontal */
  direction?: Direction | 'x' | 'y';
  threshold?: number;
};

export type AttrMapType = {
  scrollLeftTop: 'scrollLeft' | 'scrollTop';
  scrollWidthHeight: 'scrollWidth' | 'scrollHeight';
  clientWidthHeight: 'clientWidth' | 'clientHeight';
  offsetLeftTop: 'offsetLeft' | 'offsetTop';
  offsetWidthHeight: 'offsetWidth' | 'offsetHeight';
  leftTop: 'top' | 'left';
};
// get the relative distance from destination
const getRelativeDistance = (
  target: number | string | undefined,
  parent: HTMLElement,
  attrMap: AttrMapType
) => {
  if (typeof target === 'number') return target;
  if (typeof target === 'string') {
    const elm = document.querySelector(target);
    if (!elm) {
      console.warn('Please pass correct selector string for scrollTo()!');
      return 0;
    }
    const dis =
      elm.getBoundingClientRect()[attrMap.leftTop] -
      parent.getBoundingClientRect()[attrMap.leftTop];
    return dis;
  }
  return 0;
};

export const useSmoothScroll = ({
  ref,
  speed = 100,
  direction = Direction.Y,
  threshold = 1,
}: UseSmoothScrollType) => {
  const attrMap: AttrMapType = {
    leftTop: Direction.X === direction ? 'left' : 'top',
    offsetLeftTop: Direction.X === direction ? 'offsetLeft' : 'offsetTop',
    offsetWidthHeight:
      Direction.X === direction ? 'offsetWidth' : 'offsetHeight',
    scrollLeftTop: Direction.X === direction ? 'scrollLeft' : 'scrollTop',
    scrollWidthHeight:
      Direction.X === direction ? 'scrollWidth' : 'scrollHeight',
    clientWidthHeight:
      Direction.X === direction ? 'clientWidth' : 'clientHeight',
  };

  const [reachTop, setReachTop] = useState(true);
  const [reachBottom, setReachBottom] = useState(true);
  const [size, setSize] = useState(0);

  const isTopEdge = () => {
    const elm = ref.current;
    if (!elm) return false;
    return elm[attrMap.scrollLeftTop] === 0;
  };

  const isBottomEdge = () => {
    const elm = ref.current;
    if (!elm) return false;
    return (
      Math.abs(
        elm[attrMap.scrollLeftTop] +
          elm[attrMap.clientWidthHeight] -
          elm[attrMap.scrollWidthHeight]
      ) < threshold
    );
  };

  const refreshSize = debounce(() => {
    if (ref.current) {
      const size = ref.current[attrMap.clientWidthHeight];
      setSize(size);
    }
  });

  const refreshState = debounce((_evt: Event) => {
    isTopEdge() ? setReachTop(true) : setReachTop(false);
    isBottomEdge() ? setReachBottom(true) : setReachBottom(false);
  });

  const scrollTo = (target?: number | string) => {
    if (!ref || !ref.current) {
      console.warn(
        'Please pass `ref` property for your scroll container! \n Get more info at https://github.com/ron0115/react-smooth-scroll-hook'
      );
      return;
    }
    const elm = ref.current;
    if (!elm) return;
    if (!target && typeof target !== 'number') {
      console.warn(
        'Please pass a valid property for `scrollTo()`! \n Get more info at https://github.com/ron0115/react-smooth-scroll-hook'
      );
    }
    const initScrollLeftTop = elm[attrMap.scrollLeftTop];
    const distance = getRelativeDistance(target, elm, attrMap);

    let _speed = speed;
    const cb = () => {
      refreshState();

      if (distance === 0) return;

      if ((isBottomEdge() && distance > 9) || (distance < 0 && isTopEdge()))
        return;

      const gone = () =>
        Math.abs(elm[attrMap.scrollLeftTop] - initScrollLeftTop);

      if (Math.abs(distance) - gone() < _speed) {
        _speed = Math.abs(distance) - gone();
      }

      // distance to run every frame，always 1/60s
      elm[attrMap.scrollLeftTop] += _speed * (distance > 0 ? 1 : -1);

      // reach destination, threshold defaults to 1
      if (Math.abs(gone() - Math.abs(distance)) < threshold) {
        return;
      }

      requestAnimationFrame(cb);
    };
    requestAnimationFrame(cb);
  };

  // detect dom changes
  useEffect(() => {
    if (!ref.current) return;
    refreshState();
    refreshSize();
    const observer = new MutationObserver((mutationsList, _observer) => {
      // Use traditional 'for loops' for IE 11
      for (const mutation of mutationsList) {
        if (
          mutation.type === 'attributes' &&
          mutation.target instanceof Element
        ) {
          refreshSize();
        }
      }
    });
    observer.observe(ref.current, {
      attributes: true,
    });
    window.addEventListener('resize', refreshSize);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', refreshSize);
    };
  }, [ref]);

  // detect scrollbar changes
  useEffect(() => {
    if (!ref.current) return;
    const observer = new MutationObserver((mutationsList, _observer) => {
      // Use traditional 'for loops' for IE 11
      for (const mutation of mutationsList) {
        if (
          mutation.type === 'childList' &&
          mutation.target instanceof Element
        ) {
          refreshState();
        }
      }
    });
    observer.observe(ref.current, {
      childList: true,
      subtree: true,
    });
    ref.current.addEventListener('scroll', refreshState);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', refreshState);
    };
  }, [ref]);

  return {
    reachTop,
    reachBottom,
    scrollTo,
    scrollToPage: (page: number) => {
      scrollTo(page * size);
    },
    refreshState,
    refreshSize,
  };
};

export default useSmoothScroll;

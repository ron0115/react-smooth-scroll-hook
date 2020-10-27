import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  debounce,
  getAttrMap,
  AttrMapType,
  Direction,
  DirectionType,
  isWindowScrollParent,
} from './utils';

export type UseSmoothScrollType = {
  /** the container dom RefObject which use `overflow:scroll`, if scroll whole document, pass `ref = useRef(document.documentElement)` or `useRef(document.body)`. */
  ref: React.RefObject<HTMLElement>;
  /** distance per frame, reflects to speed while scrolling */
  speed?: number;
  /** scroll direction, you can use 'x` for vertical, 'y` for horizontal */
  direction?: DirectionType;
  /** allowable distance beteween nowable state the judgement edge */
  threshold?: number;
};

// get the relative distance from destination
export const getRelativeDistance = (
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
    let dis = 0;

    // if parent is document.documentElement or document.body
    if (isWindowScrollParent(parent)) {
      dis = elm.getBoundingClientRect()[attrMap.leftTop];
    } else {
      dis =
        elm.getBoundingClientRect()[attrMap.leftTop] -
        parent.getBoundingClientRect()[attrMap.leftTop];
    }

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
  const attrMap = getAttrMap(direction);

  const [reachedTop, setReachedTop] = useState(true);
  const [reachedBottom, setReachedBottom] = useState(true);
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
    isTopEdge() ? setReachedTop(true) : setReachedTop(false);
    isBottomEdge() ? setReachedBottom(true) : setReachedBottom(false);
  });

  const scrollTo = (target?: number | string, offset?: number) => {
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

    let distance = getRelativeDistance(target, elm, attrMap);

    // set a offset
    if (typeof offset === 'number') {
      distance += offset;
    }

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
  }, [ref, refreshState, refreshSize]);

  // detect scrollbar changes
  useEffect(() => {
    if (!ref.current) return;
    const elm = ref.current;
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
    observer.observe(elm, {
      childList: true,
      subtree: true,
    });
    elm.addEventListener('scroll', refreshState);
    return () => {
      observer.disconnect();
      elm && elm.removeEventListener('scroll', refreshState);
    };
  }, [ref, refreshState]);

  return {
    reachedTop,
    reachedBottom,
    containerSize: size,
    scrollTo,
    /** @deprecated replace with scrollTo(n * containerSize) */
    scrollToPage: (page: number) => {
      scrollTo(page * size);
    },
    /** @deprecated */
    refreshState,
    /** @deprecated */
    refreshSize,
  };
};
export default useSmoothScroll;

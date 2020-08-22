import React from 'react';
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
  target: number | string,
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
  speed,
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

  const scrollTo = (target: number | string) => {
    if (!ref || !ref.current) {
      console.warn(
        'Please pass `ref` property for your scroll container! \n Get more info at https://github.com/ron0115/react-smooth-scroll-hook'
      );
      return;
    }
    const elm = ref.current;
    if (!elm) return;
    if (!target) {
      console.warn(
        'Please pass a valid property for `scrollTo()`! \n Get more info at https://github.com/ron0115/react-smooth-scroll-hook'
      );
    }
    const initScrollLeftTop = elm[attrMap.scrollLeftTop];
    const distance = getRelativeDistance(target, elm, attrMap);

    if (distance === 0) return;

    if (elm.scrollTo && !speed) {
      elm.scrollTo({
        [attrMap.leftTop]: elm[attrMap.scrollLeftTop] + distance,
        behavior: 'smooth',
      });
    } else {
      let _speed = speed || 100;
      const cb = () => {
        // scroll to edge
        if (
          distance > 0
            ? elm[attrMap.scrollLeftTop] + elm[attrMap.clientWidthHeight] >=
              elm[attrMap.scrollWidthHeight]
            : elm[attrMap.scrollLeftTop] === 0
        ) {
          return;
        }
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
    }
  };
  return {
    scrollTo,
  };
};

export default useSmoothScroll;

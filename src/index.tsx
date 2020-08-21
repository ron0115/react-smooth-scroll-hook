import React from 'react';
export enum Direction {
  X = 'x',
  Y = 'y',
}

export type UseSmoothScrollType = {
  /** 传入`overflow:scroll`容器的ref */
  ref: React.RefObject<HTMLElement>;
  /** 每一帧滑动的路程，单位为1px，指定后会使用rAF模式 */
  speed?: number;
  /** 滚动方向 */
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
// 获取元素与当前滚动条位置的相对距离
const getRelativeDistance = (
  target: number | string,
  parent: HTMLElement,
  attrMap: AttrMapType
) => {
  if (!target) return 0;
  if (typeof target === 'number') return target;
  if (typeof target === 'string') {
    const elm = document.querySelector(target) as HTMLElement;
    const dis =
      elm.getBoundingClientRect()[attrMap.leftTop] -
      parent.getBoundingClientRect()[attrMap.leftTop];
    return dis;
  }
  return 0;
};

export const useSmoothScroll = ({
  ref,
  speed = 40,
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
    const elm = ref.current;
    if (!elm) return;
    const initScrollLeftTop = elm[attrMap.scrollLeftTop];
    const distance = getRelativeDistance(target, elm, attrMap);

    if (distance === 0) return;

    if (elm.scrollTo && !speed) {
      elm.scrollTo({
        [attrMap.leftTop]: elm[attrMap.scrollLeftTop] + distance,
        behavior: 'smooth',
      });
    } else {
      let _speed = speed;
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

        if (Math.abs(distance) - gone() < speed) {
          _speed = Math.abs(distance) - gone();
        }

        // 每个帧，通常为1/60s内滚动条移动的距离
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

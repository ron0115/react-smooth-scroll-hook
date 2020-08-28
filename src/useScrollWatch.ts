import { useEffect, useState } from 'react';
import {
  debounce,
  DirectionType,
  getAttrMap,
  isWindowScrollParent,
} from './utils';

type ListType = {
  href: string;
  offset?: number;
}[];

export type useScrollWathType = {
  /** the container dom RefObject which use `overflow:scroll` */
  ref: React.RefObject<HTMLElement>;
  list: ListType;
  offset?: number;
  direction?: DirectionType;
};

export const useScrollWatch = (props: useScrollWathType) => {
  const { ref, list = [], offset, direction = 'y' } = props;

  const attrMap = getAttrMap(direction);

  const getScrollTop = () => {
    const elm = ref.current;
    if (!elm) return 0;
    return elm[attrMap.scrollLeftTop];
  };

  const [scrollTop, setScrollTop] = useState(getScrollTop() || 0);

  const getPosList = () => {
    let posList = list.map(item => {
      const parent = ref.current;
      const os = typeof item.offset === 'number' ? item.offset : offset || 0;
      const elm = document.querySelector(item.href);
      if (!elm) return Infinity;
      return parent && isWindowScrollParent(parent)
        ? elm.getBoundingClientRect()[attrMap.leftTop] -
            parent!.getBoundingClientRect()[attrMap.leftTop] +
            os
        : elm.getBoundingClientRect()[attrMap.leftTop] -
            parent!.children[0].getBoundingClientRect()[attrMap.leftTop] +
            os;
    });
    return posList;
  };

  const getCurIndex = (scrollTop: number, list: typeof posList) => {
    const length = list.length;
    if (!length) return -1;

    for (let i = 0; i < length; i++) {
      if (scrollTop < list[i]) {
        return i - 1;
      }
    }

    if (scrollTop >= list[length - 1]) {
      return list.length - 1;
    }

    return -1;
  };
  const refresh = debounce(() => {
    setScrollTop(getScrollTop());
    setPosList(getPosList());
  }, 100);

  const [posList, setPosList] = useState<number[]>([]);

  useEffect(() => {
    refresh();
  }, [ref]);

  const curIndex = getCurIndex(scrollTop, posList);

  useEffect(() => {
    if (!ref.current) return;
    const elm = isWindowScrollParent(ref.current) ? window : ref.current;
    const observer = new window.MutationObserver(refresh);
    observer.observe(ref.current, {
      childList: true,
      subtree: true,
    });
    elm.addEventListener('scroll', refresh);
    return () => {
      observer.disconnect();
      elm && elm.removeEventListener('scroll', refresh);
    };
  }, [ref]);

  return {
    curIndex,
    scrollTop,
    curItem: list[curIndex] || {},
  };
};

export enum Direction {
  X = 'x',
  Y = 'y',
}
export type DirectionType = Direction | 'x' | 'y';
export type AttrMapType = {
  scrollLeftTop: 'scrollLeft' | 'scrollTop';
  scrollWidthHeight: 'scrollWidth' | 'scrollHeight';
  clientWidthHeight: 'clientWidth' | 'clientHeight';
  offsetLeftTop: 'offsetLeft' | 'offsetTop';
  offsetWidthHeight: 'offsetWidth' | 'offsetHeight';
  leftTop: 'top' | 'left';
};
export const getAttrMap = (direction: DirectionType) => {
  return {
    leftTop: Direction.X === direction ? 'left' : 'top',
    offsetLeftTop: Direction.X === direction ? 'offsetLeft' : 'offsetTop',
    offsetWidthHeight:
      Direction.X === direction ? 'offsetWidth' : 'offsetHeight',
    scrollLeftTop: Direction.X === direction ? 'scrollLeft' : 'scrollTop',
    scrollWidthHeight:
      Direction.X === direction ? 'scrollWidth' : 'scrollHeight',
    clientWidthHeight:
      Direction.X === direction ? 'clientWidth' : 'clientHeight',
  } as AttrMapType;
};

export function debounce(cb: Function, delay = 100) {
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

// judge body or documentElement
export const isWindowScrollParent = (elm: HTMLElement) => {
  return !elm.parentElement || !elm.parentElement.parentElement;
};

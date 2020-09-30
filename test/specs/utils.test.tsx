import { getAttrMap } from '../../src/utils';
import { getCurIndex } from '../../src/useScrollWatch';
describe('test src/utils', () => {
  describe('getAttrMap', () => {
    it('should return exact map when pass x', () => {
      expect(getAttrMap('x')).toMatchObject({
        scrollLeftTop: 'scrollLeft',
        scrollWidthHeight: 'scrollWidth',
        clientWidthHeight: 'clientWidth',
        offsetLeftTop: 'offsetLeft',
        offsetWidthHeight: 'offsetWidth',
        leftTop: 'left',
      });
    });
    it('should return exact map when pass y', () => {
      expect(getAttrMap('y')).toMatchObject({
        scrollLeftTop: 'scrollTop',
        scrollWidthHeight: 'scrollHeight',
        clientWidthHeight: 'clientHeight',
        offsetLeftTop: 'offsetTop',
        offsetWidthHeight: 'offsetHeight',
        leftTop: 'top',
      });
    });
  });

  describe('getCurIndex', () => {
    expect(getCurIndex(0, [])).toBe(-1);
    expect(getCurIndex(100, [101, 200])).toBe(-1);
    expect(getCurIndex(100, [100, 200])).toBe(0);
    expect(getCurIndex(102, [101, 200])).toBe(0);
    expect(getCurIndex(199, [101, 200])).toBe(0);
    expect(getCurIndex(200, [101, 200])).toBe(1);
  });
});

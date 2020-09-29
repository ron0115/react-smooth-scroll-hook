# [react-smooth-scroll-hook](https://github.com/ron0115/react-smooth-scroll-hook)

[![GitHub license](https://img.shields.io/github/license/ron0115/react-smooth-scroll-hook?style=flat)](https://github.com/ron0115/react-smooth-scroll-hook/blob/master/LICENSE)
[![npm version](http://img.shields.io/npm/v/react-smooth-scroll-hook.svg?style=flat)](https://npmjs.org/package/react-smooth-scroll-hook)
[![GitHub stars](https://img.shields.io/github/stars/ron0115/react-smooth-scroll-hook?style=flat)](https://github.com/ron0115/react-smooth-scroll-hook/stargazers)

The `useSmoothScroll` hook finish smooth scroll behaviour in react component by `requestAnimationFrame`.

> **Storybook Docs are <a target="_blank" href="https://ron0115.best/react-smooth-scroll-hook/?path=/docs/main-usesmoothscroll--docs" >Here</a>.**

## Feature

- 🚀 You don't need to warn about compatibility, it use `requsetAnimationFrame` api to finish smooth scroll behaviour.

- 👉 Provide `direction` option ,you can set `x` for horizontal, `y` for vertical.

- 💧 No Third Party dependencies, light and pure.

## Installation

```sh
npm install react-smooth-scroll-hook
```

## useSmoothScroll

### Quick Start

```tsx
import React, { useRef } from 'react';
import useSmoothScroll from 'react-smooth-scroll-hook';
export const Demo = () => {
  // A custom scroll container
  const ref = useRef(null);

  // Also support document.body / document.documentElement, and you don't need to set a ref passing to jsx
  const ref = useRef(document.body);

  const { scrollTo } = useSmoothScroll({
    ref,
    speed: 100,
    direction: 'y',
  });

  return (
    <>
      <button onClick={() => scrollTo('#item-20')}>scrollTo('#item-20')</button>
      <div
        // if use custom scroll container, pass ref
        ref={ref}
        style={{
          overflowY: 'scroll',
          maxHeight: '200px',
        }}
      >
        {Array(100)
          .fill(null)
          .map((_item, i) => (
            <div key={i} id={`item-${i}`}>
              item-{i}
            </div>
          ))}
      </div>
    </>
  );
};
```

### Props

- **ref:** `RefObject<HTMLElement>`, container which set as `overflow: scroll`, if scroll whole document, pass `ref = useRef(document.documentElement)` or `useRef(document.body)`.
- **speed:** Distance in one frame to move in `requestAnimationFrame` mode, defaults to `100`, if not provide, speed depends on native API `scrollTo`.
- **direction:** Scroll direction, `x` for horizontal or `y` for vertical.
- **threshold:** Judge scroll is finished has an error range, .defaults to `1`.

#### Returns of Hook

- **scrollTo** `(string|number) => void`

  - Pass `number`: the distance to scroll, e.g. `scrollTo(400)`
  - Pass `string`: the element seletor you want to scrollTo, meanwhile passing to `document.querySelector`, e.g. `scrollTo('#your-dom-id')`

- **reachedTop** `boolean`: Whether it has reached the top of refContainer

- **reachedBottom** `boolean`: Whether it has reached the bottom of refContainer

- **scrollToPage** `(number) => void`: Pass page(`number`), which scroll to a distance as multiples of container size(`offsetWidth`/`offsetHeight`)
  .e.g `scrollToPage(1)`,`scrollToPage(-1)`

- **refreshState** `() => void`: Manually refresh the state of `reachTop` and `reachBottom`, possibly useful in some situation.

- **refreshSize** `() => void`: Manually refresh the size of ref container, possibly useful in some situation.

### Demo

- **<a target="_blank" href="https://codesandbox.io/s/usesmoothscroll-2zt20?file=/Body.stories.tsx" >CodeSandbox</a>**
- **<a target="_blank" href="https://ron0115.best/react-smooth-scroll-hook/?path=/docs/main-usesmoothscroll--docs" >Storybook</a>**

## useScrollWatch

Proviede a `list` of dom like below, and pass the parent container `ref` to hook, it return the scrollbar current state of `scrollTop`, `curIndex`, `curItem`.

### Quick Start

```tsx
import React, { useRef } from 'react';
import { useScrollWatch } from 'react-smooth-scroll-hook';
export const ScrollConatainerMode = () => {
  const ref = useRef(null);
  const { scrollTop, curIndex, curItem } = useScrollWatch({
    ref,
    list: [
      {
        href: '#item-0',
      },
      {
        href: '#item-10',
      },
      {
        href: '#item-20',
      },
    ],
  });
  return (
    <>
      <h2>Scroll Container Mode</h2>
      <div>
        <p>
          <strong>scrollTop:</strong> {scrollTop}
        </p>
        <p>
          <strong>curIndex:</strong> {curIndex}
        </p>
        <p>
          <strong>curHref:</strong> {curItem?.href}
        </p>
      </div>
      <div
        style={{
          padding: '10px',
          maxHeight: '200px',
          overflowY: 'scroll',
        }}
        ref={ref}
      >
        {Array(100)
          .fill(null)
          .map((_item, i) => (
            <div key={i} id={`item-${i}`}>
              item-{i}
            </div>
          ))}
      </div>
    </>
  );
};
```

### Props

- **list** `Array({href, offset})`: `href` is elemet selector string, which passing to `querySelector`, such as `#element-id`
- **ref**: the same as ref of `useSmoothScroll`

### Returns of Hook

- **scrollTop** `number`: current scrollTop of scroll container.
- **curIndex** `number`: current Index of list
- **curItem** `{href, offset}`: current Item of list

### Demo

- **<a target="_blank" href="https://codesandbox.io/s/gifted-field-5b3ui?file=/UseScrollWatch.stories.tsx:9-24" >CodeSandbox</a>**
- **<a target="_blank" href="https://ron0115.best/react-smooth-scroll-hook/?path=/docs/more-usescrollwatch--docs" >Storybook</a>**

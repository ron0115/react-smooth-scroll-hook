# react-smooth-scroll-hook

The `useSmoothScroll` hook finish smooth scroll behaviour in react component by `requestAnimationFrame`.

**Examples are <a target="_blank" href="https://ron0115.best/react-smooth-scroll-hook/?path=/docs/usesmoothscroll--docs#basic" >Here</a>.**(Storybook)

**Live demo is <a target="_blank" href="https://codesandbox.io/s/reverent-cerf-ks4xh?file=/index.tsx" >Here</a>.**(Codesandbox)

## Feature

- 🚀 You don't need to warn about compatibility, it use `requsetAnimationFrame` api to finish smooth scroll behaviour.

- 👉 Provide `direction` option ,you can set `x` for horizontal, `y` for vertical.

- 💧 No Third Party dependencies, light and pure.

## Installation

```sh
npm install react-smooth-scroll-hook
```

## Basic Usage

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

## Props

- **ref:** `RefObject<HTMLElement>`, container which set as `overflow: scroll`.
- **speed:** Distance in one frame to move in `requestAnimationFrame` mode, defaults to `100`, if not provide, speed depends on native API `scrollTo`.
- **direction:** Scroll direction, `x` for horizontal or `y` for vertical.
- **threshold:** Judge scroll is finished has an error range, .defaults to `1`.

### Returns of Hook

- **scrollTo** `(string|number) => void`

  - Pass `number`: the distance to scroll, e.g. `scrollTo(400)`
  - Pass `string`: the element seletor you want to scrollTo, meanwhile passing to `document.querySelector`, e.g. `scrollTo('#your-dom-id')`

- **reachTop** `boolean`: Whether it has reached the top of refContainer

- **reachBottom** `boolean`: Whether it has reached the bottom of refContainer

- **scrollToPage** `(number) => void`: Pass page(`number`), which scroll to a distance as multiples of container size(`offsetWidth`/`offsetHeight`)
  .e.g `scrollToPage(1)`,`scrollToPage(-1)`

- **refreshState** `() => void`: Manually refresh the state of `reachTop` and `reachBottom`, possibly useful in some situation.

- **refreshSize** `() => void`: Manually refresh the size of ref container, possibly useful in some situation.

# react-smooth-scroll-hook

This is a hook to control your scrollbar in react component!

**Live demo is <a target="_blank" href="https://codesandbox.io/s/react-smooth-scroll-hook-vhudw?file=/src/App.js" >Here</a>.**

Basically; `useSmoothScroll` hook checks the `HTMLElement`'s API `scrollTo`, otherwise, use `requestAnimationFrame` to finish smooth scroll behaviour!

If you want to control the `speed` of scroll behaviour, it defaults to use `requestAnimationFrame` mode.

## Feature

- You don't need to warn about compatibility, it use rAF api on low version browsers.
- Provide `speed` on your demand, otherwise it would use the native API `element.scrollTo`.
- Provide `direction` option ,you can set `x` for vertical, `y` for horizontal.

## Installation

```sh
npm install react-smotth-scroll-hook
```

## Basic Usage

```tsx
import React, { useRef } from 'react';
import useSmoothScroll from 'react-smooth-scroll-hook';
export const Demo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll({
    ref,
  });

  return (
    <>
      <button onClick={() => scrollTo('#item-20')}>scrollTo('#item-20')</button>
      <div
        ref={ref}
        style={{
          overflowY: 'scroll',
          maxHeight: '200px',
        }}
      >
        <div>
          {Array(100)
            .fill(null)
            .map((_item, i) => (
              <div key={i} id={`item-${i}`}>
                y-{i}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
```

## Props

- **ref:** `RefObject<HTMLElement>`, container which set as `overflow: scroll`.
- **speed:** Distance in one frame to move in `requestAnimationFrame` mode, defaults to `100`, if not provide, speed depends on native API `scrollTo`.
- **direction:** Scroll direction
- **threshold:** Judge scroll is finished has an error range, .defaults to `1`.

### Returns of Hook

- `scrollTo(string | number)`

  - Pass `number`: the distance to scroll, e.g. `scrollTo(400)`
  - Pass `string`: the element seletor you want to scrollTo, passing to `document.querySelector`, e.g. `scrollTo('#your-dom-id')`

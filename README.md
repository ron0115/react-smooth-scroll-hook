# react-smooth-scroll-hook

This is a hook to control your scrollbar in react component!

Basically; `useSmoothScroll` hook use `requestAnimationFrame` to finish smooth scroll behaviour!

If you want to control the `speed` of scroll behaviour, it defaults to use `requestAnimationFrame` mode.

**Examples are <a target="_blank" href="https://ron0115.best/react-smooth-scroll-hook/?path=/docs/hooks-usesmoothscroll--direction-x#basic" >Here</a>.**(Storybook)

**Live demo is <a target="_blank" href="https://codesandbox.io/s/react-smooth-scroll-hook-vhudw?file=/src/App.js" >Here</a>.**(Codesandbox)

## Feature

- 🚀 You don't need to warn about compatibility, it use `requsetAnimationFrame` api to finish smooth scroll behaviour.

- 👉 Provide `direction` option ,you can set `x` for vertical, `y` for horizontal.

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

- **scrollTo** `(string|number) => void`

  - Pass `number`: the distance to scroll, e.g. `scrollTo(400)`
  - Pass `string`: the element seletor you want to scrollTo, meanwhile passing to `document.querySelector`, e.g. `scrollTo('#your-dom-id')`

- **reachTop** `boolean`: Whether it has reached the top of scrollContainer

- **reachBottom** `boolean`: Whether it has reached the bottom of scrollContainer

- **scrollToPage** `(number) => void`: Pass page(`number`), which scroll to a distance as multiples of container size(`offsetWidth`/`offsetHeight`)
  .e.g `scrollToPage(1)`,`scrollToPage(-1)`

- **refreshState** `() => void`: Manually refresh the state of `reachTop` and `reachBottom`, just an API as you need, and possibly useful in some situation.

- **refreshSize** `() => void`: Manually refresh the size of ref container, just an API as you need, and possibly useful in some situation.

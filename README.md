# react-smooth-scroll-hook

This is a hook to control your scrollbar in react component!

**Live demo is [here]().**

Basically; `useSmoothScroll` hook checks the `HTMLElement`'s API `scrollTo`, otherwise, use `requestAnimationFrame` to finish smooth scroll behaviour!

If you want to control the `speed` of scroll behaviour, it defaults to use `requestAnimationFrame` mode.

## Feature

- Provide `scrollTo`, you don't need to warn about compatibility, it use rAF api on low version browsers.
- Provide `speed` on your demand.
- Provide direction option ,you can set `x` for vertical, `y` for horizontal.

## Installation

```sh
npm install react-smotth-scroll-hook
```

## Basic Usage

```javascript
```

## Props

- **ref:** `RefObject<HTMLElement>`, container which set as `overflow: scroll`.
- **speed:** Distance in one frame to move, useful in `requestAnimationFrame` mode.
- **direction:** Scroll direction
- **threshold:** Judge scroll is finished has an error range, .defaults to `1`.

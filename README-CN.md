# [react-smooth-scroll-hook](https://github.com/ron0115/react-smooth-scroll-hook)

[![GitHub license](https://img.shields.io/github/license/ron0115/react-smooth-scroll-hook?style=flat)](https://github.com/ron0115/react-smooth-scroll-hook/blob/master/LICENSE)
[![npm version](http://img.shields.io/npm/v/react-smooth-scroll-hook.svg?style=flat)](https://npmjs.org/package/react-smooth-scroll-hook)
[![GitHub stars](https://img.shields.io/github/stars/ron0115/react-smooth-scroll-hook?style=flat)](https://github.com/ron0115/react-smooth-scroll-hook/stargazers)

> Powered By GE-COMPONENTS From YY GFE TEAM

简体中文 | [Englist](./README.md)

提供 `useSmoothScroll` hook 完成在 react 项目中的平滑滚动, 同时， `useScrollWatch` 会返回一些滚动过程中的有用信息。

一个无痛的方式替换原生 `scrollTo` api.

> **Storybook 文档 <a target="_blank" href="https://ron0115.best/react-smooth-scroll-hook/?path=/docs/main-usesmoothscroll--docs" >点击这里</a>.**

## Feature

- 🚀 不用担心兼容性, 使用`requsetAnimationFrame` api 实现平滑滚动.

- 👉 提供 `direction` 选项 ,设置为`x` / `y`，同时支持水平/垂直滚动.

- 💧 不依赖第三方工具，纯净且轻量.

## Installation

```sh
npm install react-smooth-scroll-hook
```

## useSmoothScroll

### 快速开始

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

- **ref:** `RefObject<HTMLElement>`, 滚动容器的 ref，通常设置为 `overflow: scroll`的容器, 如果是整个文档滚动，可以这样传入： `ref = useRef(document.documentElement)` 或者 `useRef(document.body)`.
- **speed:** `requestAnimationFrame` 模式中，一帧的滚动距离, 默认值是 `100`。
- **direction:** 滚动方向, `x` 横向 ，或者 `y` 纵向.
- **threshold:** 判断滚动是否完成的临界距离, 默认为 `1`。

#### Returns of Hook

- **scrollTo** `(string|number) => void`

  - 传入 `number`的话: 代表滚动的距离(px), 例如 `scrollTo(400)`。
  - 传入 `string`的话: 代表滚动到的目标元素，此值透传到 `document.querySelector`, 例如. `scrollTo('#your-dom-id')`

- **reachedTop** `boolean`: 是否到达 refContainer（滚动容器）的顶部。

- **reachedBottom** `boolean`: 是否到达 refContainer（滚动容器）的底部。

### Demo

- **<a target="_blank" href="https://codesandbox.io/s/usesmoothscroll-2zt20?file=/Body.stories.tsx" >CodeSandbox</a>**
- **<a target="_blank" href="https://ron0115.best/react-smooth-scroll-hook/?path=/docs/main-usesmoothscroll--docs" >Storybook</a>**

## useScrollWatch

传入如下例子的`list`数组 , 同时提供滚动容器`ref` ，实时返回当前的滚动相关状态 `scrollTop`, `curIndex`, `curItem`等.

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

- **list** `Array({href, offset})`: `href` 代表元素的 selector, 透传到`querySelector`, 如 `#element-id`
- **ref**: 见 `useSmoothScroll`

### Returns of Hook

- **scrollTop** `number`: 当前滚动的 scrollTop.
- **curIndex** `number`: 当前滚动到的`list`中的元素的`index`值
- **curItem** `{href, offset}`: 当前滚动位置的`item`

### Demo

- **<a target="_blank" href="https://codesandbox.io/s/gifted-field-5b3ui?file=/UseScrollWatch.stories.tsx:9-24" >CodeSandbox</a>**
- **<a target="_blank" href="https://ron0115.best/react-smooth-scroll-hook/?path=/docs/more-usescrollwatch--docs" >Storybook</a>**

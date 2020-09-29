import { useSmoothScroll, useScrollWatch } from 'react-smooth-scroll-hook';
import React, { useRef } from 'react';

export const ScrollConatainerMode = () => {
  const ref = useRef<HTMLDivElement>(null);
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
    offset: -10,
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

export const DirectionX = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollTop, curIndex, curItem } = useScrollWatch({
    ref,
    direction: 'x',
    list: [
      {
        href: '#x-item-0',
      },
      {
        href: '#x-item-10',
      },
      {
        href: '#x-item-20',
      },
    ],
    offset: -10,
  });
  return (
    <>
      <h2>Direction x Mode</h2>
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
          overflowX: 'scroll',
        }}
        ref={ref}
      >
        <div
          style={{
            display: 'inline-flex',
          }}
        >
          {Array(50)
            .fill(null)
            .map((_item, i) => (
              <div
                key={i}
                id={`x-item-${i}`}
                style={{
                  flexShrink: 0,
                  padding: '10px',
                }}
              >
                x-item-{i}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export const WindowMode = () => {
  const ref = useRef<HTMLElement>(document.documentElement);
  const { scrollTop, curIndex, curItem } = useScrollWatch({
    ref: ref,
    list: [
      {
        href: '#p-item-0',
      },
      {
        href: '#p-item-10',
      },
      {
        href: '#p-item-20',
      },
    ],
    // offset: -10,
  });
  return (
    <>
      <h2>Window Parent Mode</h2>
      <div
        style={{
          padding: '10px',
          position: 'relative',
        }}
        // ref={ref}
      >
        {Array(21)
          .fill(null)
          .map((_item, i) => (
            <div key={i} id={`p-item-${i}`}>
              p-item-{i}
            </div>
          ))}
      </div>
      <div
        style={{
          position: 'fixed',
          right: '0',
          top: '0',
        }}
      >
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
    </>
  );
};

export const UseScrollWatch = () => {
  return (
    <>
      <WindowMode />
      <ScrollConatainerMode />
      <DirectionX />
    </>
  );
};

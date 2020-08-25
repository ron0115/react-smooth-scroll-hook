import React, { useRef, useState } from 'react';
import useSmoothScroll from '../src/index';
import { Description } from '@storybook/addon-docs/dist/blocks';
import './index.css';

export default {
  title: '@Hooks/useSmoothScroll',
  component: useSmoothScroll,
};

export const Docs = () => (
  <>
    <Description markdown={require('../README.md').default} />{' '}
  </>
);

export const Demo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll({
    ref,
  });

  return (
    <>
      <button onClick={() => scrollTo('#y-item-20')}>
        scrollTo('#y-item-20')
      </button>
      <button onClick={() => scrollTo(400)}>scrollTo(400)</button>
      <br />
      <div
        ref={ref}
        style={{
          overflowY: 'scroll',
          maxHeight: '200px',
          padding: '10px',
        }}
      >
        {Array(100)
          .fill(null)
          .map((_item, i) => (
            <div key={i} id={`y-item-${i}`}>
              y-item-{i}
            </div>
          ))}
      </div>
    </>
  );
};
Demo.storyName = 'Basic';

export const DirectionX = () => {
  const [speed, setSpeed] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll({
    ref,
    direction: 'x',
    speed,
  });
  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(Number(evt.target.value));
  };
  return (
    <>
      <button onClick={() => scrollTo('#x-item-40')}>
        scrollTo('#x-item-40')
      </button>
      <button onClick={() => scrollTo(Infinity)}>
        scrollTo Edge - scrollTo(Infinity)
      </button>
      <button onClick={() => scrollTo(-Infinity)}>
        scrollTo Edge - scrollTo(-Infinity)
      </button>
      <button onClick={() => scrollTo(100)}>scrollTo(100)</button>
      <button onClick={() => scrollTo(-100)}>scrollTo(-100)</button>
      <br />
      <div>
        speed：
        <input
          value={speed}
          onChange={onChange}
          type="range"
          min={50}
          max={500}
        />
      </div>
      <br />

      <div
        ref={ref}
        style={{
          overflowX: 'scroll',
        }}
      >
        <div
          style={{
            display: 'flex',
            padding: '10px',
          }}
        >
          {Array(100)
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
DirectionX.storyName = 'More Use';

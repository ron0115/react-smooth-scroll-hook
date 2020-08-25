import useSmoothScroll from 'react-smooth-scroll-hook';
import React, { useRef } from 'react';

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

import useSmoothScroll from 'react-smooth-scroll-hook';
import React, { useRef } from 'react';

export const Body = () => {
  const ref = useRef<HTMLElement>(document.documentElement);
  const { scrollTo } = useSmoothScroll({
    ref,
  });

  return (
    <>
      <button onClick={() => scrollTo('#item-20')}>scrollTo('#item-20')</button>
      <button onClick={() => scrollTo(400)}>scrollTo(400)</button>
      <br />
      <div
        style={{
          padding: '10px',
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
      <button onClick={() => scrollTo('#item-20')}>scrollTo('#item-20')</button>
    </>
  );
};

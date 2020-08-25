import React, { useState, useRef } from "react";
import useSmoothScroll from "react-smooth-scroll-hook";

export const DirectionX = () => {
  const [speed, setSpeed] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollTo, reachTop, reachBottom, scrollToPage } = useSmoothScroll({
    ref,
    direction: "x",
    speed
  });
  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(Number(evt.target.value));
  };
  return (
    <>
      <button onClick={() => scrollTo("#x-item-20")}>
        scrollTo('#x-item-20')
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
        speed:{speed}
        <br />
        <input
          value={speed}
          onChange={onChange}
          type="range"
          min={100}
          max={500}
        />
        <br />
        reachTop: {String(reachTop)}
        <br />
        reachBottom: {String(reachBottom)}
      </div>
      <br />
      <button disabled={reachBottom} onClick={() => scrollToPage(1)}>
        scrollToPage(1)
      </button>
      <button disabled={reachTop} onClick={() => scrollToPage(-1)}>
        scrollToPage(-1)
      </button>

      <div
        ref={ref}
        style={{
          overflowX: "scroll"
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "10px"
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
                  padding: "10px"
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

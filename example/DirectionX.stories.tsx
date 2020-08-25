import React, { useState, useRef } from "react";
import useSmoothScroll from "react-smooth-scroll-hook";

export const DirectionX = () => {
  const [speed, setSpeed] = useState(200);
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
      <div>
        <strong>speed:{speed}</strong>
        <br />
        <input
          value={speed}
          onChange={onChange}
          type="range"
          min={100}
          max={500}
        />
      </div>
      <br />
      <strong>
        Pass string:
        <button onClick={() => scrollTo("#x-item-20")}>
          scrollTo('#x-item-20')
        </button>
      </strong>
      <br />
      <strong>
        Pass number:
        <button onClick={() => scrollTo(100)}>scrollTo(100)</button>
        <button onClick={() => scrollTo(-100)}>scrollTo(-100)</button>
      </strong>
      <br />
      <strong>
        Scroll to Edge:
        <button onClick={() => scrollTo(Infinity)}>scrollTo Bottom</button>
        <button onClick={() => scrollTo(-Infinity)}>scrollTo Top</button>
      </strong>
      <br />
      <strong>
        Scroll to Page:
        <button disabled={reachBottom} onClick={() => scrollToPage(1)}>
          scrollToPage(1)
        </button>
        <button disabled={reachTop} onClick={() => scrollToPage(-1)}>
          scrollToPage(-1)
        </button>
      </strong>
      <br />
      <br />
      reachTop: {String(reachTop)}
      <br />
      reachBottom: {String(reachBottom)}
      <br />
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

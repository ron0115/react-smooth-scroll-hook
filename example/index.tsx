import "react-app-polyfill/ie11";
import * as ReactDOM from "react-dom";
import React, { useRef } from "react";
import { useSmoothScroll } from "react-smooth-scroll-hook";
export default function App() {
  const ref = useRef(null);
  const { scrollTo } = useSmoothScroll({
    ref
  });
  return (
    <div className="App">
      <h1>react-smooth-scroll-hook</h1>
      <button onClick={() => scrollTo("#item-10")}>scrollTo("#item-10")</button>
      <button onClick={() => scrollTo(Infinity)}>scrollTo(Infinity)</button>
      <button onClick={() => scrollTo(-Infinity)}>scrollTo(-Infinity)</button>
      <br />
      <div
        ref={ref}
        style={{
          overflowY: "scroll",
          maxHeight: "400px"
        }}
      >
        {Array(100)
          .fill(null)
          .map((_item, i) => (
            <div key={i} id={`item-${i}`}>
              {i}
            </div>
          ))}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

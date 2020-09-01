import * as ReactDOM from "react-dom";
import * as React from "react";
import { Demo } from "./Demo.stories";
import { DirectionX } from "./DirectionX.stories";
// import { UseScrollWatch } from "./UseScrollWatch.stories";
import { Body } from "./Body.stories";
export default function App() {
  return (
    <div className="App">
      <h1>useSmoothScroll</h1>
      <h2>Demo.stories.tsx</h2>
      <Demo />
      <h2>Direction.stories.tsx</h2>
      <DirectionX />
      <h2>Body.stories.tsx</h2>
      <Body />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

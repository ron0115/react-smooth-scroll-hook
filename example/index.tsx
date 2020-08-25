// import "react-app-polyfill/ie11";
import * as ReactDOM from 'react-dom';
import React from 'react';
import { Demo } from './Demo.stories';
import { DirectionX } from './DirectionX.stories';
export default function App() {
  return (
    <div className="App">
      <h1>react-smooth-scroll-hook</h1>
      <h2>Demo.tsx</h2>
      <Demo />
      <h2>DirectionX.tsx</h2>
      <DirectionX />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

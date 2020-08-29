import React from 'react';
import { useScrollWatch } from '../src/index';
import './index.css';

export default {
  title: 'More/useScrollWatch',
  component: useScrollWatch,
};

import {
  ScrollConatainerMode,
  WindowMode,
  DirectionX,
} from '../example/UseScrollWatch.stories';
export const Docs = () => {
  return <></>;
};

export { WindowMode, ScrollConatainerMode, DirectionX };

// @ts-ignore
WindowMode.storyName = 'Window Parent Mode';
// @ts-ignore
ScrollConatainerMode.storyName = 'ScrollConatainer Mode';
// @ts-ignore
DirectionX.storyName = 'Direction X';

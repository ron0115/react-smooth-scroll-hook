import React from 'react';
import useSmoothScroll from '../src/index';

import './index.css';

export default {
  title: 'Main/useSmoothScroll',
  component: useSmoothScroll,
};
import { Demo } from '../example/Demo.stories';
import { DirectionX } from '../example/DirectionX.stories';
import { Body } from '../example/Body.stories';

export const Docs = () => <></>;
export { Demo, DirectionX, Body };

// @ts-ignore
Demo.storyName = 'Basic Usage';
// @ts-ignore
DirectionX.storyName = 'More Use';
// @ts-ignore
Body.storyName = 'Body Parent';

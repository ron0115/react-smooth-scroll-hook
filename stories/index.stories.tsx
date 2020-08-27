import React, { useRef, useState } from 'react';
import useSmoothScroll from '../src/index';
import { Description } from '@storybook/addon-docs/dist/blocks';
import './index.css';

export default {
  title: 'useSmoothScroll',
  component: useSmoothScroll,
};
import { Demo } from '../example/Demo.stories';
import { DirectionX } from '../example/DirectionX.stories';
import { Body } from '../example/Body.stories';
export const Docs = () => (
  <>
    <Description markdown={require('../README.md').default} />
  </>
);
export { Demo };
export { DirectionX };
export { Body };
// @ts-ignore
Demo.storyName = 'Basic';
// @ts-ignore
DirectionX.storyName = 'More Use';
// @ts-ignore
Body.storyName = 'Body Parent';

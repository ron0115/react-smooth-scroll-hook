import React from 'react';
import { Description } from '@storybook/addon-docs/dist/blocks';
import './index.css';

export default {
  title: 'Introduction',
};
export const Docs = () => (
  <>
    <Description markdown={require('../README.md').default} />
  </>
);

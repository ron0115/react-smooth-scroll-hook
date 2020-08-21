import React from 'react';
import * as ReactDOM from 'react-dom';
import { Demo } from '../stories/Demo.stories';

describe('Thing', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Demo />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

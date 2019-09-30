import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';
import {act} from 'react-dom/test-utils';

it('Message.tsx arenders without crashing', async () => {
  await act(async () => {
    const div = document.createElement('div');
    ReactDOM.render(<Message message="The message"/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
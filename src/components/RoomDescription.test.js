import React from 'react';
import ReactDOM from 'react-dom';
import RoomDescription from './RoomDescription';
import {act} from 'react-dom/test-utils';

it('RoomDescription.tsx renders without crashing', async () => {
  await act(async () => {
    const div = document.createElement('div');
    ReactDOM.render(<RoomDescription description="The room description"/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
import React from 'react';
import { action } from '@storybook/addon-actions';

import WorldMap from "../components/WorldMap";

export default {
  title: 'WorldMap',
  component: WorldMap,
  excludeStories: /.*Data$/,
};

export const noneVisitedData = {
    discoveredPaths:[],
    roomID:null,
    rooms:[]
}

export const noneVisited = () => <WorldMap
discoveredPaths={noneVisitedData.discoveredPaths}
roomID={noneVisitedData.roomID}
rooms={noneVisitedData.rooms}
/>;


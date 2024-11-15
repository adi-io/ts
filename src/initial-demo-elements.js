import React from 'react';
import { MarkerType } from '@xyflow/react';

export const nodes = [

  {
    // input node
    id: '1',
    type: 'textinput',
    position: { x: 0, y: 0 },
    data: {},
  },
  {
    // output node
    id: '2',
    type: 'circle',
    position: { x: 1000, y: 700 },
    data: {},
  },
  {
    // ocr config node
    id: '3',
    type: 'ocr',
    position: { x: 500, y: 0 },
    data: {},
  },
];

export const edges = [
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    type: 'button',
    animated: true,
    style: { stroke: 'rgb(158, 118, 255)', strokeWidth: 2 },
  },
  {
    id: 'e3-3',
    source: '3',
    target: '2',
    type: 'button',
    animated: true,
    style: { stroke: 'rgb(158, 118, 255)', strokeWidth: 2 },
  },
];


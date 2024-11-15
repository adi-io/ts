import React from "react";
import { MarkerType } from "@xyflow/react";

export const nodes = [
  {
    // Capture Document
    id: "1",
    type: "demonode1",
    position: { x: 100, y: 20 },
    data: {},
  },
  {
    // Transform Data
    id: "2",
    type: "demonode2",
    position: { x: -130, y: 200 },
    data: {},
  },
  {
    // Export Data to SAP
    id: "3",
    type: "demonode3",
    position: { x: 60, y: 440 },
    data: {},
  },
];

export const edges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "button",
    animated: true,
    style: { stroke: "rgb(158, 118, 255)", strokeWidth: 2 },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    type: "button",
    animated: true,
    style: { stroke: "rgb(158, 118, 255)", strokeWidth: 2 },
  },
];

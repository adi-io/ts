import React, { useCallback, useEffect } from "react";
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  useReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CircleNode from "./CircleNode";
import ConfigNode from "./CardConfigureOCR";
import TextNode from "./TextNode";
import ButtonEdge from "./ButtonEdge";

import {
  nodes as initialNodes,
  edges as initialEdges,
} from "./initial-elements";
import BiDirectionalEdge from "./BiDirectionalEdge";
import {
  CaptureDocument as nodeDemoCaptureDocument,
  TransformData as nodeDemoTransformData,
  ExportTo as nodeDemoExportTo,
} from "./DemoNodes";

const LandingPageReactFlow = () => {
  const nodeTypes = {
    ocr: ConfigNode,
    circle: CircleNode,
    textinput: TextNode,
    demonode1: nodeDemoCaptureDocument,
    demonode2: nodeDemoTransformData,
    demonode3: nodeDemoExportTo,
  };

  const edgeTypes = {
    bidirectional: BiDirectionalEdge,
    button: ButtonEdge,
  };

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { setViewport } = useReactFlow();

  // Custom onConnect function
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // Set viewport on component mount
  useEffect(() => {
    setViewport({ x: 180, y: 10, zoom: 1 }, { duration: 0 });

    // const timer1 = setTimeout(() => {
    //   setViewport({ x: 220, y: 50, zoom: 0.8 }, { duration: 800 });
    // }, 6000);

    const timer2 = setTimeout(() => {
      setViewport({ x: 200, y: 20, zoom: 0.9 }, { duration: 800 });
    }, 6000);

    const timer3 = setTimeout(() => {
      setViewport({ x: 200, y: -15, zoom: 1.1 }, { duration: 800 });
    }, 6000);

    // const timer3 = setTimeout(() => {
    //   setViewport({ x: 440, y: 60, zoom: 0.8 }, { duration: 800 });
    // }, 6000);

    return () => {
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [setViewport]);

  return (
    <div className="overview" style={{ width: "auto", height: "550px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        minZoom={0.5}
        maxZoom={0.6}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

const App = () => (
  <ReactFlowProvider>
    <LandingPageReactFlow />
  </ReactFlowProvider>
);

export default App;

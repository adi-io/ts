import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useCallback } from "react";
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import {
  nodes as initialDemoNodes,
  edges as initialDemoEdges,
} from "./initial-demo-elements";
import {
  CaptureDocument as nodeDemoCaptureDocument,
  TransformData as nodeDemoTransformData,
  ExportTo as nodeDemoExportTo,
} from "./ReactFlowComponents/DemoNodes";
import CircleNode from "./ReactFlowComponents/CircleNode";
import ConfigNode from "./ReactFlowComponents/CardConfigureOCR";
import TextNode from "./ReactFlowComponents/TextNode";
import ButtonEdge from "./ReactFlowComponents/ButtonEdge";
import SpeedDialTooltipOpen from "./MUIComponents/BLOCKS_SpeedDial";
import NewLandingPageComponent from "./NewLandingPageComponent";
import "@fontsource/inter";
import "@fontsource/roboto";
import BiDirectionalEdge from "./ReactFlowComponents/BiDirectionalEdge";
import CssBaseline from "@mui/material/CssBaseline";
import LandingPageReactFlow from "./ReactFlowComponents/LandingPageFlow";
import AppAppBar from "./MUIMarketing/marketing-page/components/AppAppBar";

const App = () => {
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

  const DemoPageFlowComponent = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialDemoNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialDemoEdges);

    const onConnect = useCallback(
      (params) => {
        if (
          (params.source === "1" && params.target === "2") ||
          (params.source === "2" && params.target === "1")
        ) {
          const newEdge = {
            ...params,
            id: `e${params.source}-${params.target}`,
            type: "button",
            animated: true,
            style: { stroke: "rgb(158, 118, 255)", strokeWidth: 2 },
          };
          setEdges((eds) => addEdge(newEdge, eds));
        } else {
          setEdges((eds) => addEdge(params, eds));
        }
      },
      [setEdges],
    );

    return (
      <div className="overview" style={{ width: "auto", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          attributionPosition="bottom-left"
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
        >
          <Background />
        </ReactFlow>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <CssBaseline enableColorScheme>
            <AppAppBar />
            <NewLandingPageComponent nodeComponent={LandingPageReactFlow} />
          </CssBaseline>
        </>
      ),
    },
    {
      path: "/demo",
      element: (
        <>
          <div style={{ height: "85vh", width: "95vw" }}>
            <DemoPageFlowComponent />
          </div>
          <SpeedDialTooltipOpen />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

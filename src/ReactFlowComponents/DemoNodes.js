import { Handle, useStore, Position, useReactFlow } from "@xyflow/react";
import React, { memo, Fragment, useState } from "react";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import CircularProgress from "@mui/joy/CircularProgress";
import SvgIcon from "@mui/joy/SvgIcon";
import AspectRatio from "@mui/joy/AspectRatio";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Favorite from "@mui/icons-material/Favorite";
import Autocomplete from "@mui/joy/Autocomplete";
import AutocompleteOption from "@mui/joy/AutocompleteOption";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import image1 from "./image.png";
import image2 from "./image2.png";
import image3 from "./image3.png";

import "@fontsource/inter";

const dimensionAttrs = ["width", "height"];

// CAPTURE DOCUMENT NODE  vvvvvvvvvvvvvvvvvvvv
function MultipleInteractionCard({ isSelected, onClick }) {
  return (
    <Card
      color="danger"
      invertedColors
      orientation="horizontal"
      size="lg"
      variant="plain"
      sx={{
        position: "relative",
        backgroundColor: "#90DBF4",
        overflow: "hidden",
        boxShadow: "xl",
        transition: "transform 0.2s",
        transform: isSelected ? "scale(1.05)" : "scale(1)",
        width: "100%",
        padding: "0.5rem",
        display: "flex", // Flex container
        alignItems: "center", // Center content vertically
        justifyContent: "flex-start", // Align content to the left
      }}
      onClick={onClick}
    >
      <AspectRatio
        ratio="1"
        sx={{ backgroundColor: "#90DBF4", width: 40, padding: "0" }}
      >
        <img
          src={image1}
          loading="lazy"
          alt=""
          style={{ backgroundColor: "#90DBF4" }}
        />
      </AspectRatio>
      <CardContent sx={{ padding: "0rem", marginLeft: "0rem" }}>
        {" "}
        {/* Optional spacing */}
        <Typography level="title-lg">Capture Document</Typography>
      </CardContent>
    </Card>
  );
}
export const CaptureDocument = memo(({ id }) => {
  const { setNodes } = useReactFlow();
  const [selectedId, setSelectedId] = useState(null);

  const handleCardClick = () => {
    // Update the selected ID to the current card's ID
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          width: "100%", // Make card fit the parent width
          height: "100%", // Make card fit the parent height
        }}
        style={{
          padding: "0", // Remove padding
        }}
        onClick={handleCardClick} // Handle card click
      >
        <MultipleInteractionCard
          isSelected={selectedId === id}
          onClick={handleCardClick}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          style={{
            background: "#dddddd", // Change handle color
            borderRadius: "50%", // Make it circular
            width: "12px", // Handle width
            height: "12px", // Handle height
            border: "2px solid white", // Add border
          }}
        />
      </Card>
    </>
  );
});

// TRANSFORM DATA NODE  vvvvvvvvvvvvvvvvvvvv
function MultipleInteractionCardTwo({ isSelected, onClick }) {
  return (
    <Card
      color="danger"
      invertedColors
      orientation="horizontal"
      size="lg"
      variant="plain"
      sx={{
        position: "relative",
        backgroundColor: "#FDDFEC",
        overflow: "hidden",
        boxShadow: "xl",
        transition: "transform 0.2s",
        transform: isSelected ? "scale(1.05)" : "scale(1)",
        width: "100%",
        padding: "0.5rem",
        display: "flex", // Flex container
        alignItems: "center", // Center content vertically
        justifyContent: "flex-start", // Align content to the left
      }}
      onClick={onClick}
    >
      <AspectRatio
        ratio="1"
        sx={{ width: 40, padding: "0 px", marginRight: "0" }}
      >
        <img
          src={image3}
          loading="lazy"
          alt=""
          style={{ backgroundColor: "#FDDFEC" }}
        />
      </AspectRatio>
      <CardContent sx={{ padding: "0rem", marginLeft: "0rem" }}>
        {" "}
        {/* Optional spacing */}
        <Typography level="title-lg">Transform Data</Typography>
      </CardContent>
    </Card>
  );
}

export const TransformData = memo(({ id }) => {
  const { setNodes } = useReactFlow();
  const [selectedId, setSelectedId] = useState(null);

  const handleCardClick = () => {
    // Update the selected ID to the current card's ID
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          width: "100%", // Make card fit the parent width
          height: "100%", // Make card fit the parent height
        }}
        style={{
          padding: "0", // Remove padding
        }}
        onClick={handleCardClick} // Handle card click
      >
        <MultipleInteractionCardTwo
          isSelected={selectedId === id}
          onClick={handleCardClick}
        />
        <Handle
          type="target"
          position={Position.Top}
          style={{
            background: "#dddddd", // Change handle color
            borderRadius: "50%", // Make it circular
            width: "12px", // Handle width
            height: "12px", // Handle height
            border: "2px solid white", // Add border
          }}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          style={{
            background: "#dddddd", // Change handle color
            borderRadius: "50%", // Make it circular
            width: "12px", // Handle width
            height: "12px", // Handle height
            border: "2px solid white", // Add border
          }}
        />
      </Card>
    </>
  );
});

// EXPORT TO SAP NODE  vvvvvvvvvvvvvvvvvvvv
function MultipleInteractionCardThree({ isSelected, onClick }) {
  return (
    <Card
      color="danger"
      invertedColors
      orientation="horizontal"
      size="lg"
      variant="plain"
      sx={{
        position: "relative",
        backgroundColor: "#B9FBC0",
        overflow: "hidden",
        boxShadow: "xl",
        transition: "transform 0.2s",
        transform: isSelected ? "scale(1.05)" : "scale(1)",
        width: "100%",
        padding: "0.5rem",
        display: "flex", // Flex container
        alignItems: "center", // Center content vertically
        justifyContent: "flex-start", // Align content to the left
      }}
      onClick={onClick}
    >
      <AspectRatio
        ratio="1"
        sx={{ width: 40, padding: "0 px", marginRight: "0" }}
      >
        <img
          src={image2}
          loading="lazy"
          alt=""
          style={{ backgroundColor: "#B9FBC0" }}
        />
      </AspectRatio>
      <CardContent sx={{ padding: "0rem", marginLeft: "0rem" }}>
        {" "}
        {/* Optional spacing */}
        <Typography level="title-lg">Export Data to SAP</Typography>
      </CardContent>
    </Card>
  );
}
export const ExportTo = memo(({ id }) => {
  const { setNodes } = useReactFlow();
  const [selectedId, setSelectedId] = useState(null);

  const handleCardClick = () => {
    // Update the selected ID to the current card's ID
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          width: "100%", // Make card fit the parent width
          height: "100%", // Make card fit the parent height
        }}
        style={{
          padding: "0", // Remove padding
        }}
        onClick={handleCardClick} // Handle card click
      >
        <MultipleInteractionCardThree
          isSelected={selectedId === id}
          onClick={handleCardClick}
        />
        <Handle
          type="target"
          position={Position.Top}
          style={{
            background: "#dddddd", // Change handle color
            borderRadius: "50%", // Make it circular
            width: "12px", // Handle width
            height: "12px", // Handle height
            border: "2px solid white", // Add border
          }}
        />
      </Card>
    </>
  );
});

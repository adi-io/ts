import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import ArrowForward from "@mui/icons-material/ArrowForward";
import Star from "@mui/icons-material/Star";
import TwoSidedLayout from "./components/TwoSidedLayout";
import React, { useEffect, useState } from "react";

export default function Contact() {
  useEffect(() => {
    document.title = "SwayHire | Versatile document processing for accountants";
  }, []);
  return (
    <TwoSidedLayout>
      <Typography
        level="h1"
        sx={{
          fontWeight: "xl",
          fontSize: "clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)",
        }}
      >
        Let's Start a Conversation
      </Typography>
      <Typography
        textColor="text.secondary"
        sx={{ fontSize: "lg", lineHeight: "lg" }}
      >
        Our team is available for you. Do not hesitate to open a meeting with
        Adi. Get in Touch With Us via Email adi@swayhire.com
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          my: 2,
          "& > *": { flex: "auto" },
        }}
      >
        <Button size="lg" variant="outlined" color="neutral">
          Send an email
        </Button>
        <Button
          component="a"
          href="https://calendar.app.google/7eqamkDghfa4MtLE9"
          size="lg"
          endDecorator={<ArrowForward fontSize="xl" />}
          target="_blank"
          rel="noopener noreferrer"
        >
          Meeting invite link
        </Button>
      </Box>
      <Box
        sx={(theme) => ({
          display: "flex",
          columnGap: 4.5,
          rowGap: 1.5,
          textAlign: "center",
          alignSelf: "stretch",
          "& > *": {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            alignItems: "center",
          },
          [theme.breakpoints.up(834)]: {
            textAlign: "left",
            "& > *": {
              alignItems: "initial",
            },
          },
        })}
      >
        <div>
          <Typography
            endDecorator={<Star fontSize="xl4" sx={{ color: "warning.300" }} />}
            sx={{ fontSize: "xl4", fontWeight: "lg" }}
          >
            4.8
          </Typography>
          <Typography textColor="text.secondary">
            Rating from our satisfied families and wifes
          </Typography>
        </div>
        <div>
          <Typography sx={{ fontSize: "xl4", fontWeight: "lg" }}>1</Typography>
          <Typography textColor="text.secondary">
            Active user with multiple contractors
          </Typography>
        </div>
      </Box>
      <Typography
        level="body-xs"
        sx={{
          position: "absolute",
          top: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      ></Typography>
    </TwoSidedLayout>
  );
}

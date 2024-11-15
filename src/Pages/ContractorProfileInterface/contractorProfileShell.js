import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import ProfileForm from "./contractorProfile";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../PageComponents/Sidebar";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ArrowLeftRounded from "@mui/icons-material/ArrowLeftRounded";
export default function ChangeInformationForUser() {
  const navigate = useNavigate();

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Sidebar />
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: "calc(12px + var(--Header-height))",
              sm: "calc(12px + var(--Header-height))",
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            height: "100dvh",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Breadcrumbs
              size="sm"
              aria-label="breadcrumbs"
              separator={<ChevronRightRoundedIcon fontSize="sm" />}
              sx={{ pl: 0 }}
            >
              <Link
                underline="none"
                color="neutral"
                href="#some-link"
                aria-label="Home"
              >
                <HomeRoundedIcon />
              </Link>
              <Link
                underline="hover"
                color="neutral"
                sx={{ fontSize: 12, fontWeight: 500 }}
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Link>
              <Typography
                color="primary"
                sx={{ fontWeight: 500, fontSize: 12 }}
              >
                Profile Information of Contractor
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box
            sx={{
              display: "flex",
              mb: 1,
              gap: 1,
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "start", sm: "center" },
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Typography level="h2" component="h1">
              Contractor info
            </Typography>
            <Button
              color="secondary"
              startDecorator={<KeyboardBackspaceIcon />}
              size="sm"
              onClick={() => navigate("/dashboard")}
            >
              Back to reports
            </Button>
          </Box>
          <ProfileForm />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

import * as React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useClerk,
  useSignIn,
} from "@clerk/clerk-react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";

import ForgotPassword from "./ForgotPassword";
import { GoogleIcon, FacebookIcon, SitemarkIcon } from "./CustomIcons";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function SignInCard() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const { signIn, isLoaded: signInLoaded } = useSignIn();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validateInputs = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const handleSignInWithGoogle = async () => {
    try {
      if (!signInLoaded) return;

      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/dashboard",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err) {
      console.error("Error signing in with Google", err);
    }
  };

  const handleEmailSignIn = async (event) => {
    event.preventDefault();
    if (!validateInputs() || !signInLoaded) return;

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      setIsLoading(true);

      // Start the sign-in process with email
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status !== "complete") {
        // If 2FA is required or other factors
        const completeSignIn = await signInAttempt.prepareFirstFactor({
          strategy: "password",
          password,
        });

        if (completeSignIn.status === "complete") {
          // Redirect to dashboard or desired page
          window.location.href = "/dashboard";
        }
      } else {
        // If no 2FA, redirect directly
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.error("Error signing in:", err);

      // Handle specific error cases
      if (err.errors) {
        err.errors.forEach((error) => {
          switch (error.code) {
            case "form_identifier_not_found":
              setEmailError(true);
              setEmailErrorMessage("Email not found");
              break;
            case "form_password_incorrect":
              setPasswordError(true);
              setPasswordErrorMessage("Incorrect password");
              break;
            default:
              // Handle other error cases
              setEmailError(true);
              setEmailErrorMessage("An error occurred during sign in");
              break;
          }
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!signInLoaded) {
    return (
      <Card variant="outlined">
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <SitemarkIcon />
        </Box>
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleEmailSignIn}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={emailError ? "error" : "primary"}
              disabled={signInLoaded}
            />
          </FormControl>

          <FormControl>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Link
                component="button"
                type="button"
                onClick={handleClickOpen}
                variant="body2"
                sx={{ alignSelf: "baseline" }}
              >
                Forgot your password?
              </Link>
            </Box>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              fullWidth
              variant="outlined"
              color={passwordError ? "error" : "primary"}
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={signInLoaded}
          ></Button>

          {/* ... rest of your JSX ... */}

          <Button
            fullWidth
            variant="outlined"
            onClick={handleSignInWithGoogle}
            startIcon={<GoogleIcon />}
            disabled={signInLoaded}
          >
            Loading ...
          </Button>
        </Box>
      </Card>
    );
  }

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <SitemarkIcon />
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleEmailSignIn}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
        }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={emailError ? "error" : "primary"}
          />
        </FormControl>

        <FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: "baseline" }}
            >
              Forgot your password?
            </Link>
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            required
            fullWidth
            variant="outlined"
            color={passwordError ? "error" : "primary"}
          />
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
          onClick={handleEmailSignIn}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>

        <Button
          fullWidth
          variant="outlined"
          onClick={handleSignInWithGoogle}
          startIcon={<GoogleIcon />}
          disabled={isLoading}
        >
          Sign in with Google
        </Button>
      </Box>
    </Card>
  );
}

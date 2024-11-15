import * as React from "react";
import { useState, useEffect } from "react";
import FormLabel from "@mui/joy/FormLabel";
import Grid from "@mui/joy/Grid";
import Button from "@mui/joy/Button";
import Alert from "@mui/joy/Alert";
import Input from "@mui/joy/Input";
import { Snackbar } from "@mui/joy";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import SaveIcon from "@mui/icons-material/Save";

export default function ProfileForm() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });
  const [placeholders, setPlaceholders] = useState({});

  useEffect(() => {
    const fetchPlaceholders = async () => {
      try {
        const response = await fetch("/api/address");
        if (response.ok) {
          const data = await response.json();
          setPlaceholders(data);
        }
      } catch (error) {
        console.error("Error fetching placeholders:", error);
      }
    };

    fetchPlaceholders();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("/api/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSnackbar({
          open: true,
          severity: "success",
          message: "Form submitted successfully!",
        });
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Error submitting form. Please try again.",
      });
      console.error("Error:", error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Sheet
      variant="outlined"
      sx={{
        maxWidth: 800,
        mx: "auto", // margin left & right
        my: 4, // margin top & bottom
        py: 3, // padding top & bottom
        px: 2, // padding left & right
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: "sm",
      }}
    >
      <Typography level="h4" component="h1">
        Profile Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <FormLabel>First name *</FormLabel>
              <Input
                name="firstName"
                placeholder={placeholders.firstName || "John"}
                autoComplete="given-name"
                required
              />
            </Box>
          </Grid>
          <Grid xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <FormLabel>Last name *</FormLabel>
              <Input
                name="lastName"
                placeholder={placeholders.lastName || "Snow"}
                autoComplete="family-name"
                required
              />
            </Box>
          </Grid>
          <Grid xs={12}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <FormLabel>Address line 1 *</FormLabel>
              <Input
                name="address1"
                placeholder={placeholders.address1 || "Street name and number"}
                autoComplete="street-address"
                required
              />
            </Box>
          </Grid>
          <Grid xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <FormLabel>City *</FormLabel>
              <Input
                name="city"
                placeholder={placeholders.city || "Prague"}
                autoComplete="address-level2"
                required
              />
            </Box>
          </Grid>
          <Grid xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <FormLabel>Zip / Postal code *</FormLabel>
              <Input
                name="zip"
                placeholder={placeholders.zip || "12345"}
                autoComplete="postal-code"
                required
              />
            </Box>
          </Grid>
          <Grid xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <FormLabel>Country *</FormLabel>
              <Input
                name="country"
                placeholder={placeholders.country || "Czech Republic"}
                autoComplete="country-name"
                required
              />
            </Box>
          </Grid>
          <Grid xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <FormLabel>ICO *</FormLabel>
              <Input
                name="ico"
                placeholder={placeholders.ICO || "Enter ICO"}
                required
              />
            </Box>
          </Grid>
          <Grid xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <FormLabel>DIC *</FormLabel>
              <Input
                name="dic"
                placeholder={placeholders.DIC || "Enter DIC"}
                required
              />
            </Box>
          </Grid>
          <Grid xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <FormLabel>Bank account number *</FormLabel>
              <Input
                name="bankAccNumber"
                type="text"
                inputMode="numeric"
                placeholder={
                  placeholders.BankAccNumber || "Enter bank account number"
                }
                required
              />
            </Box>
          </Grid>
          <Grid xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <FormLabel>Bank Code *</FormLabel>
              <Input
                name="bankCode"
                type="text"
                inputMode="numeric"
                placeholder={placeholders.BankCode || "Enter bank code"}
                required
              />
            </Box>
          </Grid>
          <Grid xs={12}>
            <Button type="submit" sx={{ mt: 2, gap: 1 }}>
              <SaveIcon />
              Save &amp; Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          variant="solid"
          color={snackbar.severity}
          onClose={handleSnackbarClose}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Sheet>
  );
}

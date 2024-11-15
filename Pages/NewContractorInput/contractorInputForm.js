import * as React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useState } from "react";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Autocomplete from "@mui/joy/Autocomplete";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import IconButton from "@mui/joy/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/joy/Snackbar";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

// Inside your component:
export default function ContractorInvoicesPage() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      month: "",
      year: "",
      lineItems: [{ department: "", discription: "", hours: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "lineItems",
  });

  const lineItems = watch("lineItems");

  const totalAmount = lineItems.reduce((sum, item) => {
    const hours = parseFloat(item.hours) || 0;
    return sum + hours * 5;
  }, 0);

  const months = [
    { label: "January", value: "January" },
    { label: "February", value: "February" },
    { label: "March", value: "March" },
    { label: "April", value: "April" },
    { label: "May", value: "May" },
    { label: "June", value: "June" },
    { label: "July", value: "July" },
    { label: "August", value: "August" },
    { label: "September", value: "September" },
    { label: "October", value: "October" },
    { label: "November", value: "November" },
    { label: "December", value: "December" },
  ];

  const years = Array.from({ length: 10 }, (_, i) => {
    const year = new Date().getFullYear() - 5 + i;
    return { label: year.toString(), value: year.toString() };
  });

  const departments = [
    { label: "Marketing", value: "Marketing" },
    { label: "Sales", value: "Sales" },
  ];

  const descriptions = [{ label: "Google ads - G1", value: "Gads" }];

  const onSubmit = async (data) => {
    try {
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSnackbarMessage("Form submitted successfully!");
        setOpenSnackbar(true);
      } else {
        setSnackbarMessage("Error submitting form");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage("Error submitting form");
      setOpenSnackbar(true);
    }
  };

  return (
    <Sheet>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} sx={{ maxWidth: 800, margin: "auto", p: 2 }}>
          {/* Month and Year Selection */}
          <Stack direction="row" spacing={2}>
            <FormControl error={!!errors.month}>
              <FormLabel>Month</FormLabel>
              <Controller
                name="month"
                control={control}
                rules={{ required: "Month is required" }}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={months}
                    getOptionLabel={(option) => option.label || ""}
                    onChange={(_, data) => field.onChange(data?.value)}
                    value={
                      months.find((option) => option.value === field.value) ||
                      null
                    }
                    placeholder="Select month"
                  />
                )}
              />
            </FormControl>

            <FormControl error={!!errors.year}>
              <FormLabel>Year</FormLabel>
              <Controller
                name="year"
                control={control}
                rules={{ required: "Year is required" }}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={years}
                    getOptionLabel={(option) => option.label || ""}
                    onChange={(_, data) => field.onChange(data?.value)}
                    value={
                      years.find((option) => option.value === field.value) ||
                      null
                    }
                    placeholder="Select year"
                  />
                )}
              />
            </FormControl>
          </Stack>

          {/* Line Items */}
          {fields.map((field, index) => (
            <Stack
              key={field.id}
              direction="row"
              spacing={2}
              alignItems="flex-end"
            >
              <FormControl error={!!errors.lineItems?.[index]?.department}>
                <FormLabel>Department</FormLabel>
                <Controller
                  name={`lineItems.${index}.department`}
                  control={control}
                  rules={{ required: "Department must be selected" }}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      options={departments}
                      getOptionLabel={(option) => option.label || ""}
                      onChange={(_, data) => field.onChange(data?.value)}
                      value={
                        departments.find(
                          (option) => option.value === field.value,
                        ) || null
                      }
                      placeholder="Select department"
                    />
                  )}
                />
              </FormControl>

              <FormControl error={!!errors.lineItems?.[index]?.discription}>
                <FormLabel>Description</FormLabel>
                <Controller
                  name={`lineItems.${index}.discription`}
                  control={control}
                  rules={{ required: "Description must be selected" }}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      options={descriptions}
                      getOptionLabel={(option) => option.label || ""}
                      onChange={(_, data) => field.onChange(data?.value)}
                      value={
                        descriptions.find(
                          (option) => option.value === field.value,
                        ) || null
                      }
                      placeholder="Select description"
                    />
                  )}
                />
              </FormControl>

              <FormControl error={!!errors.lineItems?.[index]?.hours}>
                <FormLabel>Hours</FormLabel>
                <Input
                  type="number"
                  {...register(`lineItems.${index}.hours`, {
                    required: "Hours are required",
                    validate: {
                      positive: (value) =>
                        parseFloat(value) > 0 || "Hours must be greater than 0",
                    },
                  })}
                  placeholder="Enter hours"
                />
              </FormControl>

              <IconButton
                variant="outlined"
                color="danger"
                onClick={() => remove(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          ))}

          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="neutral"
              onClick={() =>
                append({ department: "", discription: "", hours: "" })
              }
            >
              <AddIcon />
              Add Line
            </Button>

            <Button type="submit" color="primary">
              Submit
            </Button>
          </Stack>

          {openSnackbar && (
            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={() => setOpenSnackbar(false)}
              color={snackbarMessage.includes("Error") ? "danger" : "success"}
            >
              {snackbarMessage}
            </Snackbar>
          )}
        </Stack>
      </form>
    </Sheet>
  );
}

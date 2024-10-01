import apiClient from "../services/apiClient.js";
import React, { useState } from "react";
import { validateGoalForm } from '../utils/validateGoalForm.js';

import {
  Box,
  Typography,
  TextField,
  Grid,
  Slider,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { Button } from "@mui/material";

function CreateGoal() {
  const [goalFormData, setGoalFormData] = useState({
    type: "",
    targetValue: 0,
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

// Function to handle the form submission event
const handleSubmit = (event) => {
  event.preventDefault(); // Prevent default form submission behavior (e.g., page reload)
  
  // Clear any existing messages before processing the form
  clearMessages();

  // Validate the form and, if valid, proceed with goal creation
  if (validateAndSetMessages(goalFormData)) {
    createGoal(goalFormData);
  }
};

// Function to clear any success or error messages
const clearMessages = () => {
  setSuccessMessage('');
  setErrorMessage('');
};

// Function to validate the goal form and handle validation messages
const validateAndSetMessages = (formData) => {
  const validationResult = validateGoalForm(formData);

  if (!validationResult.isValid) {
    setErrorMessage('Error: Please review your inputs and try again');
    return false; // Prevent form submission if validation fails
  }

  return true;
};

// Function to create a new goal by making a POST request
const createGoal = async (formData) => {
  try {
    console.log("Creating new goal with data:", formData);
    // Sends a POST request to the backend with the form data
    await apiClient.post("/create-goal", formData);
    handleGoalSuccess(); // Handle the success case
  } catch (error) {
    handleGoalError(error); // Handle the error case
  }
};

// Function to handle a successful goal creation
const handleGoalSuccess = () => {
  console.log("Goal created successfully!");
  setSuccessMessage('New goal successful!');
};

// Function to handle errors during goal creation
const handleGoalError = (error) => {
  console.error("Error creating goal:", error);
  setErrorMessage('Failed to create a new goal. Please try again.');
};


  return (
    <Box
      sx={{
        top: "4rem",
        right: 0,
        bottom: 0,
        width: "80%",
        padding: "2%",
        borderRadius: "10px",
        height: "calc(100vh - 4rem)",
        overflowY: "auto",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          marginTop: "4%",
          marginBottom: "2%",
          color: "#5B5753",
          fontSize: "1.4rem",
          fontWeight: "600",
        }}
      >
        Set up your goal here:
      </Typography>
      {/* Set up your goal here:   Select a goal type*/}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel 
                id="goal-type-select"
                sx={{
                  backgroundColor: "#5E5E5E", // question font background color
                  padding: "0 2%",
                  color: "#CACACA", // font color when unfocused
                  borderRadius: "10px",
                  "&.Mui-focused": {
                    // font color when focused
                    color: "#F8DEBD",
                    borderRadius: "10px",
                  },
                }}
              >
                Select a goal type
              </InputLabel>
              <Select                
                data-testid="goal-type-select"
                name="type" // Add name to ensure proper handling
                value={goalFormData.type}
                onChange={handleChange}
                label="Select a goal type"
                sx={{
                  backgroundColor: "#5E5E5E",
                  borderRadius: "10px",
                  "& .MuiInputBase-input": {
                    color: "#F4F4F4", // text in box(answer) - text color
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: "#6F6F6F", // dropdown background color
                      color: "#F4F4F4", // dropdown text color
                    },
                  },
                }}
              >
                <MenuItem value="sleep">Sleep (Hours)</MenuItem>
                <MenuItem data-testid="goal-type-weight" value="weight">Weight (lbs)</MenuItem>
                <MenuItem value="steps">Steps (Step Count)</MenuItem>
                <MenuItem value="water">Water Intake (Glasses)</MenuItem>
                <MenuItem value="exercise">Exercise (Minutes)</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                data-testid="goal-targetValue-select"
                type="number"
                name="targetValue"
                label="Target Value"
                value={goalFormData.targetValue}
                onChange={handleChange}
                required
                InputLabelProps={{
                  sx: {
                    backgroundColor: "#5E5E5E", // question font background color
                    padding: "0 2%",
                    color: "#CACACA", // font color when unfocused
                    borderRadius: "10px",
                    "&.Mui-focused": {
                      // font color when focused
                      color: "#F8DEBD",
                      borderRadius: "10px",
                    },
                  },
                }}
                InputProps={{
                  sx: {
                    backgroundColor: "#5E5E5E",
                    borderRadius: "10px",
                    "& .MuiInputBase-input": {
                      color: "#F4F4F4", // text in box(answer) - text color
                    },
                  },
                }}
                fullWidth
              />
            </FormControl>
          </Grid>
          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              data-testid="goal-submit-button"
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#3A3A3A",
                color: "#CACACA",
                borderRadius: "10px",
                padding: "1% 4%",
                "&:hover": {
                  backgroundColor: "#F8DEBD",
                  color: "#303030",
                },
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      {errorMessage && <p style={{ color: '#E95D5C', fontWeight: "bold"}}>{errorMessage}</p>}
      {successMessage && <p style={{ color: '#008000', fontWeight: "bold" }}>{successMessage}</p>}
    </Box>
  );
}
export default CreateGoal;

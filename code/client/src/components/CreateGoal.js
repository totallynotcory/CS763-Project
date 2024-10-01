import apiClient from "../services/apiClient.js";
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Button } from "@mui/material";
import {
  box,
  title,
  inputLable,
  inputBackground,
  menuPropsStyles,
  submitButton,
} from "./style/styles.js";

function CreateGoal() {
  const [goalFormData, setGoalFormData] = useState({
    type: "",
    targetValue: 0,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior (e.g. page reload)
    try {
      console.log(goalFormData);
      // Sends a POST request to the backend with the form data
      await apiClient.post("/create-goal", goalFormData);
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  };

  return (
    <Box sx={box}>
      <Typography variant="h6" gutterBottom sx={title}>
        Set up your goal here:
      </Typography>
      {/* Set up your goal here:  */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/*  Select a goal type */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel sx={inputLable}>Select a goal type</InputLabel>
              <Select
                name="type" // Add name to ensure proper handling
                value={goalFormData.type}
                onChange={handleChange}
                label="Select a goal type"
                sx={inputBackground}
                MenuProps={menuPropsStyles}
              >
                <MenuItem value="sleep">Sleep (Hours)</MenuItem>
                <MenuItem value="weight">Weight (lbs)</MenuItem>
                <MenuItem value="steps">Steps (Step Count)</MenuItem>
                <MenuItem value="water">Water Intake (Glasses)</MenuItem>
                <MenuItem value="exercise">Exercise (Minutes)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* Target value */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                type="number"
                name="targetValue"
                label="Target Value"
                value={goalFormData.targetValue}
                onChange={handleChange}
                required
                InputLabelProps={{
                  sx: inputLable,
                }}
                InputProps={{
                  sx: inputBackground,
                }}
                fullWidth
              />
            </FormControl>
          </Grid>
          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" sx={submitButton}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
export default CreateGoal;

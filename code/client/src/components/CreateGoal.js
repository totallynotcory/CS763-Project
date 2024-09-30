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
                <MenuItem value="weight">Weight (lbs)</MenuItem>
                <MenuItem value="steps">Steps (Step Count)</MenuItem>
                <MenuItem value="water">Water Intake (Glasses)</MenuItem>
                <MenuItem value="exercise">Exercise (Minutes)</MenuItem>
              </Select>
            </FormControl>
          </Grid>

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
    </Box>
  );
}
export default CreateGoal;

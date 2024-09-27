//IN PROGRESS

import { useState } from "react";
import apiClient from "../services/apiClient.js";
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

function CreateUser() {
  // State for form input values
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    email: "",
    passwordHashed: "",
  });

  // Handle input changes and update formData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior (e.g. page reload)
    try {
      await apiClient.post("/create-user", formData);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <Box
      sx={{
        position: "fixed", // Change to fixed to attach it to the screen
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#E2DDD5", // Background color
        display: "flex",
        justifyContent: "flex-end", // Align the content to the right
        height: "100vh",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "4rem",
          right: 0,
          bottom: 0,
          width: "35%",
          padding: "2%",
          backgroundColor: "#303030",
          borderRadius: "10px",
          color: "white",
          height: "calc(100vh - 4rem)",
          overflowY: "auto",
        }}
      >
        <form onSubmit={handleSubmit}>
          <label>Name (First & Last)</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            type="text"
            name="passwordHashed"
            value={formData.passwordHashed}
            onChange={handleChange}
          />

          <button type="submit">Submit</button>
        </form>
      </Box>
    </Box>
  );
}

export default CreateUser;

import { useEffect, useState } from "react";
import apiClient from "../services/apiClient.js";
import { Box, Typography, TextField, MenuItem, Button } from "@mui/material";
import { box, bigTitle, inputBackground, menuPropsStyles, submitButton } from "./style/styles.js";

function ManageProfile() {
  
  const [data, setData] = useState({
    name: "",
    email: "",
    passwordHashed: "",
    gender: "",
    dob: "",
    height: { feet: "", inches: "" },
    }); // To store the profile data
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    apiClient
      .get("/manage-profile") // Fetch user profile data from the backend (e.g., /manage-profile)
      .then((res) => {
        setData(res.data); 
      })
      .catch((err) => {
        setError("Error fetching profile data. Try refreshing.");
        console.log(err);
      });
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  // Handle input change for height
  const handleHeightChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      height: { ...prevData.height, [name]: value },
    }));
  };

  const handleSubmit = () => {
    apiClient
      .post("/manage-profile", data)
      .then((res) => {
        console.log("Profile updated successfully");
      })
      .catch((err) => {
        console.log("Error updating profile", err);
      });
  };

//   if (error) {
//     console.log(data)
//     return <p>{error}</p>;
//   }

  return (
    <Box sx={box}>
      <Typography variant="h6" gutterBottom sx={bigTitle}>
        Manage Profile
      </Typography>
      {/* If there is data returned, render the below in <div> section */}
      {error ? (
        <p>{error}</p>
      ) : (
        <form>
          <TextField
            label="Name"
            name="name"
            value={data.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={inputBackground}
            MenuProps={menuPropsStyles}
          />
          <TextField
            label="Email"
            name="email"
            value={data.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={inputBackground}
            MenuProps={menuPropsStyles}
          />
          <TextField
            label="Password"
            name="passwordHashed"
            // type="password"
            value={data.passwordHashed}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={inputBackground}
            MenuProps={menuPropsStyles}
          />
          <TextField
            select
            label="Gender"
            name="gender"
            value={data.gender}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={inputBackground}
            MenuProps={menuPropsStyles}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="nonbinary">Non-Binary</MenuItem>
            <MenuItem value="na">Prefer not to disclose</MenuItem>
          </TextField>
          <TextField
            label="Date of Birth"
            name="dob"
            type="date"
            value={data.dob}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            sx={inputBackground}
            MenuProps={menuPropsStyles}
          />
          <TextField
            label="Height (Feet)"
            name="feet"
            value={data.height.feet}
            onChange={handleHeightChange}
            type="number"
            margin="normal"
            sx={inputBackground}
            MenuProps={menuPropsStyles}
          />
          <TextField
            label="Height (Inches)"
            name="inches"
            value={data.height.inches}
            onChange={handleHeightChange}
            type="number"
            margin="normal"
            sx={inputBackground}
            MenuProps={menuPropsStyles}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            sx={submitButton}
          >
            Update Profile
          </Button>
        </form>
      )}
    </Box>
  );
}

export default ManageProfile;

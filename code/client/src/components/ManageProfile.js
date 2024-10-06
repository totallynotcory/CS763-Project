import { useEffect, useState } from "react";
import apiClient from "../services/apiClient.js";
import { Box, Typography, TextField, MenuItem, Button } from "@mui/material";
import { box, bigTitle, inputBackground, menuPropsStyles, submitButton } from "./style/styles.js";
import { authenticated } from "../utils/authenticate.js";

function ManageProfile() {
  


  const [profileData, setProfileData] = useState({
    userId: "",
    email: "",
    name: "",
    gender: "",
    dob: { year: 1900, month: 1, day: 1 },
    height: { feet: "", inches: "" },
    });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = authenticated()

    if (token) {

    }

    apiClient
      .get("/api/users/manage-profile", {
        headers: { Authorization: `Bearer ${token}` }
      }) // Fetch user profile data from the backend (e.g., /manage-profile)
      .then((res) => {
        setProfileData(res.data); 
      })
      .catch((err) => {
        setError("Error fetching profile data. Try refreshing.");
        console.log(err);
      });
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
  };
  
  // Handle input change for height
  const handleHeightChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      height: { ...prevData.height, [name]: value },
    }));
  };

  const handleDobChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      dob: { ...prevData.dob, [name]: Number(value) }, // Convert to Number
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior (e.g., page reload)
    
    // Clear any existing messages before processing the form
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await apiClient.post("/api/users/manage-profile", profileData);
      console.log("Updating profile")
      setSuccessMessage('Profile updated!');
    } catch (err) {
      console.log("Error updating profile", err);
      setErrorMessage('Error: Failed to update profile. Please try again');
    }
  };

  return (
    <Box sx={box}>
      <Typography variant="h6" gutterBottom sx={bigTitle}>
        Manage Profile
      </Typography>
      {/* If there is data returned, renders in below section */}
      {error ? (
        <p>{error}</p>
      ) : (
        <form>
          <TextField
            label="User ID"
            name="userId"
            value={profileData.userId}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true, // Makes it non-editable
            }}
            // sx={inputBackground}
            menuprops={menuPropsStyles}
          />
          <TextField
            label="Email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true, // Makes it non-editable
            }}
            // sx={inputBackground}
            menuprops={menuPropsStyles}
          />
          <TextField
            label="Name"
            name="name"
            value={profileData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={inputBackground}
            menuprops={menuPropsStyles}
          />
          <TextField
            select
            label="Gender"
            name="gender"
            value={profileData.gender}
            onChange={handleChange}
            fullWidth
            margin="normal"
            sx={inputBackground}
            menuprops={menuPropsStyles}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="nonbinary">Non-Binary</MenuItem>
            <MenuItem value="na">Prefer not to disclose</MenuItem>
          </TextField>
          <TextField
            label="Year of Birth"
            name="year"
            type="number"
            value={profileData.dob.year}
            onChange={handleDobChange}
            margin="normal"
            sx={inputBackground}
            menuprops={menuPropsStyles}
          />
          <TextField
            select
            label="Month of Birth"
            name="month"
            value={profileData.dob.month}
            onChange={handleDobChange}
            margin="normal"
            sx={inputBackground}
            menuprops={menuPropsStyles}
          >
            {Array.from({ length: 12 }, (_, index) => {
              const monthNumber = index + 1; // Month numbers range from 1 to 12
              return (
                <MenuItem key={monthNumber} value={monthNumber}>
                  {monthNumber < 10 ? `0${monthNumber}` : monthNumber} {/* Format month as 01, 02, ... */}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            select
            label="Day of Birth"
            name="day"
            value={profileData.dob.day}
            onChange={handleDobChange}
            margin="normal"
            sx={inputBackground}
            menuprops={menuPropsStyles}
          >
            {Array.from({ length: 31 }, (_, index) => {
              const dayNumber = index + 1; // Day numbers range from 1 to 31
              return (
                <MenuItem key={dayNumber} value={dayNumber}>
                  {dayNumber < 10 ? `0${dayNumber}` : dayNumber} {/* Format day as 01, 02, ... */}
                </MenuItem>
              );
            })}
          </TextField>
          <br></br>
          <TextField
            label="Height (Feet)"
            name="feet"
            value={profileData.height.feet}
            onChange={handleHeightChange}
            type="number"
            margin="normal"
            sx={inputBackground}
            menuprops={menuPropsStyles}
          />
          <TextField
            label="Height (Inches)"
            name="inches"
            value={profileData.height.inches}
            onChange={handleHeightChange}
            type="number"
            margin="normal"
            sx={inputBackground}
            menuprops={menuPropsStyles}
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
      {errorMessage && <p style={{ color: '#E95D5C', fontWeight: "bold"}}>{errorMessage}</p>}
      {successMessage && <p style={{ color: '#008000', fontWeight: "bold" }}>{successMessage}</p>}
    </Box>
  );
}

export default ManageProfile;

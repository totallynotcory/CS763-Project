import { useEffect, useState } from "react";
import apiClient from "../services/apiClient.js";

import {
  Box,
  Typography
} from "@mui/material";
import {box, bigTitle } from "./style/styles.js";

function ManageProfile() {
  
  const [data, setData] = useState(null); // To store the profile data
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

  if (error) {
    console.log(data)
    return <p>{error}</p>;
  }

  return (
    <Box sx={box}>
      <Typography variant="h6" gutterBottom sx={bigTitle}>
        Manage Profile
      </Typography>
      {/* If there is data returned, render the below in <div> section */}
      {data ? (
        <div>
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
          <p>Password: {data.passwordHashed}</p>
          <p>Gender: {data.gender}</p>
          <p>Date of Birth: {data.dob}</p>
          <p>Height: {data.height.feet} {data.height.inches}</p>
        </div>
      ) : (
        <p>No profile data available</p>
      )}
    </Box>
  );
}

export default ManageProfile;

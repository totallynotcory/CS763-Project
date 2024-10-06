//will update this file with better error handling as per Mosh video

import { useEffect, useState } from "react";
import apiClient from "../services/apiClient.js";
import { authenticated } from "../utils/authenticate.js";
import {
  Box,
  Typography
} from "@mui/material";
import { box, bigTitle } from "./style/styles.js";

function ManageDailyData() {
  
  const [data, setData] = useState([{}]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = authenticated()

    if (token) {
      apiClient
        .get("/api/daily-entry/view-daily-data", {
          headers: { Authorization: `Bearer ${token}` }
        }) // Fetch user profile data from the backend (e.g., /manage-profile)
        .then((res) => {
          setData(res.data); 
        })
        .catch((err) => {
          setError("Error fetching data. Try refreshing.");
          console.log(err);
        });
    }
    
    // apiClient
    //   .get("/api/daily-entry/view-daily-data")
    //   .then((res) => {
    //     setData(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  return (
    <Box sx={box}>
      <Typography variant="h6" gutterBottom sx={bigTitle}>
        Manage Daily Data
      </Typography>
      {typeof data === "undefined" ? (
        <p>Loading...</p>
      ) : (
        <p>`{JSON.stringify(data)}`</p>
      )}
    </Box>
  );
}

export default ManageDailyData;

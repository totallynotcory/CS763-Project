import { useEffect, useState } from "react";
import apiClient from "../services/apiClient.js";
import { authenticated } from "../utils/authenticate.js";
import {
  Box,
  Typography
} from "@mui/material";
import { box, bigTitle, dailyDataEntryCard, dailyDataEntryCardHeader, dailyDataEntryCardDelete } from "./style/styles.js";

function ManageDailyData() {
  const token = authenticated()
  
  const [data, setData] = useState([{}]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDailyData(); // Fetch daily data on component mount
  }, [token]); // Add token as a dependency


  const fetchDailyData = () => {
    if (token) {
      apiClient
        .get("/api/daily-entry/view-daily-data", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          setError("Error fetching data. Try refreshing.");
          console.log(err);
        });
    }
  };


  const formatDate = (dateString) => {
    console.log(dateString);
    const dateObj = new Date(dateString);
    
    const options = {
      timeZone: 'UTC', // Ensures formatting considers the UTC timezone
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    };
  
    const formattedDate = dateObj.toLocaleDateString('en-US', options);
    console.log(formattedDate);
    return formattedDate;
  };

  const deleteEntry = (dailyEntryId) => {
    if (token) {
      apiClient
        .delete("/api/daily-entry/delete-entry", {
          headers: { Authorization: `Bearer ${token}` },
          data: { dailyEntryId }
        }) 
        .then((res) => {
          fetchDailyData(); 
        })
        .catch((err) => {
          setError("Error fetching data. Try refreshing.");
          console.log(err);
        });
    }
  }

  return (
    <Box sx={box}>
      <Typography variant="h6" gutterBottom sx={bigTitle}>
        Manage Daily Data
      </Typography>
      {typeof data === "undefined" ? (
        <p>Loading...</p>
      ) : (
        data.map((dailyData, i) => (
          <div style={dailyDataEntryCard} key={i}>
            <div style={dailyDataEntryCardDelete} onClick={() => deleteEntry(dailyData.dailyEntryId)}>
              DELETE
            </div>
            <div style={dailyDataEntryCardHeader}>
              {formatDate(dailyData.entryDate)}: 
            </div>
            <div>
              Weight = {dailyData.weight} | Steps = {dailyData.steps} | Sleep = {dailyData.sleep} | Water = {dailyData.water} | Exercise = {dailyData.exercise}
            </div>
          </div>
        ))
      )}
    </Box>
  );
}

export default ManageDailyData;

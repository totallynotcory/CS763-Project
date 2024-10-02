//will update this file with better error handling as per Mosh video

import { useEffect, useState } from "react";
import apiClient from "../services/apiClient.js";
import { authenticated } from "../utils/authenticate.js";
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

function ViewUsers() {
  authenticated();
  const [data, setData] = useState([{}]);

  useEffect(() => {
    apiClient
      .get("/view-users")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          fontSize: "3rem",
          fontWeight: "600",
        }}
      >
        Viewing Users
      </Typography>
      {typeof data === "undefined" ? (
        <p>Loading...</p>
      ) : (
        data.map((user, i) => (
          <p key={i}>
            {i + 1}. ID: {user.userId} | Name: {user.name} | Email: {user.email}
          </p>
        ))
      )}
    </Box>
  );
}

export default ViewUsers;

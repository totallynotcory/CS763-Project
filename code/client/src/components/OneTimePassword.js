import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient.js";
import Cookies from "js-cookie";

import {
  Box,
  Typography,
  TextField,
  Grid2,
  FormControl,
  Button,
} from "@mui/material";
import {
  title,
  loginSubmitButton,
  loginBox,
  textField,
} from "./style/styles.js";

function OneTimePassword({ setIsAuthenticated }) {
  const navigate = useNavigate(); // Initialize the hook

  const [formData, setFormData] = useState({ otp: "" });  
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input changes and update formData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Set formData with the updated value
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior (e.g., page reload)

    setSuccessMessage("");
    setErrorMessage("");
    const encodedData = window.location.search.substr(1)

    try {
      const response = await apiClient.post("/api/users/one-time-password", { encodedData, ...formData });
      setSuccessMessage(
        "Thank you!  Please reset your password..."
      );
      const { token } = response.data;
      // store token in cookie
      Cookies.set('authToken', token)
      // redirect to home page
      setIsAuthenticated(true);

      setFormData({ otp: "" });
      // Delay routing to the login page to allow the success message to be visible
      setTimeout(() => {
        navigate("/password-reset");
      }, 1000); // 1 second delay
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message); // Set the error message from server response
      } else {
        console.error(error);
        setErrorMessage("Reset attempt failed.  Please try again");
      }
    }
  };

  return (
    <Box sx={loginBox}>
      <Typography variant="h6" gutterBottom sx={title}>
        Enter your code
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid2 container direction="column" spacing={2}>
          {/* One Time Password -------------------------------------*/}
          <Grid2 item size={{ xs: 12 }}>
            <FormControl fullWidth>
              <TextField
                data-testid="otp"
                label="One Time Password"
                variant="filled"
                fullWidth
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                sx={textField}
              />
            </FormControl>
          </Grid2>
          {/* Submit Button -------------------------------------*/}
          <Grid2 item size={{ xs: 12 }} container justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              sx={loginSubmitButton}
            >
              Reset Password
            </Button>
          </Grid2>
        </Grid2>
      </form>

      {/* Error & Success Messages */}
      {errorMessage && (
        <p style={{ color: "#E95D5C", fontWeight: "bold" }}>{errorMessage}</p>
      )}
      {successMessage && (
        <p style={{ color: "#008000", fontWeight: "bold" }}>{successMessage}</p>
      )}
    </Box>
  );
}

export default OneTimePassword;
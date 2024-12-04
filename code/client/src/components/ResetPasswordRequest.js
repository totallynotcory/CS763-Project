import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient.js";
import { validatePasswordResetForm } from "../utils/validatePasswordResetForm.js";

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

function ResetPasswordRequest() {
  const navigate = useNavigate(); // Initialize the hook

  const [formData, setFormData] = useState({ email: "" });  
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

    // Validate form inputs
    const validationResult = validatePasswordResetForm(formData);
    if (!validationResult) {
      setErrorMessage("Error: Please review your inputs and try again");
      return;  // Prevent form submission
    }

    try {
      await apiClient.post("/api/users/reset-password-request", formData);
      setSuccessMessage(
        "Request received!  Please check your e-mail..."
      );

      setFormData({ email: "" });

      // Delay routing to the login page to allow the success message to be visible
      setTimeout(() => {
        navigate("/login");
      }, 2000); // 2 second delay
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message); // Set the error message from server response
      } else {
        setErrorMessage("Reset attempt failed.  Please try again");
      }
    }
  };

  return (
    <Box sx={loginBox}>
      <Typography variant="h6" gutterBottom sx={title}>
        Reset your password?
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid2 container direction="column" spacing={2}>
          {/* Email -------------------------------------*/}
          <Grid2 item size={{ xs: 12 }}>
            <FormControl fullWidth>
              <TextField
                data-testid="txtEmail"
                label="Email"
                variant="filled"
                fullWidth
                name="email"
                value={formData.email}
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
              Request Reset
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

export default ResetPasswordRequest;
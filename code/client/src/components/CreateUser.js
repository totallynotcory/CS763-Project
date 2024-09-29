//IN PROGRESS

import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient.js';
import { validateRegistrationForm } from '../utils/validateRegistrationForm.js';

import { Box, TextField, Button } from "@mui/material";

function CreateUser() {
  const navigate = useNavigate(); // Initialize the hook

  // State for form input values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    passwordHashed: ''
  });

  // State for validation message
  const [validationMsg, setValidationMsg] = useState('');

  // Handle input changes and update formData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior (e.g. page reload)

    // Validate form inputs
    const validationResult = validateRegistrationForm(formData);
    if (!validationResult) {
      setValidationMsg('Please check inputs and try again.');
      return; // Prevent form submission
    }

    // If validation passes, submit form
    try { 
      await apiClient.post('/create-user', formData)
      setValidationMsg('Registration successful!');
      // Redirect to home page after successful registration
      navigate('/');
    } catch (error) { 
      console.error('Error creating user:', error);
      setValidationMsg('Error during registration. Please try again.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit} // Attach the handleSubmit function to onSubmit
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2, // Space between inputs
        width: '400px',
        margin: '0 auto', // Center form horizontally
      }}
      noValidate
      autoComplete="off"
    >
      <TextField 
        label="Name" 
        name="name" 
        variant="outlined" 
        value={formData.name}
        onChange={handleChange} // Attach the handleChange function
      />

      <TextField 
        label="Email" 
        name="email"
        variant="outlined" 
        value={formData.email}
        onChange={handleChange} 
      />
      <TextField 
        label="Password" 
        name="passwordHashed" 
        type="password" // typed values will be hidden
        variant="outlined" 
        value={formData.passwordHashed}
        onChange={handleChange} 
      />

      <Button type="submit" variant="contained"> Sign Up </Button>
      
      {/* Render the validation message */}
      {validationMsg && <p>{validationMsg}</p>}
    </Box>
  )
}

export default CreateUser
//IN PROGRESS

import { useState } from 'react'
import apiClient from '../services/apiClient.js';
import { validateRegistrationForm } from '../utils/validateRegistrationForm.js';

import { Box, TextField, Button } from "@mui/material";

function CreateUser() {
  
  // State for form input values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    passwordHashed: ''
  });

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
      // console.error('Form validation failed');
      return; // Prevent form submission
    }

    // If validation passes, submit form
    try {
      console.log('Form validation passed')
      await apiClient.post('/create-user', formData)
    } catch (error) { 
      console.error('Error creating user:', error);
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

    </Box>
  )
}

export default CreateUser
//IN PROGRESS

import { useState } from 'react'
import apiClient from '../services/apiClient.js';

function CreateUser() {
  
  // State for form input values
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    email: '',
    passwordHashed: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
    // console.log('Create user request received', formData);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await apiClient.post('/create-user', formData);
      setSuccessMessage('User created successfully!');

      setFormData({
        userId: '',
        name: '',
        email: '',
        password: '',
      });

    } catch (error) {
      // console.error('Error creating user:', error);
      setErrorMessage('Failed to create user. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <label>User ID:</label>
      <input
        type="text"
        name="userId"
        value={formData.userId}
        onChange={handleChange}
      />
    
      <label>Name (First & Last)</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      <label>Email</label>
      <input
        type="text"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <label>Password</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
    </form>
  )

}

export default CreateUser
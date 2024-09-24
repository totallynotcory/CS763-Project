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
    try {
      await apiClient.post('/create-user', formData);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    
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
        type="text"
        name="passwordHashed"
        value={formData.passwordHashed}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
    </form>
  )

}

export default CreateUser
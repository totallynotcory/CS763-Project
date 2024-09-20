//IN PROGRESS

import { useState } from 'react'
import apiClient from '../services/apiClient';

function CreateUser() {
  
  // State for form input values
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: ''
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

      <label>First Name:</label>
      <input
        type="text"
        name="firstname"
        value={formData.firstname}
        onChange={handleChange}
      />
    
      <label>Last Name:</label>
      <input
        type="text"
        name="lastname"
        value={formData.lastname}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
    </form>
  )

}

export default CreateUser
//IN PROGRESS

import { useEffect, useState } from 'react'
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
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Send form data using Axios POST request
      const response = await apiClient.post('/create-user', formData);

      // Log or handle success response
      console.log('User created:', response.data);
    } catch (error) {
      // Handle any errors that occur during the POST request
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
  
  // return (
  //     <>
  //       <div>
  //         <form id="create-user-form">
  //           <input 
  //             id="firstname" type="text" placeholder="firstname"/>
  //           <input id="lastname" type="text" placeholder="lastname"/>
  //           <input id="test-submit" type="submit" value="Create User" />
  //         </form>
  //       </div>
  //     </>
  // )
}

export default CreateUser
// ./components/Login.js

import { useState } from 'react';

import apiClient from '../services/apiClient';
import './css/Login.css';

function Login() {
  // status to store login status
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // update input values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    try {
      const response = await apiClient.post('/login', formData);
      // store token
      localStorage.setItem('authToken', response.data.token);
      // redirect to home page
      console.log('login success:', response.data);
    } catch (error) {
      console.error('login error:', error);
      // warn user
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <button type="submit">Login</button>
    </form>
    </div>
  );
}

export default Login;

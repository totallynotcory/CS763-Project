// ./components/Login.js

 import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import apiClient from '../services/apiClient.js';
import './css/Login.css';

function Login() {
  // status to store login status
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);// set password visibility
  // const navigate = useNavigate(); 
  // update input values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShow) => !prevShow);
  };

  // form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    // setError('');
    // setSuccess('');
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
      <div className="password-input-container">
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
         <button
            type="button"
            className="password-toggle-button"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'hide password' : 'show password'}
          >{showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}</button>
      </div>    
      <button type="submit">Login</button>
    </form>
    </div>
  );
}

export default Login;

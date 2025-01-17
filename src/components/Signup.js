import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../design/Signup.css'

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    const existingUser = JSON.parse(localStorage.getItem('users')) || [];
  
    // Add the new user to the list of users
    existingUser.push({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });
  
    // Save the updated user list to localStorage
    localStorage.setItem('users', JSON.stringify(existingUser));
  
    // Set the active user in localStorage
    localStorage.setItem('activeUser', JSON.stringify({
      username: formData.username,
      email: formData.email
    }));
  
    alert('Registration successful');
    navigate('/?view=login'); // Navigate to the login or homepage
  };
  

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../design/Login.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
  
    const users = JSON.parse(localStorage.getItem('users')) || [];
  
    const foundUser = users.find(user => user.email === formData.email);
  
    
    if (formData.email === 'admin@gmail.com' && formData.password === 'admin') {
      console.log('Admin login successful');
      navigate('/admin-tab');  
    } else if (foundUser && foundUser.password === formData.password) {
      console.log('Login successful');
      
      localStorage.setItem('activeUser', JSON.stringify({
        username: foundUser.username,
        email: foundUser.email
      }));
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };
  

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      
    </div>
  );
};

export default Login;

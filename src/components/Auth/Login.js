import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      // handle login success
    } catch (error) {
      console.error('Login Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} >
      <div className="input-container">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="input-field"
        />
        <label className="form-label">Username</label>
      </div>
      <div className="input-container">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input-field"
        />
        <label className="form-label">Password</label>
      </div>
      <button type="submit" className="submit-button">Login</button>
    </form>
  );
};

export default Login;

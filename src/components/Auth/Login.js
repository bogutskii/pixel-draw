import React, { useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.REACT_APP_SECRET_KEY).toString();
      const response = await axios.post(`${process.env.REACT_APP_API_URL_LOCAL}/users/login`, { username, password: encryptedPassword });
      localStorage.setItem('token', response.data.token);
      setMessage('Login successful');
    } catch (error) {
      setMessage(error.response ? error.response.data.error : error.message);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
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
      {message && <p>{message}</p>}
    </form>
  );
};

export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.REACT_APP_SECRET_KEY).toString();
      const response = await axios.post(`${process.env.REACT_APP_API_URL_LOCAL}/users/register`, { username, password: encryptedPassword, email });
      setMessage('User registered successfully');
      setMessageType('success');
      setUsername('');
      setPassword('');
      setEmail('');
    } catch (error) {
      setMessage(error.response ? error.response.data.error : error.message);
      setMessageType('error');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          type="text"
          className={`input-field ${username && 'filled'}`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label className="form-label">Username</label>
      </div>
      <div className="input-container">
        <input
          type="email"
          className={`input-field ${email && 'filled'}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="form-label">Email</label>
      </div>
      <div className="input-container">
        <input
          type="password"
          className={`input-field ${password && 'filled'}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label className="form-label">Password</label>
      </div>
      <button type="submit" className="submit-button">Register</button>
      {message && <p className={`message ${messageType}`}>{message}</p>}
    </form>
  );
};

export default Register;

import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', { username, password, email });
      // handle registration success
    } catch (error) {
      console.error('Registration Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          type="text"
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label className="form-label">Username</label>
      </div>
      <div className="input-container">
        <input
          type="email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="form-label">Email</label>
      </div>
      <div className="input-container">
        <input
          type="password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label className="form-label">Password</label>
      </div>
      <button type="submit" className="submit-button">Register</button>
    </form>
  );
};

export default Register;

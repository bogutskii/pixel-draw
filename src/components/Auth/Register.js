import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/register', { username, password, email });
      onClose();
    } catch (error) {
      console.error('Registration Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <label className="form-label">Username</label>

      <input
        type="email"
        className="form-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label className="form-label">Email</label>

      <input
        type="password"
        className="form-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label className="form-label">Password</label>

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/actions';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector((state) => state.authError);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    const userData = { username, password, email };
    dispatch(registerUser(userData, () => navigate('/login')));
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
      <div className="input-container">
        <input
          type="password"
          className={`input-field ${confirmPassword && 'filled'}`}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <label className="form-label">Confirm Password</label>
      </div>
      <button type="submit" className="submit-button">Register</button>
      {message && <p className="error-message">{message}</p>}
      {authError && <p className="error-message">{authError}</p>}
    </form>
  );
};

export default Register;

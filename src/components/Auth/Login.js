import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector((state) => state.authError);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { username, password };
    dispatch(loginUser(userData, () => navigate('/profile')));
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
      {message && <p className="error-message">{message}</p>}
      {authError && <p className="error-message">{authError}</p>}
    </form>
  );
};

export default Login;

import React, { useState } from 'react';
import './auth.css';
import Login from './Login';
import Register from './Register';

const FlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flip-card-container">
      <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
        <div className="flip-card-front">
          <h2>Login</h2>
          <Login />
          <p className="toggle-link" onClick={handleFlip}>
            Don't have an account? Register here
          </p>
        </div>
        <div className="flip-card-back">
          <h2>Register</h2>
          <Register />
          <p className="toggle-link" onClick={handleFlip}>
            Already have an account? Login here
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;

// Header.js
import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

export const Header = () => {
  const { user, logout } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
    if (isRegisterModalOpen) setIsRegisterModalOpen(false);
  };

  const toggleRegisterModal = () => {
    setIsRegisterModalOpen(!isRegisterModalOpen);
    if (isLoginModalOpen) setIsLoginModalOpen(false);
  };

  return (
    <header className="header">
      <h1>Pixel Draw</h1>
      {user ? (
        <div>
          <span>Logged in as: {user.username}</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={toggleLoginModal}>Login</button>
          <button onClick={toggleRegisterModal}>Register</button>
        </div>
      )}
      {isLoginModalOpen && <LoginModal isOpen={isLoginModalOpen} onClose={toggleLoginModal} />}
      {isRegisterModalOpen && <RegisterModal isOpen={isRegisterModalOpen} onClose={toggleRegisterModal} />}
    </header>
  );
};

export default Header;

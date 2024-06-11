import React, { useState } from 'react';
import { useAuth } from './Auth/AuthContext';
import LoginModal from './Auth/LoginModal';

export const Header = () => {
  const { user, logout } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
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
        </div>
      )}
      {isLoginModalOpen && <LoginModal isOpen={isLoginModalOpen} onClose={toggleLoginModal} title={'Login'}/>}
    </header>
  );
};

export default Header;

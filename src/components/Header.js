import React, { useState } from 'react';
import { useAuth } from './Auth/AuthContext';
import LoginModal from './Auth/LoginModal';
import { useNavigate } from 'react-router-dom';
export const Header = () => {
  const { user, logout } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();
  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };


  return (
    <header className="header">
      <h1 className='logo' onClick={()=> navigate('/')}>Pixel Draw</h1>
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

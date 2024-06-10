// LoginModal.js
import React, { useEffect } from 'react';
import Login from './Login';

const LoginModal = ({ isOpen, onClose, title }) => {
  const handleOutsideClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <Login onClose={onClose} />
      </div>
    </div>
  );
};

export default LoginModal;

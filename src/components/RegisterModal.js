// RegisterModal.js
import React, { useEffect } from 'react';
import Register from './Register';

const RegisterModal = ({ isOpen, onClose }) => {
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

        <Register onClose={onClose} />

    </div>
  );
};

export default RegisterModal;

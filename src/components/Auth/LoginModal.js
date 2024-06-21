import React from 'react';
import Modal from '../Modal/Modal';
import FlipCard from './FlipCard';

const LoginModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FlipCard onClose={onClose} />
    </Modal>
  );
};

export default LoginModal;

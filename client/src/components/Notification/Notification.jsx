import React from 'react';
import './style.scss';

const Notification = ({ message, type, onClose }) => {
  return (
    <div className={`notification ${type}`} onClick={onClose}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
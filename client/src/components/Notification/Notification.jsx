import React from 'react';
import './style.scss';

const Notification = ({ message, type, onClose }) => {
  return (
    <div
      className={`notification ${type}`}
      onClick={onClose} 
      role="alert"
      aria-live="assertive"
    >
      <p>{message}</p>
    </div>
  );
};

export default Notification;
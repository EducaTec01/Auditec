import React from 'react';

const ErrorMessageModal = ({ message, onClose }) => {
  return (
    <div className="error-modal">
      <div className="error-content">
        <h3>Error</h3>
        <p>{message}</p>
        <button onClick={onClose}>Aceptar</button>
      </div>
    </div>
  );
};

export default ErrorMessageModal;

import React from 'react';
import Modal from 'react-modal';

const ModalAuditoria = ({ isOpen, onClose, header, text }) => {
  const customStyles = {
    content: {
      width: '30%',
      height: '30%',
      margin: 'auto',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      marginBottom: '20px',
    },
    text: {
      marginBottom: '20px',
    },
    button: {
      backgroundColor: '#007bff',
      border: 'none',
      color: 'white',
      padding: '15px 32px',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '16px',
      margin: '4px 2px',
      cursor: 'pointer',
      borderRadius: '12px',
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles} contentLabel="Modal de Auditoria">
      <h2 style={customStyles.header}>{header}</h2>
      <p style={customStyles.text}>{text}</p>
      <button style={customStyles.button} onClick={onClose}>Cerrar</button>
    </Modal>
  );
};

export default ModalAuditoria;
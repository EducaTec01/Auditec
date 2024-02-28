import React from 'react';

function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button onClick={handlePrint}>Imprimir Página</button>
  );
}

export default PrintButton;